import styled from "styled-components";

export const MarketplaceContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const MarketplaceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 15px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const TokenBalance = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.primary + "20"};
  padding: 1rem 1.5rem;
  border-radius: 15px;
  border: 2px solid ${({ theme }) => theme.colors.primary};

  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  div {
    div:first-child {
      font-size: 1.5rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.primary};
    }

    small {
      color: ${({ theme }) => theme.colors.textSecondary};
      font-size: 0.8rem;
    }
  }
`;

export const SearchAndFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const SearchBox = styled.div`
  position: relative;
  max-width: 400px;

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: 25px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 1rem;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      outline: none;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

export const CategoryFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const CategoryButton = styled.button`
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $isActive }) =>
    $isActive ? "white" : theme.colors.textSecondary};
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid
    ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primary : theme.colors.border};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CartSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

export const CartButton = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.4rem;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    margin-bottom: 1rem;
  }

  h2,
  h3 {
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    max-width: 400px;
    margin: 0 auto;
  }
`;

export const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
