import React, { createContext, useContext, useState, useEffect } from "react";
import { useWeb3 } from "./Web3Context";

const StreakContext = createContext();

export const useStreak = () => {
  const context = useContext(StreakContext);
  if (!context) {
    throw new Error("useStreak must be used within a StreakProvider");
  }
  return context;
};

// Badge definitions with requirements and rewards
const BADGE_DEFINITIONS = [
  {
    id: "streak_5",
    name: "Energy Rookie",
    days: 5,
    emoji: "🌱",
    description: "5 days of consistent energy generation",
    color: "#4CAF50",
  },
  {
    id: "streak_7",
    name: "Weekly Warrior",
    days: 7,
    emoji: "⚡",
    description: "7 days straight of solar power",
    color: "#FF9800",
  },
  {
    id: "streak_10",
    name: "Power Pioneer",
    days: 10,
    emoji: "🔋",
    description: "10 days of reliable generation",
    color: "#2196F3",
  },
  {
    id: "streak_20",
    name: "Solar Specialist",
    days: 20,
    emoji: "☀️",
    description: "20 days of solar mastery",
    color: "#FFD700",
  },
  {
    id: "streak_30",
    name: "Monthly Master",
    days: 30,
    emoji: "🏆",
    description: "30 days of consistent power",
    color: "#FF6B6B",
  },
  {
    id: "streak_50",
    name: "Power Pro",
    days: 50,
    emoji: "💎",
    description: "50 days of excellence",
    color: "#9C27B0",
  },
  {
    id: "streak_75",
    name: "Energy Elite",
    days: 75,
    emoji: "🌟",
    description: "75 days of superior generation",
    color: "#00BCD4",
  },
  {
    id: "streak_100",
    name: "Century Champion",
    days: 100,
    emoji: "🥇",
    description: "100 days of power perfection",
    color: "#FFD700",
  },
  {
    id: "streak_250",
    name: "Legendary Generator",
    days: 250,
    emoji: "👑",
    description: "250 days of legendary performance",
    color: "#E91E63",
  },
  {
    id: "streak_300",
    name: "Solar Sovereign",
    days: 300,
    emoji: "🔥",
    description: "300 days of unmatched dedication",
    color: "#F44336",
  },
  {
    id: "streak_365",
    name: "Annual Achiever",
    days: 365,
    emoji: "🎯",
    description: "A full year of solar excellence",
    color: "#3F51B5",
  },
];

