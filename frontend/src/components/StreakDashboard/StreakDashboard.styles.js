import styled from "styled-components";

export const StreakContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

export const StreakHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 0.5rem;
  }
`;

export const StreakTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`;

export const StreakGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StreakCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const StreakIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

export const StreakNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-bottom: 0.5rem;
`;

export const StreakLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

export const TodayStatus = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  background: ${({ theme, $met }) =>
    $met ? theme.colors.success + "20" : theme.colors.error + "20"};
  color: ${({ theme, $met }) =>
    $met ? theme.colors.success : theme.colors.error};
  border: 2px solid
    ${({ theme, $met }) => ($met ? theme.colors.success : theme.colors.error)};
`;

export const ProgressSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  border-radius: 6px;
  transition: width 0.3s ease;
`;

export const ProgressText = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

export const RequirementsCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const RequirementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const RequirementIcon = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
  width: 24px;
  text-align: center;
`;

export const RequirementText = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const BadgeSection = styled.div`
  h3 {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

export const Badge = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 3px solid ${({ $color }) => $color};
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const BadgeEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 0.5rem;
`;

export const BadgeName = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`;

export const BadgeDescription = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
