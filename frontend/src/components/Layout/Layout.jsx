import React from 'react';
import { Header } from '../Header/Header';
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';
import { LayoutContainer, MainContent } from './Layout.styles';

export const Layout = ({ children, onNavigate }) => {
  return (
    <LayoutContainer>
      <Header onNavigate={onNavigate} />
      <MainContent>
        {children}
      </MainContent>
      <ScrollToTop />
    </LayoutContainer>
  );
};
