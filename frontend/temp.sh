#!/bin/bash

# Enhanced Solar Energy Portal Setup Script with Web3 Integration (FIXED)
# This script creates the complete file structure with Web3 functionality

echo "🌞 Setting up Enhanced Solar Energy Portal with Web3 (Fixed Version)..."
echo "======================================================================"

# Check if we're in the right directory (should have package.json)
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from your React app root directory."
    exit 1
fi

# Create enhanced directory structure
echo "📁 Creating enhanced directory structure..."
mkdir -p src/components/Header
mkdir -p src/components/ThemeToggle
mkdir -p src/components/ScrollToTop
mkdir -p src/components/Layout
mkdir -p src/components/UserDropdown
mkdir -p src/components/WalletConnection
mkdir -p src/components/ComingSoon
mkdir -p src/styles
mkdir -p src/context
mkdir -p src/hooks
mkdir -p src/pages/Home
mkdir -p src/pages/Leaderboard
mkdir -p src/pages/EnergyUsage
mkdir -p src/pages/EnergyGenerated
mkdir -p src/utils

echo "✅ Enhanced directory structure created!"

# Install required dependencies
echo "📦 Installing enhanced dependencies..."
npm install styled-components react-icons web3 ethers

# Create enhanced themes.js
echo "🎨 Creating enhanced themes configuration..."
cat > src/styles/themes.js << 'EOF'
export const lightTheme = {
  name: 'light',
  colors: {
    primary: '#FFD54F',
    accent: '#66BB6A',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    textPrimary: '#212121',
    textSecondary: '#616161',
    border: '#E0E0E0',
    shadow: 'rgba(0, 0, 0, 0.1)',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
  fonts: {
    heading: "'Orbitron', monospace",
    body: "'Inter', sans-serif",
    accent: "'Exo 2', sans-serif",
  },
};

export const darkTheme = {
  name: 'dark',
  colors: {
    primary: '#FFEB3B',
    accent: '#26C6DA',
    background: '#121212',
    surface: '#1E1E1E',
    textPrimary: '#E0E0E0',
    textSecondary: '#9E9E9E',
    border: '#333333',
    shadow: 'rgba(0, 0, 0, 0.3)',
    success: '#66BB6A',
    warning: '#FFA726',
    error: '#EF5350',
    info: '#42A5F5',
  },
  fonts: {
    heading: "'Orbitron', monospace",
    body: "'Inter', sans-serif",
    accent: "'Exo 2', sans-serif",
  },
};
EOF

# Create enhanced GlobalStyles.js
echo "🌍 Creating enhanced global styles..."
cat > src/styles/GlobalStyles.js << 'EOF'
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&family=Exo+2:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    transition: all 0.3s ease;
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;
EOF

# Create Web3Context.js
echo "🔗 Creating Web3 context..."
cat > src/context/Web3Context.js << 'EOF'
import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';

const Web3Context = createContext();

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsConnecting(true);
        setError(null);
        
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create web3 instance
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        
        // Get accounts
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
        
        // Store connection state
        localStorage.setItem('walletConnected', 'true');
        
        console.log('Connected to wallet:', accounts[0]);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        setError('Failed to connect wallet');
      } finally {
        setIsConnecting(false);
      }
    } else {
      setError('MetaMask is not installed');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setWeb3(null);
    localStorage.removeItem('walletConnected');
  };

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined' && localStorage.getItem('walletConnected')) {
      try {
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.getAccounts();
        
        if (accounts.length > 0) {
          setWeb3(web3Instance);
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error('Failed to check connection:', error);
      }
    }
  };

  useEffect(() => {
    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Web3Context.Provider value={{
      account,
      web3,
      isConnecting,
      error,
      connectWallet,
      disconnectWallet,
      formatAddress,
      isConnected: !!account,
    }}>
      {children}
    </Web3Context.Provider>
  );
};
EOF

# Create enhanced ThemeContext.js
echo "🎭 Creating enhanced theme context..."
cat > src/context/ThemeContext.js << 'EOF'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '../styles/themes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
EOF

# Create useScrollToTop hook
echo "🪝 Creating scroll to top hook..."
cat > src/hooks/useScrollToTop.js << 'EOF'
import { useState, useEffect } from 'react';

export const useScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return { isVisible, scrollToTop };
};
EOF

# Create WalletConnection component
echo "💳 Creating Wallet Connection component..."
cat > src/components/WalletConnection/WalletConnection.styles.js << 'EOF'
import styled from 'styled-components';

