import React from "react";
import { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeContextProvider } from "./context/ThemeContext";
import { Web3Provider } from "./context/Web3Context";
import { StreakProvider } from "./context/StreakContext";
import { MarketplaceProvider } from "./context/MarketplaceContext";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { EnergyGenerated } from "./pages/EnergyGenerated/EnergyGenerated";
import { EnergyUsage } from "./pages/EnergyUsage/EnergyUsage";
import { Leaderboard } from "./pages/Leaderboard/Leaderboard";
import { Marketplace } from "./pages/Marketplace/Marketplace";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/themes";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { useTheme } from "./context/ThemeContext";

function AppContent() {
  const { isDark } = useTheme();

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Web3Provider>
        <StreakProvider>
          <MarketplaceProvider>
            <Router>
              <ScrollToTop />
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/energy-generated"
                    element={<EnergyGenerated />}
                  />
                  <Route path="/energy-usage" element={<EnergyUsage />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </Router>
          </MarketplaceProvider>
        </StreakProvider>
      </Web3Provider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  );
}

export default App;
