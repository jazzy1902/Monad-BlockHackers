import React from "react";
import { FaWallet, FaSpinner } from "react-icons/fa";
import { useWeb3 } from "../../context/Web3Context";
import {
  WalletButton,
  WalletButtonContent,
  ErrorMessage,
} from "./WalletConnection.styles";

export const WalletConnection = () => {
  const { connectWallet, isConnecting, error, isMetaMaskInstalled } = useWeb3();

  if (!isMetaMaskInstalled) {
    return (
      <div>
        <WalletButton
          onClick={() => window.open("https://metamask.io/download/", "_blank")}
        >
          <WalletButtonContent>
            <FaWallet />
            Install MetaMask
          </WalletButtonContent>
        </WalletButton>
        <ErrorMessage>
          MetaMask extension is required to use this application
        </ErrorMessage>
      </div>
    );
  }

  return (
    <div>
      <WalletButton
        onClick={connectWallet}
        disabled={isConnecting}
        $isConnecting={isConnecting}
      >
        <WalletButtonContent $isSpinning={isConnecting}>
          {isConnecting ? <FaSpinner /> : <FaWallet />}
          {isConnecting ? "Connecting..." : "Connect MetaMask"}
        </WalletButtonContent>
      </WalletButton>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div
        style={{
          fontSize: "0.7rem",
          opacity: 0.6,
          marginTop: "0.5rem",
          textAlign: "center",
        }}
      >
        Time: 2025-08-30 12:23:11 | User: imangi-iit
      </div>
    </div>
  );
};
