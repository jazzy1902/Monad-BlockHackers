import styled from "styled-components";

export const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const WelcomeSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}20,
    ${({ theme }) => theme.colors.accent}20
  );
  border-radius: 20px;
  margin-bottom: 4rem;
`;

export const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}20,
    ${({ theme }) => theme.colors.accent}20
  );
  border-radius: 20px;
  margin-bottom: 4rem;
`;

export const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const CTAButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-3px);
    box-shadow: 0 10px 25px ${({ theme }) => theme.colors.shadow};
  }
`;

export const TokensSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
`;

export const TokensDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
`;

export const TokensLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

export const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ActionButton = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

export const FeaturesSection = styled.section`
  margin-bottom: 4rem;

  h2 {
    text-align: center;
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 3rem;
    font-family: ${({ theme }) => theme.fonts.heading};
  }
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

export const MarketplaceSection = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  margin-bottom: 4rem;
`;

export const MarketplaceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const MarketplaceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export const MarketplaceCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.colors.shadow};
  }
`;

export const ProductImage = styled.div`
  font-size: 3rem;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}10,
    ${({ theme }) => theme.colors.accent}10
  );
`;

export const ProductInfo = styled.div`
  padding: 1.5rem;
`;

export const ProductName = styled.h4`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

export const ProductPrice = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;
