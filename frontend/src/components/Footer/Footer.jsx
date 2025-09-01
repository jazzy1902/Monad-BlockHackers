import React from "react";
import {
  FaHeart,
  FaLeaf,
  FaCode,
  FaSun,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  FooterContainer,
  FooterContent,
  FooterMain,
  FooterBrand,
  FooterTagline,
  FooterCredits,
  CreatedBy,
  DeveloperNames,
  DeveloperName,
  EnvironmentalMessage,
  FooterBottom,
  SocialLinks,
  SocialLink,
  Copyright,
  EcoStats,
  EcoStat,
} from "./Footer.styles";

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterMain>
          <FooterBrand>
            <FaSun style={{ fontSize: "2rem", marginBottom: "0.5rem" }} />
            <h3>GreenSol</h3>
            <FooterTagline>
              Powering the future, one ray at a time ☀️
            </FooterTagline>
          </FooterBrand>

          <EcoStats>
            <EcoStat>
              <FaLeaf />
              <div>
                <strong>Clean Energy</strong>
                <span>Tracking solar generation</span>
              </div>
            </EcoStat>
            <EcoStat>
              <FaHeart />
              <div>
                <strong>For Earth</strong>
                <span>Reducing carbon footprint</span>
              </div>
            </EcoStat>
          </EcoStats>
        </FooterMain>

        <FooterCredits>
          <CreatedBy>
            <FaCode style={{ marginRight: "0.5rem" }} />
            Crafted with{" "}
            <FaHeart style={{ color: "#e74c3c", margin: "0 0.3rem" }} /> for the
            environment
          </CreatedBy>

          <DeveloperNames>
            <span>by</span>
            <DeveloperName>
              <strong>Jai Sharma</strong>
            </DeveloperName>
            <span>&</span>
            <DeveloperName>
              <strong>Vidit Parikh</strong>
            </DeveloperName>
          </DeveloperNames>

          <EnvironmentalMessage>
            <FaLeaf style={{ marginRight: "0.5rem" }} />
            Building technology that nurtures our planet 🌍
          </EnvironmentalMessage>
        </FooterCredits>

        <FooterBottom>
          <Copyright>
            © 2025 GreenSol - Vibe Tech Solutions
            <br />
            <small>Making renewable energy accessible to everyone</small>
          </Copyright>

          <SocialLinks>
            <SocialLink
              href="https://github.com/jazzy1902/Monad-BlockHackers"
              title="GitHub"
            >
              <FaGithub />
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/vidit-parikh/"
              title="LinkedIn"
            >
              <FaLinkedin />
            </SocialLink>
          </SocialLinks>
        </FooterBottom>
      </FooterContent>

      <div
        style={{
          textAlign: "center",
          padding: "0.5rem",
          fontSize: "0.7rem",
          opacity: 0.6,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        🌱 Every solar panel counts • Every kilowatt matters • Every day is
        Earth Day 🌱
        <br />
        Last updated: 2025-08-30 11:48:32 UTC | User: imangi-iit
      </div>
    </FooterContainer>
  );
};
