import React, { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaChevronDown,
  FaSignOutAlt,
  FaNetworkWired,
  FaCopy,
} from "react-icons/fa";
import { useWeb3 } from "../../context/Web3Context";
import {
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  UserInfo,
  UserName,
  UserAddress,
  NetworkInfo,
  UserStats,
  StatItem,
  StatValue,
  StatLabel,
  DisconnectButton,
  CopyButton,
} from "./UserDropdown.styles";

export const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);
  const { account, formatAddress, disconnectWallet, chainId, balance } =
    useWeb3();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  const getNetworkName = (chainId) => {
    const networks = {
      1: "Ethereum Mainnet",
      3: "Ropsten Testnet",
      4: "Rinkeby Testnet",
      5: "Goerli Testnet",
      42: "Kovan Testnet",
      137: "Polygon Mainnet",
      80001: "Polygon Mumbai",
      56: "BSC Mainnet",
      97: "BSC Testnet",
    };
    return networks[chainId] || `Network ${chainId}`;
  };

  // Mock user data - replace with real data from your backend
  const userData = {
    username: "imangi-iit",
    energyGenerated: "1,250 kWh",
    energyUsed: "980 kWh",
    rank: "#42",
    // points: "8,750",
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        <FaUser />
        {userData.username}
        <FaChevronDown
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </DropdownButton>

      <DropdownMenu $isOpen={isOpen}>
        <UserInfo>
          <UserName>{userData.username}</UserName>
          <UserAddress>
            {formatAddress(account)}
            <CopyButton onClick={copyToClipboard} title="Copy address">
              <FaCopy />
              {copied && <span>Copied!</span>}
            </CopyButton>
          </UserAddress>
          <NetworkInfo>
            <FaNetworkWired />
            {getNetworkName(chainId)}
          </NetworkInfo>
        </UserInfo>

        <UserStats>
          <StatItem>
            <StatValue>{balance} ETH</StatValue>
            <StatLabel>Balance</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{userData.energyGenerated}</StatValue>
            <StatLabel>Generated</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{userData.energyUsed}</StatValue>
            <StatLabel>Used</StatLabel>
          </StatItem>
          {/* <StatItem>
            <StatValue>{userData.points}</StatValue>
            <StatLabel>Points</StatLabel>
          </StatItem> */}
        </UserStats>

        <DisconnectButton
          onClick={() => {
            disconnectWallet();
            setIsOpen(false);
          }}
        >
          <FaSignOutAlt style={{ marginRight: "0.5rem" }} />
          Disconnect Wallet
        </DisconnectButton>
      </DropdownMenu>
    </DropdownContainer>
  );
};
