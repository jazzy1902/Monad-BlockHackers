import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Keep all existing styles and add these new ones:

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

export const ConnectWalletPrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};

  h2 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  p {
    font-size: 1.1rem;
    max-width: 400px;
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

export const TxHashLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: inherit;
  text-decoration: none;
  font-size: 0.8rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LogMeta = styled.div`
  font-size: 0.7rem;
  opacity: 0.6;
  margin-top: 0.2rem;
`;

// Update existing LogEntry to accommodate new layout
export const LogEntry = styled.div`
  padding: 1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  grid-template-columns: 160px 1fr 120px 100px 80px;
  gap: 1rem;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 100px 60px;
    gap: 0.5rem;

    & > :nth-child(4),
    & > :nth-child(1) {
      display: none;
    }
  }
`;

// Keep all other existing styles...
export const EnergyGeneratedContainer = styled.div`
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
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

export const MetricCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const MetricTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.1rem;
`;

export const MetricIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-bottom: 0.5rem;
`;

export const MetricChange = styled.div`
  font-size: 0.9rem;
  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.success : theme.colors.error};
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
`;

export const ChartTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const GenerationLogSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 15px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
`;

export const LogHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 1.5rem 2rem;
  font-weight: 600;
  font-size: 1.2rem;
`;

export const LogTime = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

export const LogDevice = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
`;

export const LogGeneration = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const LogEfficiency = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 500;
  font-size: 0.9rem;
`;

export const LogCondition = styled.div`
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  background: ${({ $condition, theme }) => {
    switch ($condition) {
      case "excellent":
        return theme.colors.success + "20";
      case "good":
        return theme.colors.primary + "20";
      case "fair":
        return theme.colors.warning + "20";
      case "poor":
        return theme.colors.error + "20";
      default:
        return theme.colors.border;
    }
  }};
  color: ${({ $condition, theme }) => {
    switch ($condition) {
      case "excellent":
        return theme.colors.success;
      case "good":
        return theme.colors.primary;
      case "fair":
        return theme.colors.warning;
      case "poor":
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  }};
`;

export const MockChart = styled.div`
  height: 200px;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.primary}20,
    ${({ theme }) => theme.colors.accent}20
  );
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  text-align: center;
`;
