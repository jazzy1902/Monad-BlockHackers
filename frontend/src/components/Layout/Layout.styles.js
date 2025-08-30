import styled from "styled-components";

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2rem 0;
  min-height: calc(100vh - 140px); /* Adjust based on header/footer height */

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;
