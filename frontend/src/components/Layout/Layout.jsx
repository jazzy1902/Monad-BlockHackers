import React from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { LayoutContainer, MainContent } from "./Layout.styles";

export const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </LayoutContainer>
  );
};
