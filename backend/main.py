import os, json, math
from fastapi import FastAPI, HTTPException, Depends, Query
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from web3 import Web3
# from web3.middleware import geth_poa_middleware
from sqlalchemy.orm import Session
from db import SessionLocal, EnergyLog, init_db
from datetime import datetime

load_dotenv()

# Config
MONAD_RPC = os.getenv("MONAD_RPC")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
CHAIN_ID = int(os.getenv("CHAIN_ID") or 0)
CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "").split(",") if o.strip()]
MINT_PER_UNIT = int(os.getenv("MINT_PER_UNIT", "1"))

if not (MONAD_RPC and PRIVATE_KEY and CONTRACT_ADDRESS):
    raise RuntimeError("Set MONAD_RPC, PRIVATE_KEY, CONTRACT_ADDRESS in .env")

# Web3 init
w3 = Web3(Web3.HTTPProvider(MONAD_RPC))
# If Monad uses POA-style chain, uncomment:
# w3.middleware_onion.inject(geth_poa_middleware, layer=0)

backend_account = w3.eth.account.from_key(PRIVATE_KEY)

# Load ABI
with open(os.path.join(os.path.dirname(__file__), "artifacts\\GreenCertificateNFT.json")) as f:
    CONTRACT_JSON = json.load(f)
ABI = CONTRACT_JSON["abi"]
contract = w3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDRESS), abi=ABI)

# DB init
init_db()

app = FastAPI(title="GreenChain Backend (Hybrid)")

# Dependency: DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Request models
class EnergyEventReq(BaseModel):
    wallet: str = Field(..., description="Recipient wallet for tokens")
    units: float = Field(..., gt=0, description="Energy units produced")
    device_id: str | None = None
    device_timestamp: str | None = None

class MintRequest(BaseModel):
    wallet: str
    amount: int

class TransferRequest(BaseModel):
    sender: str
    receiver: str
    amount: float

class BurnRequest(BaseModel):
    wallet: str
    amount: float

# Helper: sign & send transaction
def build_and_send_tx(txn):
    nonce = w3.eth.get_transaction_count(backend_account.address)
    tx = dict(txn)
    tx["nonce"] = nonce
    if CHAIN_ID:
        tx["chainId"] = CHAIN_ID

    # Gas handling: use EIP-1559 if available
    try:
        base_fee = w3.eth.fee_history(1, "latest")["baseFeePerGas"][-1]
        tx["maxFeePerGas"] = int(base_fee * 2)
        tx["maxPriorityFeePerGas"] = w3.to_wei(1, "gwei")
    except Exception:
        tx["gasPrice"] = w3.to_wei(1, "gwei")

    if "gas" not in tx:
        try:
            tx["gas"] = int(w3.eth.estimate_gas(tx) * 1.2)
        except Exception:
            tx["gas"] = 300000

    signed = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)

    # ✅ web3.py v7 uses raw_transaction, fallback for older versions
    raw_tx = getattr(signed, "rawTransaction", None) or getattr(signed, "raw_transaction")

    tx_hash = w3.eth.send_raw_transaction(raw_tx)
    return tx_hash.hex()



# Endpoints

@app.get("/api/ping")
def ping():
    return {"ok": True, "network": w3.client_version}

@app.post("/api/logEnergy")
def log_energy(event: EnergyEventReq, db: Session = Depends(get_db)):
    """
    Receive an energy event from ESP32:
    - Store rich log in SQLite (wallet, units, device_id, device_timestamp, received_at)
    - Call contract.logEnergy(wallet, units_integer) to mint tokens and emit on-chain event (proof)
    """
    # store off-chain
    log = EnergyLog(
        device_id=event.device_id,
        wallet=event.wallet,
        units=event.units,
        device_timestamp=event.device_timestamp,
        received_at=datetime.utcnow()
    )
    db.add(log)
    db.commit()
    db.refresh(log)

    # Decide integer units for chain minting (MINT_PER_UNIT * units). For simplicity, use integer rounding.
    # Example: 1 unit -> 1 token. If units can be fractional, decide policy (floor here).
    token_units = max(1, math.floor(event.units * MINT_PER_UNIT))

    # call on-chain logEnergy(user, units) which will mint token(s) and emit event
    try:
        txn = contract.functions.logEnergy(Web3.to_checksum_address(event.wallet), token_units, "ipfs://your-default-metadata-uri" ).build_transaction({
            "from": backend_account.address
        })
        tx_hash = build_and_send_tx(txn)
    except Exception as ex:
        # Note: We still keep the DB log; respond with chain error
        return {
            "status": "partial",
            "msg": "Logged locally but on-chain call failed",
            "db_id": log.id,
            "error": str(ex)
        }

    return {
        "status": "ok",
        "db_id": log.id,
        "tx_hash": tx_hash,
        "wallet": event.wallet,
        "units": event.units,
        "token_units_minted": token_units,
        "received_at": log.received_at.isoformat()
    }


@app.get("/api/getEnergyLogs")
def get_energy_logs(wallet: str = Query(...), skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Fetch stored energy logs for a wallet (off-chain DB).
    """
    wallet = wallet.lower()
    rows = db.query(EnergyLog).filter(EnergyLog.wallet == wallet).order_by(EnergyLog.id.desc()).offset(skip).limit(limit).all()
    return {
        "wallet": wallet,
        "count": len(rows),
        "logs": [
            {
                "id": r.id,
                "device_id": r.device_id,
                "units": r.units,
                "device_timestamp": r.device_timestamp,
                "received_at": r.received_at.isoformat()
            } for r in rows
        ]
    }

# Existing token management endpoints (useful for admin + testing)

@app.post("/api/mint")
def mint_token(req: MintRequest):
    try:
        txn = contract.functions.mintToken(Web3.to_checksum_address(req.wallet), int(req.amount)).build_transaction({
            "from": backend_account.address
        })
        tx_hash = build_and_send_tx(txn)
        return {"status": "ok", "tx": tx_hash}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))

@app.post("/api/transfer")
def transfer_token(req: TransferRequest):
    try:
        # Transfer requires a signed tx from the sender; for demo we let backend send if we have sender's key (not typical)
        # Here we assume backend will call ERC20.transfer(receiver, amountWhole) from backend's wallet
        amount_whole = int(req.amount)
        txn = contract.functions.transfer(Web3.to_checksum_address(req.receiver), amount_whole).build_transaction({
            "from": backend_account.address
        })
        tx_hash = build_and_send_tx(txn)
        return {"status": "ok", "tx": tx_hash}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))

@app.get("/api/balance")
def get_balance(account: str = Query(...)):
    try:
        bal = contract.functions.balanceOf(Web3.to_checksum_address(account)).call()
        # return human readable (divide by 1e18)
        return {"account": account, "balance_raw": str(bal), "balance_tokens": str(bal // (10 ** 18))}
    except Exception as ex:
        raise HTTPException(status_code=400, detail=str(ex))

@app.get("/api/totalSupply")
def total_supply():
    try:
        supply = contract.functions.totalSupply().call()
        return {"totalSupply_raw": str(supply), "totalSupply_tokens": str(supply // (10 ** 18))}
    except Exception as ex:
        raise HTTPException(status_code=400, detail=str(ex))

@app.post("/api/burn")
def burn_tokens(req: BurnRequest):
    try:
        txn = contract.functions.burnFrom(Web3.to_checksum_address(req.wallet), int(req.amount)).build_transaction({
            "from": backend_account.address
        })
        tx_hash = build_and_send_tx(txn)
        return {"status": "ok", "tx": tx_hash}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))
