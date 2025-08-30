import styled from "styled-components";

export const ProductCardContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 15px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ProductImage = styled.div`
  font-size: 4rem;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}20,
    ${({ theme }) => theme.colors.accent}20
  );
`;

export const ProductInfo = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

export const ProductDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  flex: 1;
`;

export const ProductPrice = styled.div`
  margin-bottom: 1rem;
`;

export const TokenPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme, $canAfford }) =>
    $canAfford ? theme.colors.primary : theme.colors.error};
  margin-bottom: 0.3rem;
`;

export const OriginalPrice = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: line-through;
`;

export const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  span:first-of-type {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: 600;
  }
`;

export const ProductSpecs = styled.div`
  margin-bottom: 1.5rem;
`;

export const SpecItem = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.2rem 0;
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  padding-left: 0.5rem;
  margin-bottom: 0.3rem;
`;

export const AddToCartButton = styled.button`
  background: ${({ theme, $canAfford }) =>
    $canAfford ? theme.colors.primary : theme.colors.border};
  color: ${({ theme, $canAfford }) =>
    $canAfford ? theme.colors.background : theme.colors.textSecondary};
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const InCartIndicator = styled.div`
  background: ${({ theme }) => theme.colors.success};
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: auto;
`;
