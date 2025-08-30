import styled from "styled-components";

// ... existing styles ...

export const NetworkInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
  margin-top: 0.5rem;
  padding: 0.3rem 0.6rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
`;

export const CopyButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: none;
  margin-left: 0.5rem;
  padding: 0.2rem;
  border-radius: 4px;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background};
  }

  span {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: ${({ theme }) => theme.colors.success};
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.7rem;
    white-space: nowrap;
  }
`;

// Add to existing exports
export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 50px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }

  svg {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 1rem;
  min-width: 320px;
  box-shadow: 0 8px 25px ${({ theme }) => theme.colors.shadow};
  z-index: 1000;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(0)" : "translateY(-10px)"};
  transition: all 0.3s ease;
`;

export const UserInfo = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

export const UserName = styled.h4`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const UserAddress = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  font-family: monospace;
  display: flex;
  align-items: center;
`;

export const UserStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.2rem;
`;

export const DisconnectButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  padding: 0.7rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.error}dd;
    transform: translateY(-1px);
  }
`;
