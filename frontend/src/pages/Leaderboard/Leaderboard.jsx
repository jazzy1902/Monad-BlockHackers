import React, { useState, useEffect } from "react";
import {
  FaTrophy,
  FaUsers,
  FaBolt,
  FaSolarPanel,
  FaSpinner,
  FaExclamationTriangle,
  FaRedo,
} from "react-icons/fa";
import { useWeb3 } from "../../context/Web3Context";
import { apiService } from "../../utils/api";
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
  LoadingContainer,
  ErrorContainer,
  ErrorMessage,
  RetryButton,
  CurrentUserHighlight,
  LastUpdated,
} from "./Leaderboard.styles";

export const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const { account, formatAddress } = useWeb3();

  // Format wallet address to display name - PRESERVE ORIGINAL CASE
  const formatWalletToUsername = (wallet) => {
    if (!wallet) return "Unknown User";

    // Case-insensitive comparison but preserve display
    if (account && wallet === account) {
      return "imangi-iit (You)";
    }

    // For other users, create a readable name from wallet
    const shortWallet = wallet.slice(2, 8); // Remove 0x and take 6 chars
    return `solar_${shortWallet}`;
  };

  // Calculate simple stats from real data
  const calculateStatsFromData = (data) => {
    if (!data || data.length === 0) {
      return {
        totalUsers: 0,
        totalGenerated: "0",
        averageGeneration: "0",
        topGeneration: "0",
      };
    }

    const totalUsers = data.length;
    const totalGenerated = data.reduce(
      (sum, user) => sum + parseFloat(user.total_units || 0),
      0
    );
    const averageGeneration = totalUsers > 0 ? totalGenerated / totalUsers : 0;
    const topGeneration =
      data.length > 0 ? parseFloat(data[0].total_units || 0) : 0;

    return {
      totalUsers,
      totalGenerated: totalGenerated.toFixed(1),
      averageGeneration: averageGeneration.toFixed(1),
      topGeneration: topGeneration.toFixed(1),
    };
  };

  // Fetch leaderboard data
  const fetchLeaderboard = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);

      console.log("Fetching leaderboard data...");
      const response = await apiService.getLeaderboard(10);

      console.log("Received leaderboard response:", response);

      if (
        response &&
        response.leaderboard &&
        Array.isArray(response.leaderboard)
      ) {
        // Process the data and add ranks (since data comes in decreasing order)
        // PRESERVE ORIGINAL WALLET CASE
        const processedData = response.leaderboard.map((user, index) => ({
          wallet: user.wallet, // Keep original case from API
          total_units: parseFloat(user.total_units || 0),
          rank: index + 1,
          points: Math.floor(parseFloat(user.total_units || 0) * 10),
        }));

        setLeaderboardData(processedData);
        setLastUpdated(new Date());

        console.log("Processed leaderboard data:", processedData);
      } else {
        console.error("Invalid response format:", response);
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError(err.message || "Failed to load leaderboard data");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLeaderboard(false);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Find current user's rank - CASE INSENSITIVE COMPARISON
  const currentUserRank =
    leaderboardData.findIndex((user) => account && user.wallet === account) + 1;

  // Calculate stats from real data
  const stats = calculateStatsFromData(leaderboardData);

  if (loading && leaderboardData.length === 0) {
    return (
      <LeaderboardContainer>
        <LoadingContainer>
          <FaSpinner />
          <p>Loading leaderboard from server...</p>
          <small>
            Fetching from: http://10.14.195.232:8000/api/leaderboard
          </small>
        </LoadingContainer>
      </LeaderboardContainer>
    );
  }

  if (error && leaderboardData.length === 0) {
    return (
      <LeaderboardContainer>
        <ErrorContainer>
          <FaExclamationTriangle />
          <ErrorMessage>{error}</ErrorMessage>
          <p>API Endpoint: http://10.14.195.232:8000/api/leaderboard</p>
          <RetryButton onClick={() => fetchLeaderboard()}>
            <FaRedo />
            Try Again
          </RetryButton>
        </ErrorContainer>
      </LeaderboardContainer>
    );
  }

  const statsData = [
    { icon: <FaUsers />, value: stats.totalUsers, label: "Total Users" },
    {
      icon: <FaSolarPanel />,
      value: `${stats.totalGenerated} kWh`,
      label: "Total Generated",
    },
    {
      icon: <FaBolt />,
      value: `${stats.averageGeneration} kWh`,
      label: "Average per User",
    },
    {
      icon: <FaTrophy />,
      value: `${stats.topGeneration} kWh`,
      label: "Top Generation",
    },
  ];

  return (
    <LeaderboardContainer>
      <PageHeader>
        <PageTitle>🏆 Energy Leaderboard</PageTitle>
        <PageSubtitle>
          Live solar energy generation rankings from blockchain data
        </PageSubtitle>
        {currentUserRank > 0 && (
          <CurrentUserHighlight>
            Your current rank: #{currentUserRank}
          </CurrentUserHighlight>
        )}
        {!account && (
          <div
            style={{ color: "#666", fontSize: "0.9rem", marginTop: "0.5rem" }}
          >
            Connect your wallet to see your rank
          </div>
        )}
      </PageHeader>

      <StatsGrid>
        {statsData.map((stat, index) => (
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
          <div>Energy Generated</div>
          <div>Points</div>
          <div>Wallet</div>
        </TableHeader>

        {leaderboardData.map((user) => (
          <TableRow
            key={user.wallet}
            $isCurrentUser={account && user.wallet === account}
          >
            <RankBadge $rank={user.rank}>
              {user.rank <= 3
                ? user.rank === 1
                  ? "🥇"
                  : user.rank === 2
                  ? "🥈"
                  : "🥉"
                : user.rank}
            </RankBadge>
            <UserInfo>
              <UserAvatar>
                {formatWalletToUsername(user.wallet).charAt(0).toUpperCase()}
              </UserAvatar>
              <div>
                <UserName>{formatWalletToUsername(user.wallet)}</UserName>
              </div>
            </UserInfo>
            <ValueCell>{user.total_units.toFixed(2)} kWh</ValueCell>
            <ValueCell>{user.points.toLocaleString()}</ValueCell>
            <ValueCell style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>
              {/* DISPLAY ORIGINAL WALLET CASE */}
              {user.wallet}
            </ValueCell>
          </TableRow>
        ))}

        {leaderboardData.length === 0 && !loading && (
          <TableRow>
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "2rem",
                color: "#666",
              }}
            >
              No leaderboard data available from server
            </div>
          </TableRow>
        )}
      </LeaderboardTable>

      {lastUpdated && (
        <LastUpdated>
          Last updated: {lastUpdated.toLocaleTimeString()}(
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
          <strong>Debug Info:</strong>
          <br />
          API Endpoint: http://10.14.195.232:8000/api/leaderboard
          <br />
          Current Time (UTC): 2025-08-30 11:29:28
          <br />
          Data Count: {leaderboardData.length} users
          <br />
          Connected Wallet: {account || "Not connected"}
          <br />
          Your Username: imangi-iit
        </div>
      )}
    </LeaderboardContainer>
  );
};