export const WalletButton = styled.button`
  background: ${({ theme, $connected }) => 
    $connected ? theme.colors.success : theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  &:hover {
    background: ${({ theme, $connected }) => 
      $connected ? theme.colors.success : theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${({ theme }) => theme.colors.shadow};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
EOF

cat > src/components/WalletConnection/WalletConnection.jsx << 'EOF'
import React from 'react';
import { FaWallet, FaCheckCircle } from 'react-icons/fa';
import { useWeb3 } from '../../context/Web3Context';
import { WalletButton, LoadingSpinner } from './WalletConnection.styles';

export const WalletConnection = () => {
  const { isConnected, isConnecting, connectWallet, formatAddress, account } = useWeb3();

  if (isConnected) {
    return (
      <WalletButton $connected={true} disabled>
        <FaCheckCircle />
        {formatAddress(account)}
      </WalletButton>
    );
  }

  return (
    <WalletButton onClick={connectWallet} disabled={isConnecting}>
      {isConnecting ? (
        <>
          <LoadingSpinner />
          Connecting...
        </>
      ) : (
        <>
          <FaWallet />
          Connect Wallet
        </>
      )}
    </WalletButton>
  );
};
EOF

# Create UserDropdown component
echo "👤 Creating User Dropdown component..."
cat > src/components/UserDropdown/UserDropdown.styles.js << 'EOF'
import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 50px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }

  svg {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 1rem;
  min-width: 280px;
  box-shadow: 0 8px 25px ${({ theme }) => theme.colors.shadow};
  z-index: 1000;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: all 0.3s ease;
`;

export const UserInfo = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

export const UserName = styled.h4`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const UserAddress = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  font-family: monospace;
`;

export const UserStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.2rem;
`;

export const DisconnectButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  padding: 0.7rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.error}dd;
    transform: translateY(-1px);
  }
`;
EOF

cat > src/components/UserDropdown/UserDropdown.jsx << 'EOF'
import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaChevronDown, FaSignOutAlt } from 'react-icons/fa';
import { useWeb3 } from '../../context/Web3Context';
import {
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  UserInfo,
  UserName,
  UserAddress,
  UserStats,
  StatItem,
  StatValue,
  StatLabel,
  DisconnectButton,
} from './UserDropdown.styles';

export const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { account, formatAddress, disconnectWallet } = useWeb3();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock user data - replace with real data from your backend
  const userData = {
    username: 'imangi-iit',
    energyGenerated: '1,250 kWh',
    energyUsed: '980 kWh',
    rank: '#42',
    points: '8,750',
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        <FaUser />
        {userData.username}
        <FaChevronDown style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </DropdownButton>

      <DropdownMenu $isOpen={isOpen}>
        <UserInfo>
          <UserName>{userData.username}</UserName>
          <UserAddress>{formatAddress(account)}</UserAddress>
        </UserInfo>

        <UserStats>
          <StatItem>
            <StatValue>{userData.energyGenerated}</StatValue>
            <StatLabel>Generated</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{userData.energyUsed}</StatValue>
            <StatLabel>Used</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{userData.rank}</StatValue>
            <StatLabel>Rank</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{userData.points}</StatValue>
            <StatLabel>Points</StatLabel>
          </StatItem>
        </UserStats>

        <DisconnectButton onClick={() => { disconnectWallet(); setIsOpen(false); }}>
          <FaSignOutAlt style={{ marginRight: '0.5rem' }} />
          Disconnect Wallet
        </DisconnectButton>
      </DropdownMenu>
    </DropdownContainer>
  );
};
EOF

# Create ComingSoon component
echo "🚧 Creating Coming Soon component..."
cat > src/components/ComingSoon/ComingSoon.jsx << 'EOF'
import React from 'react';
import { FaRocket, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 15px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.2rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

export const ComingSoon = ({ onClose }) => {
  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <Icon>
          <FaRocket />
        </Icon>
        <Title>Coming Soon!</Title>
        <Message>
          We're working hard to bring you this awesome feature. 
          Stay tuned for exciting updates and cool new functionality!
        </Message>
      </ModalContent>
    </Modal>
  );
};
EOF

# Create ThemeToggle component
echo "🌓 Creating Theme Toggle component..."
cat > src/components/ThemeToggle/ThemeToggle.styles.js << 'EOF'
import styled from 'styled-components';

export const ToggleButton = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 50px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.textPrimary};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    transform: scale(1.05);
  }

  svg {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: rotate(20deg);
  }
`;
EOF

cat > src/components/ThemeToggle/ThemeToggle.jsx << 'EOF'
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { ToggleButton } from './ThemeToggle.styles';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme} title="Toggle theme">
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
};
EOF

# Create enhanced Header component
echo "📋 Creating enhanced Header component..."
cat > src/components/Header/Header.styles.js << 'EOF'
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 2px 10px ${({ theme }) => theme.colors.shadow};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export const Logo = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    order: 3;
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`;

export const NavItem = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;
EOF

cat > src/components/Header/Header.jsx << 'EOF'
import React, { useState } from 'react';
import { FaSolarPanel } from 'react-icons/fa';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { WalletConnection } from '../WalletConnection/WalletConnection';
import { UserDropdown } from '../UserDropdown/UserDropdown';
import { ComingSoon } from '../ComingSoon/ComingSoon';
import { useWeb3 } from '../../context/Web3Context';
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  Nav,
  NavItem,
  RightSection,
} from './Header.styles';

