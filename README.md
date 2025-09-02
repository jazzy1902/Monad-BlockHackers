
# 🌱 GreenSol – Hybrid Blockchain Energy Certificates

GreenSol is a **full-stack blockchain project** that allows IoT devices (e.g., ESP32 energy meters) to log renewable energy production and mint verifiable **NFT-based Green Certificates**.  
Each unit of energy produced is represented by an NFT minted on-chain, while off-chain logs are stored in a database for analytics and leaderboards.  



## 📦 Components

### 1. **Smart Contract (GreenCertificateNFT)**

* Written in Solidity (ERC721 standard).
* Mints NFTs representing energy units produced.
* Emits `Transfer` events for traceability.
* Metadata hosted on IPFS (`tokenURI`).

### 2. **Backend (FastAPI + Web3 + SQLAlchemy)**

* Exposes REST APIs for logging energy, minting, burning, transfers, etc.
* Interacts with the smart contract via Web3.py.
* Persists rich energy logs in DB for analytics.
* Provides endpoints for leaderboard & user history.

### 3. **Frontend (React)**

* Connects via MetaMask or WalletConnect.
* Allows users to view:

  * Certificates (NFTs) they own.
  * Total energy produced (units).
  * Leaderboards.
  * Transaction history.
* Admin dashboard for monitoring logs.

---

## ⚙️ Setup Instructions

### 🔑 Prerequisites

* Python 3.10+
* Node.js 18+
* MetaMask wallet
* Access to a blockchain RPC (e.g. Monad, Ethereum testnet, Polygon Mumbai)

---

### 🖥️ Backend Setup

```bash
# Clone repo
git clone https://github.com/jazzy1902/Monad-BlockHackers.git
cd Monad-BlockHackers/backend


# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
```

#### 🔧 .env file example:

```ini
MONAD_RPC=https://rpc.testnet.monerchain.io
PRIVATE_KEY=your_private_key_here
CONTRACT_ADDRESS=0xYourDeployedContract
CHAIN_ID=12345
CORS_ORIGINS=http://localhost:3000
MINT_PER_UNIT=1
```

#### Run the backend:

```bash
uvicorn main:app --reload --port 8000
```


---

### 🎨 Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

Frontend runs at 👉 [http://localhost:3000](http://localhost:3000)

---

### ⛓️ Smart Contract Deployment

1. Go to `contracts/GreenCertificateNFT.sol`.
2. Compile & deploy using **Hardhat** or **Remix**.
3. Save the deployed contract address in `.env`.
4. Export ABI JSON to `backend/artifacts/GreenCertificateNFT.json`.

---

## 📡 API Overview

### ✅ Healthcheck

`GET /api/ping` → returns network info.

### ⚡ Energy Logging

`POST /api/logEnergy`

```json
{
  "wallet": "0xabc...",
  "units": 12.5,
  "device_id": "esp32-1",
  "device_timestamp": "2025-08-29T10:00:00Z"
}
```

### 🏆 Leaderboard

`GET /api/leaderboard?limit=10`

### 📊 Energy Logs

`GET /api/getEnergyLogs?wallet=0xabc...`

### 🔢 Energy Produced

`GET /api/balance?wallet=0xabc...`

---

## 🛠️ Development Notes

* **NFTs ≠ energy units**: `balanceOf` gives NFT count, but actual energy is summed from DB logs.
* **Gas fees**: Transactions use EIP-1559 with fallback.
* **Security**: Never expose private keys; use `.env`.
* **CORS**: Default allows all, restrict for production.


---

## 🌍 Future Improvements

* Add ERC721Enumerable to allow on-chain querying of NFTs.
* Add staking/rewards for energy producers.
* Deploy to Layer-2 (Polygon zkEVM, Arbitrum).


