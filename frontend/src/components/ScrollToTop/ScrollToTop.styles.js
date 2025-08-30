import styled from 'styled-components';

export const ScrollButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  transition: all 0.3s ease;
  z-index: 1000;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transform: ${({ $isVisible }) => ($isVisible ? 'translateY(0)' : 'translateY(20px)')};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-5px);
    box-shadow: 0 6px 25px ${({ theme }) => theme.colors.shadow};
  }

  svg {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    width: 50px;
    height: 50px;

    svg {
      font-size: 1.2rem;
    }
  }
`;
