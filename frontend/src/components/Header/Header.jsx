import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaSolarPanel,
  FaBolt,
  FaTrophy,
  FaShoppingCart,
  FaCoins,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaSpinner,
  FaGem,
} from "react-icons/fa";
import { useWeb3 } from "../../context/Web3Context";
import { useMarketplace } from "../../context/MarketplaceContext";
import { useTheme } from "../../context/ThemeContext";
import { WalletConnection } from "../WalletConnection/WalletConnection";
import { UserDropdown } from "../UserDropdown/UserDropdown";
import { ShoppingCart } from "../Marketplace/ShoppingCart";
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  Navigation,
  NavItem,
  NavLink,
  MobileMenuButton,
  MobileMenu,
  UserSection,
  TokenBalance,
  CartButton,
  CartBadge,
  ThemeToggle,
} from "./Header.styles";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { isConnected } = useWeb3();
  const {
    userTokenBalance,
    nftCount,
    cart,
    balanceLoading,
    refreshTokenBalance,
  } = useMarketplace();
  const { isDark, toggleTheme } = useTheme();

  const navigationItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/energy-generated", label: "Generated", icon: <FaSolarPanel /> },
    { path: "/energy-usage", label: "Usage", icon: <FaBolt /> },
    { path: "/leaderboard", label: "Leaderboard", icon: <FaTrophy /> },
    { path: "/marketplace", label: "Marketplace", icon: <FaShoppingCart /> },
  ];

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <Link to="/">☀️ GreenSol</Link>
        </Logo>

        <Navigation>
          {navigationItems.map((item) => (
            <NavItem key={item.path}>
              <NavLink
                as={Link}
                to={item.path}
                $isActive={location.pathname === item.path}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </NavItem>
          ))}
        </Navigation>

        <UserSection>
          {isConnected && (
            <>
              <TokenBalance
                onClick={refreshTokenBalance}
                style={{ cursor: "pointer" }}
                title="Click to refresh balance"
              >
                {balanceLoading ? (
                  <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
                ) : (
                  <FaCoins />
                )}
                {balanceLoading
                  ? "Loading..."
                  : `${userTokenBalance.toLocaleString()} tokens`}
              </TokenBalance>

              {nftCount > 0 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    background: "linear-gradient(135deg, #ff6b6b, #feca57)",
                    color: "white",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "15px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                  }}
                >
                  <FaGem />
                  {nftCount} NFT{nftCount !== 1 ? "s" : ""}
                </div>
              )}

              <CartButton onClick={() => setIsCartOpen(true)}>
                <FaShoppingCart />
                {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
              </CartButton>
            </>
          )}

          <ThemeToggle onClick={toggleTheme}>
            {isDark ? <FaSun /> : <FaMoon />}
          </ThemeToggle>

          {isConnected ? <UserDropdown /> : <WalletConnection />}
        </UserSection>

        <MobileMenuButton
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>

        <MobileMenu $isOpen={isMobileMenuOpen}>
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              as={Link}
              to={item.path}
              $isActive={location.pathname === item.path}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}

          {isConnected && (
            <>
              <TokenBalance
                style={{ margin: "1rem 0" }}
                onClick={refreshTokenBalance}
              >
                {balanceLoading ? <FaSpinner /> : <FaCoins />}
                {balanceLoading
                  ? "Loading..."
                  : `${userTokenBalance.toLocaleString()} tokens`}
              </TokenBalance>

              {nftCount > 0 && (
                <div
                  style={{
                    margin: "0.5rem 0",
                    padding: "0.5rem",
                    background: "linear-gradient(135deg, #ff6b6b, #feca57)",
                    color: "white",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <FaGem /> {nftCount} NFT{nftCount !== 1 ? "s" : ""}
                </div>
              )}
            </>
          )}
        </MobileMenu>
      </HeaderContent>

      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          right: "10px",
          fontSize: "0.6rem",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      >
        2025-08-30 12:31:32 | imangi-iit
      </div>
    </HeaderContainer>
  );
};
