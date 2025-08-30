import React, { useState } from "react";
import {
  FaSolarPanel,
  FaBolt,
  FaChartLine,
  FaLeaf,
  FaTrophy,
  FaCog,
} from "react-icons/fa";
import { ComingSoon } from "../../components/ComingSoon/ComingSoon";
import {
  HomeContainer,
  WelcomeSection,
  Title,
  Subtitle,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
} from "./Home.styles";

export const Home = ({ onNavigate }) => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const features = [
    {
      icon: <FaTrophy />,
      title: "Leaderboard",
      description:
        "Compete with other users and see your ranking in solar energy generation and efficiency.",
      action: () => onNavigate("leaderboard"),
    },
    {
      icon: <FaBolt />,
      title: "Power Usage Analytics",
      description:
        "Keep track of your power consumption patterns and optimize your energy usage.",
      action: () => onNavigate("energyUsage"),
    },
    {
      icon: <FaSolarPanel />,
      title: "Power Generated Analytics",
      description:
        "Monitor your solar panel output in real-time and track energy generation over time.",
      action: () => onNavigate("energyGenerated"),
    },
    {
      icon: <FaChartLine />,
      title: "Performance Analytics",
      description:
        "Detailed insights and analytics to help you understand your energy efficiency.",
      action: () => setShowComingSoon(true),
    },
    {
      icon: <FaLeaf />,
      title: "Environmental Impact",
      description:
        "See how much CO2 you've saved and your positive impact on the environment.",
      action: () => setShowComingSoon(true),
    },
    {
      icon: <FaCog />,
      title: "Smart Controls",
      description:
        "Automate your energy usage with smart controls and optimization algorithms.",
      action: () => setShowComingSoon(true),
    },
  ];

  return (
    <>
      <HomeContainer>
        <WelcomeSection>
          <Title>Welcome to GreenSol</Title>
          <Subtitle>
            Your comprehensive platform for tracking solar energy generation and
            power consumption. Monitor, analyze, and optimize your energy usage
            with our advanced analytics dashboard.
          </Subtitle>
        </WelcomeSection>

        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index} onClick={feature.action}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </HomeContainer>

      {showComingSoon && (
        <ComingSoon onClose={() => setShowComingSoon(false)} />
      )}
    </>
  );
};
