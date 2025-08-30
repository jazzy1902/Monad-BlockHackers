import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

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
  margin-bottom: 1rem;
`;

export const CurrentUserHighlight = styled.div`
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  display: inline-block;
  border: 2px solid ${({ theme }) => theme.colors.primary};
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
  grid-template-columns: 80px 1fr 150px 100px 120px;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 60px 1fr 120px 80px;
    padding: 1rem;
    font-size: 0.9rem;

    & > :nth-child(5) {
      display: none;
    }
  }
`;

export const TableRow = styled.div`
  padding: 1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  grid-template-columns: 80px 1fr 150px 100px 120px;
  gap: 1rem;
  align-items: center;
  transition: all 0.3s ease;
  background: ${({ theme, $isCurrentUser }) =>
    $isCurrentUser ? theme.colors.primary + "10" : "transparent"};
  border-left: ${({ theme, $isCurrentUser }) =>
    $isCurrentUser
      ? `4px solid ${theme.colors.primary}`
      : "4px solid transparent"};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 60px 1fr 120px 80px;
    padding: 1rem;

    & > :nth-child(5) {
      display: none;
    }
  }
`;

export const RankBadge = styled.div`
  background: ${({ theme, $rank }) => {
    if ($rank === 1) return "#FFD700";
    if ($rank === 2) return "#C0C0C0";
    if ($rank === 3) return "#CD7F32";
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

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: ${spin} 1s linear infinite;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  small {
    opacity: 0.7;
    font-family: monospace;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.error};

  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-family: monospace;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    opacity: 0.8;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const RetryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const LastUpdated = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    animation: ${spin} 1s linear infinite;
  }
`;
