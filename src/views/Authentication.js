import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../utils/theme";
import GlobalStyle from "../utils/globalStyles";
import SidebarAuthentication from "../components/sidebar/SidebarAuthentication";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.font1};
`;

const Authentication = ({ mode }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Wrapper>
          <SidebarAuthentication mode={mode} />
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default Authentication;
