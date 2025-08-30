import React, { useState } from "react";
import { FaSolarPanel } from "react-icons/fa";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { WalletConnection } from "../WalletConnection/WalletConnection";
import { UserDropdown } from "../UserDropdown/UserDropdown";
import { ComingSoon } from "../ComingSoon/ComingSoon";
import { useWeb3 } from "../../context/Web3Context";
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  Nav,
  NavItem,
  RightSection,
} from "./Header.styles";

export const Header = ({ onNavigate }) => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { isConnected } = useWeb3();

  const handleNavigation = (page) => {
    if (["leaderboard", "energyUsage", "energyGenerated"].includes(page)) {
      onNavigate(page);
    } else {
      setShowComingSoon(true);
    }
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Logo
            onClick={() => onNavigate("home")}
            style={{ cursor: "pointer" }}
          >
            <FaSolarPanel />
            GreenSol
          </Logo>

          <Nav>
            <NavItem onClick={() => handleNavigation("leaderboard")}>
              Leaderboard
            </NavItem>
            <NavItem onClick={() => handleNavigation("energyUsage")}>
              Energy Usage
            </NavItem>
            <NavItem onClick={() => handleNavigation("energyGenerated")}>
              Energy Generated
            </NavItem>
          </Nav>

          <RightSection>
            {!isConnected ? <WalletConnection /> : <UserDropdown />}
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