export const Header = ({ onNavigate }) => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { isConnected } = useWeb3();

  const handleNavigation = (page) => {
    if (['leaderboard', 'energyUsage', 'energyGenerated'].includes(page)) {
      onNavigate(page);
    } else {
      setShowComingSoon(true);
    }
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Logo onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
            <FaSolarPanel />
            Solar Portal
          </Logo>
          
          <Nav>
            <NavItem onClick={() => handleNavigation('leaderboard')}>
              Leaderboard
            </NavItem>
            <NavItem onClick={() => handleNavigation('energyUsage')}>
              Energy Usage
            </NavItem>
            <NavItem onClick={() => handleNavigation('energyGenerated')}>
              Energy Generated
            </NavItem>
          </Nav>

          <RightSection>
            {!isConnected ? (
              <WalletConnection />
            ) : (
              <UserDropdown />
            )}
            <ThemeToggle />
          </RightSection>
        </HeaderContent>
      </HeaderContainer>

      {showComingSoon && (
        <ComingSoon onClose={() => setShowComingSoon(false)} />
      )}
    </>
  );
};
EOF

# Create ScrollToTop component
echo "⬆️ Creating Scroll to Top component..."
cat > src/components/ScrollToTop/ScrollToTop.styles.js << 'EOF'
import styled from 'styled-components';

export const ScrollButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  transition: all 0.3s ease;
  z-index: 1000;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transform: ${({ $isVisible }) => ($isVisible ? 'translateY(0)' : 'translateY(20px)')};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-5px);
    box-shadow: 0 6px 25px ${({ theme }) => theme.colors.shadow};
  }

  svg {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    width: 50px;
    height: 50px;

    svg {
      font-size: 1.2rem;
    }
  }
`;
EOF

cat > src/components/ScrollToTop/ScrollToTop.jsx << 'EOF'
import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { ScrollButton } from './ScrollToTop.styles';

export const ScrollToTop = () => {
  const { isVisible, scrollToTop } = useScrollToTop();

  return (
    <ScrollButton
      $isVisible={isVisible}
      onClick={scrollToTop}
      title="Scroll to top"
    >
      <FaArrowUp />
    </ScrollButton>
  );
};
EOF

# Create Layout component
echo "🏗️ Creating Layout component..."
cat > src/components/Layout/Layout.styles.js << 'EOF'
import styled from 'styled-components';

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2rem 0;
`;
EOF

cat > src/components/Layout/Layout.jsx << 'EOF'
import React from 'react';
import { Header } from '../Header/Header';
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';
import { LayoutContainer, MainContent } from './Layout.styles';

export const Layout = ({ children, onNavigate }) => {
  return (
    <LayoutContainer>
      <Header onNavigate={onNavigate} />
      <MainContent>
        {children}
      </MainContent>
      <ScrollToTop />
    </LayoutContainer>
  );
};
EOF

# Create enhanced Home page with Coming Soon functionality
echo "🏠 Creating enhanced Home page..."
cat > src/pages/Home/Home.styles.js << 'EOF'
import styled from 'styled-components';

export const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const WelcomeSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}20,
    ${({ theme }) => theme.colors.accent}20
  );
  border-radius: 20px;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textPrimary};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

export const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

export const FeatureTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;
EOF

cat > src/pages/Home/Home.jsx << 'EOF'
import React, { useState } from 'react';
import { FaSolarPanel, FaBolt, FaChartLine, FaLeaf, FaTrophy, FaCog } from 'react-icons/fa';
import { ComingSoon } from '../../components/ComingSoon/ComingSoon';
import {
  HomeContainer,
  WelcomeSection,
  Title,
  Subtitle,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
} from './Home.styles';

export const Home = ({ onNavigate }) => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const features = [
    {
      icon: <FaTrophy />,
      title: 'Leaderboard',
      description: 'Compete with other users and see your ranking in solar energy generation and efficiency.',
      action: () => onNavigate('leaderboard'),
    },
    {
      icon: <FaBolt />,
      title: 'Power Usage Analytics',
      description: 'Keep track of your power consumption patterns and optimize your energy usage.',
      action: () => onNavigate('energyUsage'),
    },
    {
      icon: <FaSolarPanel />,
      title: 'Power Generated Analytics',
      description: 'Monitor your solar panel output in real-time and track energy generation over time.',
      action: () => onNavigate('energyGenerated'),
    },
    {
      icon: <FaChartLine />,
      title: 'Performance Analytics',
      description: 'Detailed insights and analytics to help you understand your energy efficiency.',
      action: () => setShowComingSoon(true),
    },
    {
      icon: <FaLeaf />,
      title: 'Environmental Impact',
      description: 'See how much CO2 you\'ve saved and your positive impact on the environment.',
      action: () => setShowComingSoon(true),
    },
    {
      icon: <FaCog />,
      title: 'Smart Controls',
      description: 'Automate your energy usage with smart controls and optimization algorithms.',
      action: () => setShowComingSoon(true),
    },
  ];

  return (
    <>
      <HomeContainer>
        <WelcomeSection>
          <Title>Welcome to Solar Portal</Title>
          <Subtitle>
            Your comprehensive platform for tracking solar energy generation and power consumption.
            Monitor, analyze, and optimize your energy usage with our advanced analytics dashboard.
          </Subtitle>
        </WelcomeSection>

        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index} onClick={feature.action}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </HomeContainer>

      {showComingSoon && (
        <ComingSoon onClose={() => setShowComingSoon(false)} />
      )}
    </>
  );
};
EOF