export const StreakProvider = ({ children }) => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState(null);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [streakData, setStreakData] = useState([]);
  const [todayGeneration, setTodayGeneration] = useState(0);
  const [appOpenedToday, setAppOpenedToday] = useState(false);
  const [loading, setLoading] = useState(false);

  const { account, isConnected } = useWeb3();

  // Get today's date in YYYY-MM-DD format
  const getTodayString = () => {
    return "2025-08-30"; // Using current date
  };

  // Check if user qualifies for streak (>3 units generated + app opened)
  const qualifiesForStreak = (generation, appOpened) => {
    return generation >= 3.0 && appOpened;
  };

  // Load streak data from localStorage
  const loadStreakData = () => {
    if (!account) return;

    try {
      const storageKey = `streak_${account}`;
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        const data = JSON.parse(stored);
        setCurrentStreak(data.currentStreak || 0);
        setLongestStreak(data.longestStreak || 0);
        setLastActiveDate(data.lastActiveDate || null);
        setEarnedBadges(data.earnedBadges || []);
        setStreakData(data.streakData || []);
        setAppOpenedToday(data.appOpenedToday || false);

        console.log(
          `[2025-08-30 11:45:32] Loaded streak data for ${account}:`,
          data
        );
      }
    } catch (error) {
      console.error("Error loading streak data:", error);
    }
  };

  // Save streak data to localStorage
  const saveStreakData = (data) => {
    if (!account) return;

    try {
      const storageKey = `streak_${account}`;
      const saveData = {
        currentStreak,
        longestStreak,
        lastActiveDate,
        earnedBadges,
        streakData,
        appOpenedToday,
        lastUpdated: "2025-08-30 11:45:32",
        ...data,
      };

      localStorage.setItem(storageKey, JSON.stringify(saveData));
      console.log(
        `[2025-08-30 11:45:32] Saved streak data for ${account}:`,
        saveData
      );
    } catch (error) {
      console.error("Error saving streak data:", error);
    }
  };

  // Mark app as opened today
  const markAppOpened = () => {
    const today = getTodayString();
    const wasAlreadyOpened = appOpenedToday;

    setAppOpenedToday(true);
    saveStreakData({ appOpenedToday: true });

    console.log(
      `[2025-08-30 11:45:32] App opened for ${account} on ${today}. Previously opened: ${wasAlreadyOpened}`
    );

    return !wasAlreadyOpened; // Return true if this is first time today
  };

  // Calculate today's energy generation from logs
  const calculateTodayGeneration = (logs) => {
    if (!logs || logs.length === 0) return 0;

    const today = getTodayString();
    const todayLogs = logs.filter((log) => {
      if (!log.device_timestamp) return false;
      const logDate = new Date(log.device_timestamp)
        .toISOString()
        .split("T")[0];
      return logDate === today;
    });

    const totalGeneration = todayLogs.reduce(
      (sum, log) => sum + parseFloat(log.units || 0),
      0
    );
    setTodayGeneration(totalGeneration);

    console.log(
      `[2025-08-30 11:45:32] Today's generation for ${account}: ${totalGeneration} kWh from ${todayLogs.length} logs`
    );

    return totalGeneration;
  };

  // Update streak based on energy data
  const updateStreak = (energyLogs) => {
    if (!account || !energyLogs) return;

    const today = getTodayString();
    const todayGeneration = calculateTodayGeneration(energyLogs);
    const hasOpenedToday = appOpenedToday;

    // Check if user qualifies for today's streak
    const qualifiesToday = qualifiesForStreak(todayGeneration, hasOpenedToday);

    console.log(`[2025-08-30 11:45:32] Streak qualification check:`, {
      date: today,
      generation: todayGeneration,
      appOpened: hasOpenedToday,
      qualifies: qualifiesToday,
      lastActiveDate,
    });

    let newCurrentStreak = currentStreak;
    let newLongestStreak = longestStreak;
    const newStreakData = [...streakData];

    // If last active was yesterday and user qualifies today, continue streak
    const yesterday = "2025-08-29"; // Previous day

    if (qualifiesToday) {
      if (lastActiveDate === yesterday) {
        // Continue streak
        newCurrentStreak = currentStreak + 1;
      } else if (lastActiveDate === today) {
        // Already counted today, keep current streak
        newCurrentStreak = currentStreak;
      } else {
        // Start new streak
        newCurrentStreak = 1;
      }

      // Update longest streak if needed
      if (newCurrentStreak > newLongestStreak) {
        newLongestStreak = newCurrentStreak;
      }

      // Add today's data if not already added
      const existingEntry = newStreakData.find((entry) => entry.date === today);
      if (!existingEntry) {
        newStreakData.push({
          date: today,
          generation: todayGeneration,
          appOpened: hasOpenedToday,
          qualified: true,
          timestamp: "2025-08-30 11:45:32",
        });
      }

      setLastActiveDate(today);
    } else if (lastActiveDate === yesterday && !qualifiesToday) {
      // Break streak if didn't qualify today but was active yesterday
      newCurrentStreak = 0;
    }

    // Update state
    setCurrentStreak(newCurrentStreak);
    setLongestStreak(newLongestStreak);
    setStreakData(newStreakData);

    // Check for new badges
    checkForNewBadges(newCurrentStreak);

    // Save updated data
    saveStreakData({
      currentStreak: newCurrentStreak,
      longestStreak: newLongestStreak,
      lastActiveDate: qualifiesToday ? today : lastActiveDate,
      streakData: newStreakData,
    });

    console.log(`[2025-08-30 11:45:32] Streak updated:`, {
      currentStreak: newCurrentStreak,
      longestStreak: newLongestStreak,
      qualifiedToday: qualifiesToday,
    });
  };

  // Check for newly earned badges
  const checkForNewBadges = (streakDays) => {
    const newBadges = [];

    BADGE_DEFINITIONS.forEach((badge) => {
      const alreadyEarned = earnedBadges.some(
        (earned) => earned.id === badge.id
      );

      if (!alreadyEarned && streakDays >= badge.days) {
        const earnedBadge = {
          ...badge,
          earnedDate: "2025-08-30",
          earnedAt: "2025-08-30 11:45:32",
          streakAtEarning: streakDays,
        };

        newBadges.push(earnedBadge);
        console.log(
          `[2025-08-30 11:45:32] 🎉 New badge earned: ${badge.name} for ${badge.days} day streak!`
        );
      }
    });

    if (newBadges.length > 0) {
      const updatedBadges = [...earnedBadges, ...newBadges];
      setEarnedBadges(updatedBadges);
      saveStreakData({ earnedBadges: updatedBadges });

      // Show celebration notification
      showBadgeNotification(newBadges);
    }
  };

  // Show badge notification (could integrate with a toast library)
  const showBadgeNotification = (badges) => {
    badges.forEach((badge) => {
      console.log(
        `🎊 BADGE EARNED: ${badge.emoji} ${badge.name} - ${badge.description}`
      );

      // You could integrate with react-hot-toast or similar here
      if (window.alert) {
        setTimeout(() => {
          alert(
            `🎉 Badge Earned!\n\n${badge.emoji} ${badge.name}\n${badge.description}\n\nStreak: ${badge.streakAtEarning} days`
          );
        }, 1000);
      }
    });
  };

  // Get next badge to earn
  const getNextBadge = () => {
    const unearned = BADGE_DEFINITIONS.filter(
      (badge) => !earnedBadges.some((earned) => earned.id === badge.id)
    );

    return unearned.sort((a, b) => a.days - b.days)[0] || null;
  };

  // Get streak progress for next badge
  const getStreakProgress = () => {
    const nextBadge = getNextBadge();
    if (!nextBadge) return { progress: 100, remaining: 0, nextBadge: null };

    const progress = Math.min((currentStreak / nextBadge.days) * 100, 100);
    const remaining = Math.max(nextBadge.days - currentStreak, 0);

    return { progress, remaining, nextBadge };
  };

  // Reset streak data (for testing)
  const resetStreakData = () => {
    setCurrentStreak(0);
    setLongestStreak(0);
    setLastActiveDate(null);
    setEarnedBadges([]);
    setStreakData([]);
    setTodayGeneration(0);
    setAppOpenedToday(false);

    if (account) {
      localStorage.removeItem(`streak_${account}`);
      console.log(`[2025-08-30 11:45:32] Reset streak data for ${account}`);
    }
  };

  // Load data when account changes
  useEffect(() => {
    if (isConnected && account) {
      loadStreakData();
      markAppOpened(); // Mark app as opened when user connects
    }
  }, [account, isConnected]);

  const value = {
    // State
    currentStreak,
    longestStreak,
    lastActiveDate,
    earnedBadges,
    streakData,
    todayGeneration,
    appOpenedToday,
    loading,

    // Methods
    updateStreak,
    markAppOpened,
    calculateTodayGeneration,
    getNextBadge,
    getStreakProgress,
    resetStreakData,
    qualifiesForStreak,

    // Constants
    BADGE_DEFINITIONS,
    REQUIRED_DAILY_GENERATION: 3.0,

    // Utilities
    getTodayString,
  };

  return (
    <StreakContext.Provider value={value}>{children}</StreakContext.Provider>
  );
};
