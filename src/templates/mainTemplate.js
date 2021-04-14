import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../utils/theme";
import GlobalStyle from "../utils/globalStyles";
import Sidebar from "../components/sidebar/Sidebar";

const Wrapper = styled.div`
  display: flex;
`;

const Background = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  grid-gap: 50px;
  background-color: ${({ theme }) => theme.font1};
  padding: 50px 4vw;
`;

const MainTemplate = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Sidebar />
          <Background>{children}</Background>
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default MainTemplate;