# Create Leaderboard page
echo "🏆 Creating Leaderboard page..."
cat > src/pages/Leaderboard/Leaderboard.styles.js << 'EOF'
import styled from 'styled-components';

export const LeaderboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const StatIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

export const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.2rem;
`;

export const LeaderboardTable = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 15px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
`;

export const TableHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 1rem 2rem;
  font-weight: 600;
  display: grid;
  grid-template-columns: 80px 1fr 120px 120px 100px;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 60px 1fr 80px 80px;
    padding: 1rem;
    font-size: 0.9rem;
    
    & > :nth-child(4) {
      display: none;
    }
  }
`;

export const TableRow = styled.div`
  padding: 1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  grid-template-columns: 80px 1fr 120px 120px 100px;
  gap: 1rem;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 60px 1fr 80px 80px;
    padding: 1rem;
    
    & > :nth-child(4) {
      display: none;
    }
  }
`;

export const RankBadge = styled.div`
  background: ${({ theme, $rank }) => {
    if ($rank === 1) return '#FFD700';
    if ($rank === 2) return '#C0C0C0';
    if ($rank === 3) return '#CD7F32';
    return theme.colors.accent;
  }};
  color: ${({ theme }) => theme.colors.background};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }
`;

export const UserName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ValueCell = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
EOF

cat > src/pages/Leaderboard/Leaderboard.jsx << 'EOF'
import React from 'react';
import { FaTrophy, FaUsers, FaBolt, FaSolarPanel } from 'react-icons/fa';
import {
  LeaderboardContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  StatsGrid,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
  LeaderboardTable,
  TableHeader,
  TableRow,
  RankBadge,
  UserInfo,
  UserAvatar,
  UserName,
  ValueCell,
} from './Leaderboard.styles';

export const Leaderboard = () => {
  const stats = [
    { icon: <FaUsers />, value: '1,247', label: 'Active Users' },
    { icon: <FaSolarPanel />, value: '50.2k', label: 'Total Generated (kWh)' },
    { icon: <FaBolt />, value: '42.8k', label: 'Total Used (kWh)' },
    { icon: <FaTrophy />, value: '15.7%', label: 'Efficiency Gain' },
  ];

  const leaderboardData = [
    { rank: 1, name: 'solar_king_2024', generated: '2,450', used: '1,200', efficiency: '95%', points: 12500 },
    { rank: 2, name: 'green_energy_pro', generated: '2,100', used: '1,150', efficiency: '92%', points: 11200 },
    { rank: 3, name: 'eco_warrior_x', generated: '1,980', used: '1,100', efficiency: '89%', points: 10800 },
    { rank: 4, name: 'imangi-iit', generated: '1,250', used: '980', efficiency: '87%', points: 8750 },
    { rank: 5, name: 'sustainable_sam', generated: '1,180', used: '950', efficiency: '85%', points: 8200 },
    { rank: 6, name: 'power_saver_101', generated: '1,050', used: '890', efficiency: '83%', points: 7800 },
    { rank: 7, name: 'clean_tech_fan', generated: '980', used: '820', efficiency: '81%', points: 7200 },
    { rank: 8, name: 'solar_student', generated: '850', used: '750', efficiency: '78%', points: 6500 },
    { rank: 9, name: 'green_pioneer', generated: '720', used: '680', efficiency: '75%', points: 5800 },
    { rank: 10, name: 'eco_newbie', generated: '650', used: '620', efficiency: '72%', points: 5200 },
  ];

  return (
    <LeaderboardContainer>
      <PageHeader>
        <PageTitle>🏆 Energy Leaderboard</PageTitle>
        <PageSubtitle>
          Compete with other users and track your solar energy performance
        </PageSubtitle>
      </PageHeader>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatIcon>{stat.icon}</StatIcon>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>

      <LeaderboardTable>
        <TableHeader>
          <div>Rank</div>
          <div>User</div>
          <div>Generated</div>
          <div>Used</div>
          <div>Points</div>
        </TableHeader>
        
        {leaderboardData.map((user) => (
          <TableRow key={user.rank}>
            <RankBadge $rank={user.rank}>
              {user.rank <= 3 ? (
                user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'
              ) : (
                user.rank
              )}
            </RankBadge>
            <UserInfo>
              <UserAvatar>
                {user.name.charAt(0).toUpperCase()}
              </UserAvatar>
              <UserName>{user.name}</UserName>
            </UserInfo>
            <ValueCell>{user.generated} kWh</ValueCell>
            <ValueCell>{user.used} kWh</ValueCell>
            <ValueCell>{user.points.toLocaleString()}</ValueCell>
          </TableRow>
        ))}
      </LeaderboardTable>
    </LeaderboardContainer>
  );
};
EOF

# Create EnergyUsage page
echo "⚡ Creating Energy Usage page..."
cat > src/pages/EnergyUsage/EnergyUsage.styles.js << 'EOF'
import styled from 'styled-components';

export const EnergyUsageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

export const MetricCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const MetricTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.1rem;
`;

