import React, { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";

const Web3Context = createContext();

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState("0");

  // Convert address to proper checksum format
  const toChecksumAddress = (address) => {
    if (!address) return "";
    try {
      return Web3.utils.toChecksumAddress(address);
    } catch (error) {
      console.error("Error converting to checksum address:", error);
      return address;
    }
  };

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;
  };

  // Get user balance
  const getUserBalance = async (web3Instance, userAccount) => {
    try {
      const balanceWei = await web3Instance.eth.getBalance(userAccount);
      const balanceEth = web3Instance.utils.fromWei(balanceWei, "ether");
      setBalance(parseFloat(balanceEth).toFixed(4));

      console.log(`[2025-08-30 12:23:11] Balance updated: ${balanceEth} ETH`);
    } catch (error) {
      console.error("Error getting balance:", error);
      setBalance("0");
    }
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError(
        "MetaMask is not installed. Please install MetaMask to continue."
      );
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);

      // Request account access - this will open MetaMask
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        throw new Error("No accounts returned from MetaMask");
      }

      // Create web3 instance
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Convert to proper checksum address
      const userAccount = toChecksumAddress(accounts[0]);
      setAccount(userAccount);

      console.log(
        `[2025-08-30 12:23:11] Raw address from MetaMask:`,
        accounts[0]
      );
      console.log(`[2025-08-30 12:23:11] Checksum address:`, userAccount);

      // Get chain ID
      const currentChainId = await web3Instance.eth.getChainId();
      setChainId(currentChainId);

      // Get user balance
      await getUserBalance(web3Instance, userAccount);

      // Store connection state with checksum address
      localStorage.setItem("walletConnected", "true");
      localStorage.setItem("connectedAccount", userAccount);

      console.log(`[2025-08-30 12:23:11] Successfully connected to MetaMask:`, {
        account: userAccount,
        chainId: currentChainId,
        user: "imangi-iit",
      });
    } catch (error) {
      console.error("Failed to connect wallet:", error);

      if (error.code === 4001) {
        setError("Connection rejected by user");
      } else if (error.code === -32002) {
        setError("Connection request already pending. Please check MetaMask.");
      } else {
        setError(error.message || "Failed to connect wallet");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setWeb3(null);
    setChainId(null);
    setBalance("0");
    setError(null);
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("connectedAccount");
    console.log(
      `[2025-08-30 12:23:11] Wallet disconnected for user: imangi-iit`
    );
  };

  // Check for existing connection
  const checkConnection = async () => {
    if (!isMetaMaskInstalled()) {
      return;
    }

    try {
      const wasConnected = localStorage.getItem("walletConnected");
      const storedAccount = localStorage.getItem("connectedAccount");

      if (wasConnected && storedAccount) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          const currentAccount = toChecksumAddress(accounts[0]);
          const storedChecksum = toChecksumAddress(storedAccount);

          console.log(`[2025-08-30 12:23:11] Checking MetaMask connection:`, {
            storedAccount: storedAccount,
            currentAccount: currentAccount,
            match: currentAccount === storedChecksum,
          });

          if (currentAccount === storedChecksum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
            setAccount(currentAccount);

            const currentChainId = await web3Instance.eth.getChainId();
            setChainId(currentChainId);

            await getUserBalance(web3Instance, currentAccount);

            console.log(
              `[2025-08-30 12:23:11] Auto-connected to MetaMask account: ${currentAccount}`
            );
          } else {
            console.log("Account mismatch, disconnecting");
            disconnectWallet();
          }
        } else {
          console.log("No MetaMask accounts available, disconnecting");
          disconnectWallet();
        }
      }
    } catch (error) {
      console.error("Failed to check MetaMask connection:", error);
      disconnectWallet();
    }
  };

  // Switch to a specific network
  const switchNetwork = async (targetChainId) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
    } catch (error) {
      console.error("Failed to switch network:", error);
      throw error;
    }
  };

  // Add network to MetaMask
  const addNetwork = async (networkConfig) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [networkConfig],
      });
    } catch (error) {
      console.error("Failed to add network:", error);
      throw error;
    }
  };

  // Format address for display
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Setup event listeners
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    // Account change handler
    const handleAccountsChanged = (accounts) => {
      console.log(`[2025-08-30 12:23:11] MetaMask accounts changed:`, accounts);
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        const newAccount = toChecksumAddress(accounts[0]);
        console.log("New MetaMask account (checksum):", newAccount);

        if (newAccount !== account) {
          setAccount(newAccount);
          localStorage.setItem("connectedAccount", newAccount);
          if (web3) {
            getUserBalance(web3, newAccount);
          }
        }
      }
    };

    // Chain change handler
    const handleChainChanged = (newChainId) => {
      console.log(`[2025-08-30 12:23:11] Chain changed:`, newChainId);
      setChainId(parseInt(newChainId, 16));
      window.location.reload();
    };

    // Connect handler
    const handleConnect = (connectInfo) => {
      console.log(`[2025-08-30 12:23:11] MetaMask connected:`, connectInfo);
    };

    // Disconnect handler
    const handleDisconnect = (error) => {
      console.log(`[2025-08-30 12:23:11] MetaMask disconnected:`, error);
      disconnectWallet();
    };

    // Add event listeners
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);
    window.ethereum.on("connect", handleConnect);
    window.ethereum.on("disconnect", handleDisconnect);

    // Check for existing connection on mount
    checkConnection();

    // Cleanup event listeners
    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
        window.ethereum.removeListener("connect", handleConnect);
        window.ethereum.removeListener("disconnect", handleDisconnect);
      }
    };
  }, [account, web3]);

  const value = {
    // State
    account,
    web3,
    isConnecting,
    error,
    chainId,
    balance,
    isConnected: !!account,
    isMetaMaskInstalled: isMetaMaskInstalled(),

    // Methods
    connectWallet,
    disconnectWallet,
    switchNetwork,
    addNetwork,
    formatAddress,
    toChecksumAddress,

    // Utilities
    clearError: () => setError(null),
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
