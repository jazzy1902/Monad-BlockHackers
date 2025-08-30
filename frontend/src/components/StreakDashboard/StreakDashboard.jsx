import React from "react";
import {
  FaFire,
  FaTrophy,
  FaCalendarAlt,
  FaLightbulb,
  FaMobile,
} from "react-icons/fa";
import { useStreak } from "../../context/StreakContext";
import {
  StreakContainer,
  StreakHeader,
  StreakTitle,
  StreakGrid,
  StreakCard,
  StreakNumber,
  StreakLabel,
  StreakIcon,
  ProgressSection,
  ProgressBar,
  ProgressFill,
  ProgressText,
  BadgeSection,
  BadgeGrid,
  Badge,
  BadgeEmoji,
  BadgeName,
  BadgeDescription,
  RequirementsCard,
  RequirementItem,
  RequirementIcon,
  RequirementText,
  TodayStatus,
  StatusIndicator,
} from "./StreakDashboard.styles";

export const StreakDashboard = () => {
  const {
    currentStreak,
    longestStreak,
    earnedBadges,
    todayGeneration,
    appOpenedToday,
    getNextBadge,
    getStreakProgress,
    qualifiesForStreak,
    REQUIRED_DAILY_GENERATION,
  } = useStreak();

  const nextBadge = getNextBadge();
  const { progress, remaining } = getStreakProgress();
  const qualifiesToday = qualifiesForStreak(todayGeneration, appOpenedToday);

  // Sort badges by days required
  const sortedEarnedBadges = earnedBadges.sort((a, b) => b.days - a.days);

  return (
    <StreakContainer>
      <StreakHeader>
        <StreakTitle>🔥 Your Energy Streak</StreakTitle>
        <p>
          Maintain your solar energy generation streak and earn exclusive
          badges!
        </p>
      </StreakHeader>

      <StreakGrid>
        <StreakCard>
          <StreakIcon>
            <FaFire />
          </StreakIcon>
          <StreakNumber>{currentStreak}</StreakNumber>
          <StreakLabel>Current Streak</StreakLabel>
        </StreakCard>

        <StreakCard>
          <StreakIcon>
            <FaTrophy />
          </StreakIcon>
          <StreakNumber>{longestStreak}</StreakNumber>
          <StreakLabel>Longest Streak</StreakLabel>
        </StreakCard>

        <StreakCard>
          <StreakIcon>
            <FaCalendarAlt />
          </StreakIcon>
          <StreakNumber>{earnedBadges.length}</StreakNumber>
          <StreakLabel>Badges Earned</StreakLabel>
        </StreakCard>
      </StreakGrid>

      <TodayStatus>
        <h3>Today's Progress (2025-08-30)</h3>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <StatusIndicator $met={todayGeneration >= REQUIRED_DAILY_GENERATION}>
            <FaLightbulb />
            Energy: {todayGeneration.toFixed(2)} kWh
            {todayGeneration >= REQUIRED_DAILY_GENERATION
              ? " ✅"
              : ` (need ${REQUIRED_DAILY_GENERATION}+ kWh)`}
          </StatusIndicator>
          <StatusIndicator $met={appOpenedToday}>
            <FaMobile />
            App Opened: {appOpenedToday ? "Yes ✅" : "No ❌"}
          </StatusIndicator>
          <StatusIndicator $met={qualifiesToday}>
            <FaFire />
            Qualified: {qualifiesToday ? "Yes 🎉" : "Not Yet"}
          </StatusIndicator>
        </div>
      </TodayStatus>

      {nextBadge && (
        <ProgressSection>
          <h3>
            Next Badge: {nextBadge.emoji} {nextBadge.name}
          </h3>
          <ProgressBar>
            <ProgressFill style={{ width: `${progress}%` }} />
          </ProgressBar>
          <ProgressText>
            {remaining} more days to earn "{nextBadge.name}" badge
          </ProgressText>
        </ProgressSection>
      )}

      <RequirementsCard>
        <h3>Daily Requirements</h3>
        <RequirementItem>
          <RequirementIcon>
            <FaLightbulb />
          </RequirementIcon>
          <RequirementText>
            Generate at least {REQUIRED_DAILY_GENERATION} kWh of solar energy
          </RequirementText>
        </RequirementItem>
        <RequirementItem>
          <RequirementIcon>
            <FaMobile />
          </RequirementIcon>
          <RequirementText>Open the app at least once per day</RequirementText>
        </RequirementItem>
      </RequirementsCard>

      {earnedBadges.length > 0 && (
        <BadgeSection>
          <h3>🏆 Your Badges ({earnedBadges.length})</h3>
          <BadgeGrid>
            {sortedEarnedBadges.map((badge) => (
              <Badge key={badge.id} $color={badge.color}>
                <BadgeEmoji>{badge.emoji}</BadgeEmoji>
                <BadgeName>{badge.name}</BadgeName>
                <BadgeDescription>{badge.description}</BadgeDescription>
                <div
                  style={{
                    fontSize: "0.8rem",
                    opacity: 0.8,
                    marginTop: "0.5rem",
                  }}
                >
                  Earned: {badge.earnedDate}
                </div>
              </Badge>
            ))}
          </BadgeGrid>
        </BadgeSection>
      )}

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
        <strong>Streak Debug Info (2025-08-30 11:45:32):</strong>
        <br />
        Current Date: 2025-08-30
        <br />
        Today's Generation: {todayGeneration.toFixed(2)} kWh
        <br />
        App Opened Today: {appOpenedToday ? "Yes" : "No"}
        <br />
        Qualifies Today: {qualifiesToday ? "Yes" : "No"}
        <br />
        Current Streak: {currentStreak} days
        <br />
        User: imangi-iit
      </div>
    </StreakContainer>
  );
};
