import styled from "styled-components";

export const CartContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: -4px 0 20px ${({ theme }) => theme.colors.shadow};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 480px) {
    width: 100vw;
  }
`;

export const CartHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
  }

  button {
    background: none;
    color: white;
    font-size: 1.5rem;
    padding: 0.5rem;
    border-radius: 50%;
    border: none;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

export const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemImage = styled.div`
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
`;

export const ItemInfo = styled.div`
  flex: 1;
`;

export const ItemName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
`;

export const ItemPrice = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const QuantityButton = styled.button`
  background: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const QuantityDisplay = styled.div`
  font-weight: 600;
  min-width: 30px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const RemoveButton = styled.button`
  background: ${({ theme }) => theme.colors.error + "20"};
  color: ${({ theme }) => theme.colors.error};
  padding: 0.5rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.error};
    color: white;
  }
`;

export const CartSummary = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TotalTokens = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

export const UserBalance = styled.div`
  font-size: 0.9rem;
  color: ${({ theme, $sufficient }) =>
    $sufficient ? theme.colors.success : theme.colors.error};
  margin-bottom: 1rem;
`;

export const CheckoutButton = styled.button`
  width: 100%;
  background: ${({ theme, $canCheckout }) =>
    $canCheckout ? theme.colors.primary : theme.colors.border};
  color: ${({ theme, $canCheckout }) =>
    $canCheckout ? "white" : theme.colors.textSecondary};
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const EmptyCart = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: 2rem;

  p {
    font-size: 1.1rem;
    margin: 1rem 0 0.5rem;
  }

  small {
    opacity: 0.7;
  }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1001;

  p {
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;
