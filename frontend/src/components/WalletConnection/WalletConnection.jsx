import React, { useState } from "react";
import {
  FaWallet,
  FaCheckCircle,
  FaExclamationTriangle,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useWeb3 } from "../../context/Web3Context";
import {
  WalletButton,
  LoadingSpinner,
  ErrorMessage,
  ConnectedInfo,
  BalanceDisplay,
} from "./WalletConnection.styles";

export const WalletConnection = () => {
  const {
    isConnected,
    isConnecting,
    connectWallet,
    formatAddress,
    account,
    balance,
    error,
    clearError,
    isMetaMaskInstalled,
  } = useWeb3();

  const [showError, setShowError] = useState(false);

  const handleConnect = async () => {
    try {
      clearError();
      await connectWallet();
    } catch (err) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000); // Hide error after 5 seconds
    }
  };

  if (isConnected) {
    return (
      <ConnectedInfo>
        <FaCheckCircle />
        <div>
          <div>{formatAddress(account)}</div>
          <BalanceDisplay>{balance} ETH</BalanceDisplay>
        </div>
      </ConnectedInfo>
    );
  }

  return (
    <>
      <WalletButton
        onClick={handleConnect}
        disabled={isConnecting}
        $isMetaMaskInstalled={isMetaMaskInstalled}
      >
        {isConnecting ? (
          <>
            <LoadingSpinner />
            Connecting...
          </>
        ) : !isMetaMaskInstalled ? (
          <>
            <FaExternalLinkAlt />
            Install MetaMask
          </>
        ) : (
          <>
            <FaWallet />
            Connect Wallet
          </>
        )}
      </WalletButton>

      {(error || showError) && (
        <ErrorMessage>
          <FaExclamationTriangle />
          {error || "Connection failed"}
        </ErrorMessage>
      )}
    </>
  );
};
