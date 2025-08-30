import styled from "styled-components";

export const WalletButton = styled.button`
  background: ${({ theme, $isConnecting }) =>
    $isConnecting ? theme.colors.border : theme.colors.primary};
  color: ${({ theme, $isConnecting }) =>
    $isConnecting ? theme.colors.textSecondary : "white"};
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  min-width: 150px;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.8rem;
    min-width: 120px;
  }
`;

export const WalletButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    font-size: 1rem;
    animation: ${({ $isSpinning }) =>
      $isSpinning ? "spin 1s linear infinite" : "none"};
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.8rem;
  margin-top: 0.5rem;
  text-align: center;
  max-width: 250px;
  line-height: 1.4;
`;

export const NetworkWarning = styled.div`
  background: ${({ theme }) => theme.colors.warning + "20"};
  color: ${({ theme }) => theme.colors.warning};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.warning};
`;

export const ConnectedInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const BalanceDisplay = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
