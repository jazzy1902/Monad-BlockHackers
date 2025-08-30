import React, { useState, useEffect } from "react";
import {
  FaSolarPanel,
  FaArrowUp,
  FaArrowDown,
  FaLeaf,
  FaBolt,
  FaSun,
  FaSpinner,
  FaExclamationTriangle,
  FaRedo,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useWeb3 } from "../../context/Web3Context";
import { useStreak } from "../../context/StreakContext";
import { apiService } from "../../utils/api";
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
  LogDevice,
  LogGeneration,
  LogEfficiency,
  LogCondition,
  LoadingContainer,
  ErrorContainer,
  ErrorMessage,
  RetryButton,
  LastUpdated,
  ConnectWalletPrompt,
  TxHashLink,
  LogMeta,
  MockChart,
} from "./EnergyGenerated.styles";

export const EnergyGenerated = () => {
  const [energyLogs, setEnergyLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const { account, isConnected } = useWeb3();
  const { updateStreak, markAppOpened } = useStreak();

  // Calculate metrics from real data
  const calculateMetrics = (logs) => {
    if (!logs || logs.length === 0) {
      return {
        totalGenerated: 0,
        todayGenerated: 0,
        avgUnitsPerLog: 0,
        totalDevices: 0,
        peakGeneration: 0,
        co2Saved: 0,
      };
    }

    const totalGenerated = logs.reduce(
      (sum, log) => sum + parseFloat(log.units || 0),
      0
    );

    // Calculate today's generation (filter by device_timestamp)
    const today = "2025-08-30"; // Current date
    const todayLogs = logs.filter((log) => {
      if (!log.device_timestamp) return false;
      const logDate = new Date(log.device_timestamp)
        .toISOString()
        .split("T")[0];
      return logDate === today;
    });
    const todayGenerated = todayLogs.reduce(
      (sum, log) => sum + parseFloat(log.units || 0),
      0
    );

    // Other calculations
    const avgUnitsPerLog = logs.length > 0 ? totalGenerated / logs.length : 0;
    const uniqueDevices = new Set(logs.map((log) => log.device_id)).size;
    const peakGeneration = Math.max(
      ...logs.map((log) => parseFloat(log.units || 0))
    );
    const co2Saved = totalGenerated * 0.6; // Assuming 0.6 kg CO2 saved per kWh

    return {
      totalGenerated: totalGenerated.toFixed(2),
      todayGenerated: todayGenerated.toFixed(2),
      avgUnitsPerLog: avgUnitsPerLog.toFixed(2),
      totalDevices: uniqueDevices,
      peakGeneration: peakGeneration.toFixed(2),
      co2Saved: co2Saved.toFixed(2),
    };
  };

  // Format device ID for display
  const formatDeviceId = (deviceId) => {
    if (!deviceId) return "Unknown Device";
    return `Solar Panel ${deviceId.slice(-4)}`;
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Unknown Time";
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch (error) {
      return "Invalid Time";
    }
  };

  // Get efficiency status based on units
  const getEfficiencyStatus = (units) => {
    const unitsFloat = parseFloat(units || 0);
    if (unitsFloat >= 5) return "excellent";
    if (unitsFloat >= 3) return "good";
    if (unitsFloat >= 1) return "fair";
    return "poor";
  };

  // Fetch energy logs - SEND WALLET WITH ORIGINAL CASE (NO toLowerCase)
  const fetchEnergyLogs = async (skipCount = 0, isLoadMore = false) => {
    if (!account) {
      setError("Please connect your wallet to view energy logs");
      return;
    }

    try {
      if (!isLoadMore) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      // SEND ORIGINAL CASE TO API - NO toLowerCase()
      console.log(
        `[2025-08-30 12:19:49] Frontend: Fetching energy logs for wallet: ${account} (case preserved)`
      );
      const response = await apiService.getEnergyLogs(account, skipCount, 50);

      console.log("Received energy logs response:", response);

      if (response && response.logs && Array.isArray(response.logs)) {
        const newLogs = response.logs;

        if (isLoadMore) {
          setEnergyLogs((prev) => [...prev, ...newLogs]);
          updateStreak([...energyLogs, ...newLogs]); // Update streak with all logs
        } else {
          setEnergyLogs(newLogs);
          updateStreak(newLogs); // Update streak with new logs
        }

        setTotalCount(response.count || 0);
        setLastUpdated(new Date());
        setSkip(skipCount + newLogs.length);

        console.log("Processed energy logs:", newLogs);
      } else {
        console.error("Invalid response format:", response);
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      console.error("Error fetching energy logs:", err);
      setError(err.message || "Failed to load energy logs");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Load more logs
  const loadMoreLogs = () => {
    if (!loadingMore && energyLogs.length < totalCount) {
      fetchEnergyLogs(skip, true);
    }
  };

  // Initial load when wallet connects
  useEffect(() => {
    if (isConnected && account) {
      markAppOpened(); // Mark app as opened for streak tracking
      setSkip(0);
      fetchEnergyLogs(0, false);
    } else {
      setEnergyLogs([]);
      setError(null);
      setTotalCount(0);
    }
  }, [account, isConnected]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    if (!isConnected || !account) return;

    const interval = setInterval(() => {
      fetchEnergyLogs(0, false); // Refresh from beginning
    }, 60000);

    return () => clearInterval(interval);
  }, [account, isConnected]);

  // Calculate current metrics
  const metrics = calculateMetrics(energyLogs);

  // If wallet not connected
  if (!isConnected) {
    return (
      <EnergyGeneratedContainer>
        <ConnectWalletPrompt>
          <FaSolarPanel style={{ fontSize: "4rem", marginBottom: "1rem" }} />
          <h2>Connect Your Wallet</h2>
          <p>
            Please connect your MetaMask wallet to view your solar energy
            generation data
          </p>
        </ConnectWalletPrompt>
      </EnergyGeneratedContainer>
    );
  }

  // Loading state
  if (loading && energyLogs.length === 0) {
    return (
      <EnergyGeneratedContainer>
        <LoadingContainer>
          <FaSpinner />
          <p>Loading your energy generation data...</p>
          <small>Wallet: {account}</small>
        </LoadingContainer>
      </EnergyGeneratedContainer>
    );
  }

  // Error state with no data
  if (error && energyLogs.length === 0) {
    return (
      <EnergyGeneratedContainer>
        <ErrorContainer>
          <FaExclamationTriangle />
          <ErrorMessage>{error}</ErrorMessage>
          <p>Wallet: {account}</p>
          <RetryButton onClick={() => fetchEnergyLogs(0, false)}>
            <FaRedo />
            Try Again
          </RetryButton>
        </ErrorContainer>
      </EnergyGeneratedContainer>
    );
  }

  const metricsData = [
    {
      title: "Total Generated",
      value: `${metrics.totalGenerated} kWh`,
      change: `From ${totalCount} logs`,
      positive: null,
      icon: <FaSolarPanel />,
    },
    {
      title: "Generated Today",
      value: `${metrics.todayGenerated} kWh`,
      change: "2025-08-30",
      positive: null,
      icon: <FaSun />,
    },
    {
      title: "Active Devices",
      value: metrics.totalDevices,
      change: `Avg: ${metrics.avgUnitsPerLog} kWh/log`,
      positive: null,
      icon: <FaBolt />,
    },
    {
      title: "CO₂ Saved",
      value: `${metrics.co2Saved} kg`,
      change: `Peak: ${metrics.peakGeneration} kWh`,
      positive: true,
      icon: <FaLeaf />,
    },
  ];

  return (
    <EnergyGeneratedContainer>
      <PageHeader>
        <PageTitle>🌞 Solar Energy Generation</PageTitle>
        <PageSubtitle>
          Your personalized solar energy generation logs and analytics
        </PageSubtitle>
        <div style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem" }}>
          Wallet: {account} | User: imangi-iit
        </div>
      </PageHeader>

      <MetricsGrid>
        {metricsData.map((metric, index) => (
          <MetricCard key={index}>
            <MetricHeader>
              <MetricTitle>{metric.title}</MetricTitle>
              <MetricIcon>{metric.icon}</MetricIcon>
            </MetricHeader>
            <MetricValue>{metric.value}</MetricValue>
            <div
              style={{
                fontSize: "0.9rem",
                color: "inherit",
                marginTop: "0.5rem",
              }}
            >
              {metric.change}
            </div>
          </MetricCard>
        ))}
      </MetricsGrid>

      <ChartsSection>
        <ChartCard>
          <ChartTitle>Generation Timeline</ChartTitle>
          <MockChart>
            📊 Real-time generation chart based on your {energyLogs.length} logs
          </MockChart>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Device Performance</ChartTitle>
          <MockChart>
            📈 {metrics.totalDevices} device(s) performance analysis
          </MockChart>
        </ChartCard>
      </ChartsSection>

      <GenerationLogSection>
        <LogHeader>
          ⚡ Your Energy Generation Logs ({totalCount} total)
        </LogHeader>

        {energyLogs.length === 0 && !loading ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
            No energy generation logs found for your wallet
          </div>
        ) : (
          energyLogs.map((log) => (
            <LogEntry key={log.id}>
              <LogTime>
                <div>{formatTimestamp(log.device_timestamp)}</div>
                <LogMeta>ID: {log.id}</LogMeta>
              </LogTime>
              <LogDevice>
                <div>{formatDeviceId(log.device_id)}</div>
                <LogMeta>Device: {log.device_id}</LogMeta>
              </LogDevice>
              <LogGeneration>
                {parseFloat(log.units || 0).toFixed(2)} kWh
              </LogGeneration>
              <LogEfficiency>
                {log.token_id ? `Token #${log.token_id}` : "No Token"}
              </LogEfficiency>
              <LogCondition $condition={getEfficiencyStatus(log.units)}>
                {log.tx_hash ? (
                  <TxHashLink
                    href={`https://testnet.monadexplorer.com/tx/${log.tx_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View transaction on Monad Explorer"
                  >
                    <FaExternalLinkAlt />
                    TX
                  </TxHashLink>
                ) : (
                  "Pending"
                )}
              </LogCondition>
            </LogEntry>
          ))
        )}

        {energyLogs.length < totalCount && (
          <div style={{ padding: "1rem", textAlign: "center" }}>
            <RetryButton onClick={loadMoreLogs} disabled={loadingMore}>
              {loadingMore ? (
                <>
                  <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
                  Loading more...
                </>
              ) : (
                <>Load More ({totalCount - energyLogs.length} remaining)</>
              )}
            </RetryButton>
          </div>
        )}
      </GenerationLogSection>

      {lastUpdated && (
        <LastUpdated>
          Last updated: {lastUpdated.toLocaleTimeString()} (
          {lastUpdated.toLocaleDateString()})
          {loading && <FaSpinner style={{ marginLeft: "0.5rem" }} />}
        </LastUpdated>
      )}

      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "#f5f5f5",
            borderRadius: "8px",
            fontSize: "0.8rem",
            color: "#666",
          }}
        >
          <strong>Debug Info (2025-08-30 12:19:49):</strong>
          <br />
          API Endpoint: http://10.14.195.232:8000/api/getEnergyLogs
          <br />
          Current Time (UTC): 2025-08-30 12:19:49
          <br />
          Wallet (Original Case): {account}
          <br />
          User: imangi-iit
          <br />
          Logs Loaded: {energyLogs.length} / {totalCount}
          <br />
          Total Energy: {metrics.totalGenerated} kWh
          <br />
          Active Devices: {metrics.totalDevices}
          <br />
          Today's Generation: {metrics.todayGenerated} kWh
          <br />
          CO₂ Saved: {metrics.co2Saved} kg
        </div>
      )}
    </EnergyGeneratedContainer>
  );
};
