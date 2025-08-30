import React from "react";
import { Link } from "react-router-dom";
import {
  FaSolarPanel,
  FaBolt,
  FaTrophy,
  FaShoppingCart,
  FaArrowRight,
  FaCoins,
  FaGift,
} from "react-icons/fa";
import { useWeb3 } from "../../context/Web3Context";
import { useMarketplace } from "../../context/MarketplaceContext";
import {
  HomeContainer,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  CTAButton,
  FeaturesSection,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  MarketplaceSection,
  MarketplaceHeader,
  MarketplaceGrid,
  MarketplaceCard,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  TokensSection,
  TokensDisplay,
  TokensLabel,
  QuickActions,
  ActionButton,
} from "./Home.styles";

export const Home = () => {
  const { isConnected } = useWeb3();
  const { userTokenBalance, products } = useMarketplace();

  // Featured products for home page
  const featuredProducts = products.slice(0, 3);

  // Updated features - removed streak
  const features = [
    {
      icon: <FaSolarPanel />,
      title: "Track Energy Generation",
      description:
        "Monitor your solar panel output in real-time with detailed analytics and insights.",
    },
    {
      icon: <FaBolt />,
      title: "Manage Energy Usage",
      description:
        "Optimize your energy consumption patterns and reduce your carbon footprint.",
    },
    {
      icon: <FaTrophy />,
      title: "Compete & Lead",
      description:
        "Join the leaderboard and compete with other solar energy enthusiasts.",
    },
    {
      icon: <FaShoppingCart />,
      title: "Redeem Rewards",
      description:
        "Use earned tokens to purchase eco-friendly products and services.",
    },
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>☀️ Welcome to Solar Portal</HeroTitle>
          <HeroSubtitle>
            Track your solar energy generation, manage consumption, compete with
            others, and redeem your green achievements for amazing rewards!
          </HeroSubtitle>

          {isConnected ? (
            <TokensSection>
              <TokensDisplay>
                <FaCoins style={{ fontSize: "2rem" }} />
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {userTokenBalance.toLocaleString()}
                  </div>
                  <TokensLabel>Available Tokens</TokensLabel>
                </div>
              </TokensDisplay>

              <QuickActions>
                <ActionButton as={Link} to="/marketplace">
                  <FaShoppingCart />
                  Shop Marketplace
                </ActionButton>
                <ActionButton as={Link} to="/energy-generated">
                  <FaSolarPanel />
                  Generate Energy
                </ActionButton>
              </QuickActions>
            </TokensSection>
          ) : (
            <CTAButton>Connect your MetaMask wallet to get started!</CTAButton>
          )}
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <h2>🌟 Platform Features</h2>
        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </FeaturesSection>

      {isConnected && (
        <MarketplaceSection>
          <MarketplaceHeader>
            <div>
              <h2>
                <FaGift />
                Marketplace Highlights
              </h2>
              <p>
                Redeem your earned tokens for eco-friendly products and rewards
              </p>
            </div>
            <Link to="/marketplace">
              View All Products <FaArrowRight />
            </Link>
          </MarketplaceHeader>

          <MarketplaceGrid>
            {featuredProducts.map((product) => (
              <MarketplaceCard key={product.id} as={Link} to="/marketplace">
                <ProductImage>{product.image}</ProductImage>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>
                    <FaCoins />
                    {product.tokenPrice.toLocaleString()} tokens
                  </ProductPrice>
                </ProductInfo>
              </MarketplaceCard>
            ))}
          </MarketplaceGrid>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              💡 Generate more energy to earn tokens • 🎯 Complete challenges
              for bonus rewards
              <br />
              <small>
                Current Time: 2025-08-30 12:24:58 | User: imangi-iit
              </small>
            </p>
          </div>
        </MarketplaceSection>
      )}
    </HomeContainer>
  );
};