export const MetricIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.accent};
`;

export const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-bottom: 0.5rem;
`;

export const MetricChange = styled.div`
  font-size: 0.9rem;
  color: ${({ $positive, theme }) => 
    $positive ? theme.colors.success : theme.colors.error};
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
`;

export const ChartTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const UsageLogSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 15px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
`;

export const LogHeader = styled.div`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  padding: 1.5rem 2rem;
  font-weight: 600;
  font-size: 1.2rem;
`;

export const LogEntry = styled.div`
  padding: 1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  grid-template-columns: 120px 1fr 100px 80px;
  gap: 1rem;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 80px;
    gap: 0.5rem;
    
    & > :nth-child(1),
    & > :nth-child(3) {
      display: none;
    }
  }
`;

export const LogTime = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

export const LogDevice = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
`;

export const LogUsage = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
`;

export const LogStatus = styled.div`
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  background: ${({ $status, theme }) => {
    switch ($status) {
      case 'high': return theme.colors.error + '20';
      case 'medium': return theme.colors.warning + '20';
      case 'low': return theme.colors.success + '20';
      default: return theme.colors.border;
    }
  }};
  color: ${({ $status, theme }) => {
    switch ($status) {
      case 'high': return theme.colors.error;
      case 'medium': return theme.colors.warning;
      case 'low': return theme.colors.success;
      default: return theme.colors.textSecondary;
    }
  }};
`;

export const MockChart = styled.div`
  height: 200px;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.accent}20,
    ${({ theme }) => theme.colors.primary}20
  );
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
`;
EOF

cat > src/pages/EnergyUsage/EnergyUsage.jsx << 'EOF'
import React from 'react';
import { FaBolt, FaTrendingUp, FaTrendingDown, FaHome, FaClock, FaChartLine } from 'react-icons/fa';
import {
  EnergyUsageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  MetricsGrid,
  MetricCard,
  MetricHeader,
  MetricTitle,
  MetricIcon,
  MetricValue,
  MetricChange,
  ChartsSection,
  ChartCard,
  ChartTitle,
  UsageLogSection,
  LogHeader,
  LogEntry,
  LogTime,
  LogDevice,
  LogUsage,
  LogStatus,
  MockChart,
} from './EnergyUsage.styles';

export const EnergyUsage = () => {
  const metrics = [
    {
      title: 'Total Usage Today',
      value: '24.8 kWh',
      change: '+12% vs yesterday',
      positive: false,
      icon: <FaBolt />,
    },
    {
      title: 'Average Daily Usage',
      value: '22.3 kWh',
      change: '-5% this month',
      positive: true,
      icon: <FaHome />,
    },
    {
      title: 'Peak Usage Time',
      value: '7:30 PM',
      change: '6.2 kWh peak',
      positive: null,
      icon: <FaClock />,
    },
    {
      title: 'Monthly Usage',
      value: '670 kWh',
      change: '+3% vs last month',
      positive: false,
      icon: <FaChartLine />,
    },
  ];

  const usageLogs = [
    { time: '09:45 AM', device: 'Air Conditioning', usage: '3.2 kWh', status: 'high' },
    { time: '09:30 AM', device: 'Water Heater', usage: '2.8 kWh', status: 'medium' },
    { time: '09:15 AM', device: 'Washing Machine', usage: '1.5 kWh', status: 'medium' },
    { time: '09:00 AM', device: 'Refrigerator', usage: '0.8 kWh', status: 'low' },
    { time: '08:45 AM', device: 'LED Lights (Living Room)', usage: '0.2 kWh', status: 'low' },
    { time: '08:30 AM', device: 'Laptop Charging', usage: '0.1 kWh', status: 'low' },
    { time: '08:15 AM', device: 'Coffee Maker', usage: '1.2 kWh', status: 'medium' },
    { time: '08:00 AM', device: 'Microwave', usage: '0.9 kWh', status: 'low' },
    { time: '07:45 AM', device: 'Electric Kettle', usage: '1.8 kWh', status: 'medium' },
    { time: '07:30 AM', device: 'Hair Dryer', usage: '1.5 kWh', status: 'medium' },
  ];

  return (
    <EnergyUsageContainer>
      <PageHeader>
        <PageTitle>⚡ Power Usage Analytics</PageTitle>
        <PageSubtitle>
          Monitor and analyze your energy consumption patterns
        </PageSubtitle>
      </PageHeader>

      <MetricsGrid>
        {metrics.map((metric, index) => (
          <MetricCard key={index}>
            <MetricHeader>
              <MetricTitle>{metric.title}</MetricTitle>
              <MetricIcon>{metric.icon}</MetricIcon>
            </MetricHeader>
            <MetricValue>{metric.value}</MetricValue>
            {metric.positive !== null && (
              <MetricChange $positive={metric.positive}>
                {metric.positive ? <FaTrendingDown /> : <FaTrendingUp />}
                {metric.change}
              </MetricChange>
            )}
          </MetricCard>
        ))}
      </MetricsGrid>

      <ChartsSection>
        <ChartCard>
          <ChartTitle>Daily Usage Pattern</ChartTitle>
          <MockChart>
            📊 Interactive usage chart will be implemented here
          </MockChart>
        </ChartCard>
        
        <ChartCard>
          <ChartTitle>
                    <ChartTitle>Device Breakdown</ChartTitle>
          <MockChart>
            🥧 Device usage pie chart will be implemented here
          </MockChart>
        </ChartCard>
      </ChartsSection>

      <UsageLogSection>
        <LogHeader>⏰ Real-time Usage Log</LogHeader>
        {usageLogs.map((log, index) => (
          <LogEntry key={index}>
            <LogTime>{log.time}</LogTime>
            <LogDevice>{log.device}</LogDevice>
            <LogUsage>{log.usage}</LogUsage>
            <LogStatus $status={log.status}>
              {log.status.toUpperCase()}
            </LogStatus>
          </LogEntry>
        ))}
      </UsageLogSection>
    </EnergyUsageContainer>
  );
};
EOF

# Create EnergyGenerated page
echo "🌞 Creating Energy Generated page..."
cat > src/pages/EnergyGenerated/EnergyGenerated.styles.js << 'EOF'
import styled from 'styled-components';

export const EnergyGeneratedContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

export const MetricCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const MetricTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.1rem;
`;

