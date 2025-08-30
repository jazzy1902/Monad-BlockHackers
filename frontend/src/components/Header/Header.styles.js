import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Logo = styled.div`
  a {
    font-size: 1.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-family: ${({ theme }) => theme.fonts.heading};
  }
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.div`
  position: relative;
`;

export const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.textSecondary};
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary + "20" : "transparent"};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary + "10"};
  }

  span {
    @media (max-width: 900px) {
      display: none;
    }
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

export const TokenBalance = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.primary + "20"};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

export const CartButton = styled.button`
  position: relative;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: 0.8rem;
  border-radius: 50%;
  font-size: 1.1rem;
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

export const ThemeToggle = styled.button`
  background: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0.8rem;
  border-radius: 50%;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.5rem;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 2rem;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 99;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  }

  ${NavLink} {
    justify-content: flex-start;

    span {
      display: inline;
    }
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
