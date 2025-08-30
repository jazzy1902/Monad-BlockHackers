import styled from "styled-components";

export const WalletButton = styled.button`
  background: ${({ theme, $isMetaMaskInstalled }) =>
    $isMetaMaskInstalled ? theme.colors.primary : theme.colors.warning};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  position: relative;

  &:hover {
    background: ${({ theme, $isMetaMaskInstalled }) =>
      $isMetaMaskInstalled ? theme.colors.accent : theme.colors.error};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${({ theme }) => theme.colors.shadow};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ConnectedInfo = styled.div`
  background: ${({ theme }) => theme.colors.success}20;
  border: 2px solid ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.success};
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

export const BalanceDisplay = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
  font-weight: 400;
`;

export const ErrorMessage = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  white-space: nowrap;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
  box-shadow: 0 4px 15px ${({ theme }) => theme.colors.shadow};

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${({ theme }) => theme.colors.error};
  }

  @media (max-width: 768px) {
    right: -1rem;
    left: -1rem;
    text-align: center;
  }
`;
