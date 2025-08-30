import styled from 'styled-components';

export const EnergyUsageContainer = styled.div`
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
  color: ${({ theme }) => theme.colors.accent};
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
  grid-template-columns: 2fr 1fr;
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

export const UsageLogSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 15px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
`;

export const LogHeader = styled.div`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  padding: 1.5rem 2rem;
  font-weight: 600;
  font-size: 1.2rem;
`;

export const LogEntry = styled.div`
  padding: 1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  grid-template-columns: 120px 1fr 100px 80px;
  gap: 1rem;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 80px;
    gap: 0.5rem;
    
    & > :nth-child(1),
    & > :nth-child(3) {
      display: none;
    }
  }
`;

export const LogTime = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

export const LogDevice = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
`;

export const LogUsage = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
`;

export const LogStatus = styled.div`
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  background: ${({ $status, theme }) => {
    switch ($status) {
      case 'high': return theme.colors.error + '20';
      case 'medium': return theme.colors.warning + '20';
      case 'low': return theme.colors.success + '20';
      default: return theme.colors.border;
    }
  }};
  color: ${({ $status, theme }) => {
    switch ($status) {
      case 'high': return theme.colors.error;
      case 'medium': return theme.colors.warning;
      case 'low': return theme.colors.success;
      default: return theme.colors.textSecondary;
    }
  }};
`;

export const MockChart = styled.div`
  height: 200px;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.accent}20,
    ${({ theme }) => theme.colors.primary}20
  );
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
`;
