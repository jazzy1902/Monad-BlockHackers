import React, { useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { Web3Provider } from "./context/Web3Context";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { Leaderboard } from "./pages/Leaderboard/Leaderboard";
import { EnergyUsage } from "./pages/EnergyUsage/EnergyUsage";
import { EnergyGenerated } from "./pages/EnergyGenerated/EnergyGenerated";

const AppContent = () => {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigation} />;
      case "leaderboard":
        return <Leaderboard />;
      case "energyUsage":
        return <EnergyUsage />;
      case "energyGenerated":
        return <EnergyGenerated />;
      default:
        return <Home onNavigate={handleNavigation} />;
    }
  };

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout onNavigate={handleNavigation}>{renderCurrentPage()}</Layout>
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