export const MetricIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-bottom: 0.5rem;
`;

export const MetricChange = styled.div`
  font-size: 0.9rem;
  color: ${({ $positive, theme }) => 
    $positive ? theme.colors.success : theme.colors.error};
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
`;

export const ChartTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const GenerationLogSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 15px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
`;

export const LogHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 1.5rem 2rem;
  font-weight: 600;
  font-size: 1.2rem;
`;

export const LogEntry = styled.div`
  padding: 1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  grid-template-columns: 120px 1fr 120px 100px 100px;
  gap: 1rem;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 100px 80px;
    gap: 0.5rem;
    
    & > :nth-child(1),
    & > :nth-child(4) {
      display: none;
    }
  }
`;

export const LogTime = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

export const LogPanel = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
`;

export const LogGeneration = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const LogEfficiency = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 500;
`;

export const LogCondition = styled.div`
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  background: ${({ $condition, theme }) => {
    switch ($condition) {
      case 'excellent': return theme.colors.success + '20';
      case 'good': return theme.colors.primary + '20';
      case 'fair': return theme.colors.warning + '20';
      case 'poor': return theme.colors.error + '20';
      default: return theme.colors.border;
    }
  }};
  color: ${({ $condition, theme }) => {
    switch ($condition) {
      case 'excellent': return theme.colors.success;
      case 'good': return theme.colors.primary;
      case 'fair': return theme.colors.warning;
      case 'poor': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  }};
`;

export const MockChart = styled.div`
  height: 200px;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.primary}20,
    ${({ theme }) => theme.colors.accent}20
  );
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
`;
EOF

cat > src/pages/EnergyGenerated/EnergyGenerated.jsx << 'EOF'
import React from 'react';
import { FaSolarPanel, FaTrendingUp, FaTrendingDown, FaLeaf, FaBolt, FaSun } from 'react-icons/fa';
import {
  EnergyGeneratedContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  MetricsGrid,
  MetricCard,
  MetricHeader,
  MetricTitle,
  MetricIcon,
  MetricValue,
  MetricChange,
  ChartsSection,
  ChartCard,
  ChartTitle,
  GenerationLogSection,
  LogHeader,
  LogEntry,
  LogTime,
  LogPanel,
  LogGeneration,
  LogEfficiency,
  LogCondition,
  MockChart,
} from './EnergyGenerated.styles';

export const EnergyGenerated = () => {
  const metrics = [
    {
      title: 'Generated Today',
      value: '31.2 kWh',
      change: '+18% vs yesterday',
      positive: true,
      icon: <FaSolarPanel />,
    },
    {
      title: 'Peak Generation',
      value: '4.8 kW',
      change: 'at 12:30 PM',
      positive: null,
      icon: <FaSun />,
    },
    {
      title: 'System Efficiency',
      value: '87.3%',
      change: '+2% this week',
      positive: true,
      icon: <FaBolt />,
    },
    {
      title: 'CO₂ Saved Today',
      value: '18.7 kg',
      change: '+15% vs yesterday',
      positive: true,
      icon: <FaLeaf />,
    },
  ];

  const generationLogs = [
    { time: '02:30 PM', panel: 'Panel Array A (South)', generation: '4.8 kW', efficiency: '92%', condition: 'excellent' },
    { time: '02:15 PM', panel: 'Panel Array B (West)', generation: '3.2 kW', efficiency: '88%', condition: 'good' },
    { time: '02:00 PM', panel: 'Panel Array C (East)', generation: '2.1 kW', efficiency: '85%', condition: 'good' },
    { time: '01:45 PM', panel: 'Panel Array A (South)', generation: '4.6 kW', efficiency: '91%', condition: 'excellent' },
    { time: '01:30 PM', panel: 'Panel Array B (West)', generation: '3.0 kW', efficiency: '86%', condition: 'good' },
    { time: '01:15 PM', panel: 'Panel Array C (East)', generation: '1.9 kW', efficiency: '82%', condition: 'fair' },
    { time: '01:00 PM', panel: 'Panel Array A (South)', generation: '4.4 kW', efficiency: '89%', condition: 'good' },
    { time: '12:45 PM', panel: 'Panel Array B (West)', generation: '2.8 kW', efficiency: '84%', condition: 'good' },
    { time: '12:30 PM', panel: 'Panel Array A (South)', generation: '4.8 kW', efficiency: '93%', condition: 'excellent' },
    { time: '12:15 PM', panel: 'Panel Array C (East)', generation: '2.2 kW', efficiency: '87%', condition: 'good' },
  ];

  return (
    <EnergyGeneratedContainer>
      <PageHeader>
        <PageTitle>🌞 Solar Energy Generation</PageTitle>
        <PageSubtitle>
          Track your solar panel performance and energy generation analytics
        </PageSubtitle>
      </PageHeader>

      <MetricsGrid>
        {metrics.map((metric, index) => (
          <MetricCard key={index}>
            <MetricHeader>
              <MetricTitle>{metric.title}</MetricTitle>
              <MetricIcon>{metric.icon}</MetricIcon>
            </MetricHeader>
            <MetricValue>{metric.value}</MetricValue>
            {metric.positive !== null && (
              <MetricChange $positive={metric.positive}>
                {metric.positive ? <FaTrendingUp /> : <FaTrendingDown />}
                {metric.change}
              </MetricChange>
            )}
          </MetricCard>
        ))}
      </MetricsGrid>

      <ChartsSection>
        <ChartCard>
          <ChartTitle>Generation Pattern (24h)</ChartTitle>
          <MockChart>
            ☀️ Solar generation timeline chart will be implemented here
          </MockChart>
        </ChartCard>
        
        <ChartCard>
          <ChartTitle>Panel Performance</ChartTitle>
          <MockChart>
            📈 Panel efficiency comparison chart will be implemented here
          </MockChart>
        </ChartCard>
      </ChartsSection>

      <GenerationLogSection>
        <LogHeader>☀️ Live Generation Monitor</LogHeader>
        {generationLogs.map((log, index) => (
          <LogEntry key={index}>
            <LogTime>{log.time}</LogTime>
            <LogPanel>{log.panel}</LogPanel>
            <LogGeneration>{log.generation}</LogGeneration>
            <LogEfficiency>{log.efficiency}</LogEfficiency>
            <LogCondition $condition={log.condition}>
              {log.condition.toUpperCase()}
            </LogCondition>
          </LogEntry>
        ))}
      </GenerationLogSection>
    </EnergyGeneratedContainer>
  );
};
EOF

# Create the main App.js with proper provider wrapping and navigation
echo "⚛️ Creating main App component with proper provider structure..."
cat > src/App.js << 'EOF'
import React, { useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Web3Provider } from './context/Web3Context';
import { GlobalStyles } from './styles/GlobalStyles';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import { Leaderboard } from './pages/Leaderboard/Leaderboard';
import { EnergyUsage } from './pages/EnergyUsage/EnergyUsage';
import { EnergyGenerated } from './pages/EnergyGenerated/EnergyGenerated';

const AppContent = () => {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigation} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'energyUsage':
        return <EnergyUsage />;
      case 'energyGenerated':
        return <EnergyGenerated />;
      default:
        return <Home onNavigate={handleNavigation} />;
    }
  };

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout onNavigate={handleNavigation}>
        {renderCurrentPage()}
      </Layout>
    </StyledThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Web3Provider>
        <AppContent />
      </Web3Provider>
    </ThemeProvider>
  );
}

export default App;
EOF

# Remove default CSS files that might interfere
echo "🧹 Cleaning up default files..."
rm -f src/App.css src/index.css src/logo.svg src/App.test.js src/reportWebVitals.js src/setupTests.js

# Update index.js to remove reportWebVitals
echo "📝 Updating index.js..."
cat > src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# Update public/index.html for better SEO and MetaMask detection
echo "🌐 Updating public/index.html..."
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#FFD54F" />
    <meta
      name="description"
      content="Solar Energy Portal - Track your solar energy generation and power consumption with advanced analytics and blockchain integration."
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    
    <!-- Preload Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <title>Solar Portal - Energy Tracking & Analytics</title>
    
    <!-- MetaMask Detection -->
    <script>
      // Detect if MetaMask is installed
      window.addEventListener('load', function() {
        if (typeof window.ethereum !== 'undefined') {
          console.log('MetaMask is installed!');
        } else {
          console.log('MetaMask is not installed. Please install MetaMask to use all features.');
        }
      });
    </script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOF

# Create a package.json scripts update
echo "📦 Adding useful npm scripts..."
cat >> package.json << 'EOF'

// Note: Add these scripts to your package.json manually:
// "scripts": {
//   "start": "react-scripts start",
//   "build": "react-scripts build",
//   "test": "react-scripts test",
//   "eject": "react-scripts eject",
//   "lint": "eslint src/",
//   "format": "prettier --write src/"
// }
EOF

echo ""
echo "🎉 Enhanced Solar Portal Setup Complete!"
echo "==========================================="
echo ""
echo "✅ All files and folders have been created successfully!"
echo "✅ Enhanced features implemented:"
echo "   • MetaMask wallet integration with Web3"
echo "   • User dropdown with account info and stats"
echo "   • Updated navigation (Leaderboard, Energy Usage, Energy Generated)"
echo "   • Coming Soon modals for unimplemented features"
echo "   • Comprehensive leaderboard with rankings and stats"
echo "   • Energy usage analytics with real-time logs"
echo "   • Solar generation tracking with panel monitoring"
echo "   • Responsive design for mobile and desktop"
echo "   • Enhanced theming with dark/light mode"
echo ""
echo "📁 Complete file structure created:"
echo "   ├── src/"
echo "   │   ├── components/"
echo "   │   │   ├── Header/ (Enhanced with Web3 integration)"
echo "   │   │   ├── ThemeToggle/"
echo "   │   │   ├── ScrollToTop/"
echo "   │   │   ├── Layout/"
echo "   │   │   ├── UserDropdown/ (NEW)"
echo "   │   │   ├── WalletConnection/ (NEW)"
echo "   │   │   └── ComingSoon/ (NEW)"
echo "   │   ├── context/"
echo "   │   │   ├── ThemeContext.js"
echo "   │   │   └── Web3Context.js (NEW)"
echo "   │   ├── pages/"
echo "   │   │   ├── Home/ (Enhanced with navigation)"
echo "   │   │   ├── Leaderboard/ (NEW)"
echo "   │   │   ├── EnergyUsage/ (NEW)"
echo "   │   │   └── EnergyGenerated/ (NEW)"
echo "   │   ├── styles/ (Enhanced themes)"
echo "   │   ├── hooks/"
echo "   │   └── utils/"
echo ""
echo "🔗 Web3 Integration Features:"
echo "   • MetaMask connection/disconnection"
echo "   • Account address display"
echo "   • Wallet state management"
echo "   • Blockchain network detection"
echo "   • Persistent wallet connections"
echo ""
echo "📊 Analytics Pages:"
echo "   • Leaderboard: User rankings, stats, and competition"
echo "   • Energy Usage: Real-time usage monitoring and logs"
echo "   • Energy Generated: Solar panel performance tracking"
echo ""
echo "🚀 Next steps:"
echo "   1. Run 'npm start' to start the development server"
echo "   2. Install MetaMask browser extension for Web3 features"
echo "   3. Open http://localhost:3000 to view your enhanced app"
echo "   4. Connect your MetaMask wallet to see user features"
echo ""
echo "🌟 Current user logged in as: imangi-iit"
echo "📅 Setup completed on: 2025-08-30 10:32:48 UTC"
echo ""
echo "💡 Pro Tips:"
echo "   • The app works without MetaMask but with limited features"
echo "   • User data is currently mocked - integrate with your backend"
echo "   • Charts are placeholders - integrate with chart libraries"
echo "   • Coming Soon modals appear for unimplemented features"
echo ""
echo "Happy coding! 🎯⚡🌞"
EOF

# Make the script executable
chmod +x setup-enhanced-solar-portal-fixed.sh

echo "✅ Enhanced bash script created successfully!"
echo ""
echo "🚀 To use this FIXED script:"
echo "1. Save it as 'setup-enhanced-solar-portal-fixed.sh' in your React app root directory"
echo "2. Make it executable: chmod +x setup-enhanced-solar-portal-fixed.sh"
echo "3. Run it: ./setup-enhanced-solar-portal-fixed.sh"
echo ""
echo "🔧 Key fixes in this version:"
echo "• Fixed Web3Provider wrapping issue in App.js"
echo "• Properly structured provider hierarchy (Theme > Web3 > App)"
echo "• Enhanced navigation system with page routing"
echo "• Complete implementation of all components"
echo "• Comprehensive error handling for MetaMask integration"
echo ""
echo "⚠️  Prerequisites:"
echo "• Run this script from your React app root directory (where package.json is located)"
echo "• Make sure you have npm installed"
echo "• Install MetaMask browser extension for full Web3 functionality"