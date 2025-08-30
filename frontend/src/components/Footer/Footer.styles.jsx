import styled from "styled-components";

export const FooterContainer = styled.footer`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}E6,
    ${({ theme }) => theme.colors.accent}E6
  );
  color: ${({ theme }) => theme.colors.background};
  margin-top: auto;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="leaves" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23leaves)"/></svg>');
    pointer-events: none;
  }
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 1rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 2rem 1rem 1rem;
  }
`;

export const FooterMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

export const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: white;
    font-family: ${({ theme }) => theme.fonts.heading};
  }

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const FooterTagline = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  font-style: italic;
  margin: 0;
`;

export const EcoStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const EcoStat = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);

  svg {
    font-size: 1.5rem;
    color: #4caf50;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    strong {
      font-size: 1rem;
      color: white;
    }

    span {
      font-size: 0.8rem;
      opacity: 0.8;
    }
  }
`;

export const FooterCredits = styled.div`
  text-align: center;
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

export const CreatedBy = styled.div`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.3rem;
  color: white;
`;

export const DeveloperNames = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  font-size: 1.2rem;

  span {
    color: rgba(255, 255, 255, 0.8);
    font-style: italic;
  }
`;

export const DeveloperName = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 0.5rem 1.2rem;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  strong {
    color: white;
    font-size: 1.1rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

export const EnvironmentalMessage = styled.div`
  font-size: 1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

export const Copyright = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.4;

  small {
    font-size: 0.8rem;
    opacity: 0.7;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

export const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;
