import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../utils/theme";
import GlobalStyle from "../utils/globalStyles";
import SidebarSignup from "../components/sidebar/SidebarSignup";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.font1};
`;

const Signup = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Wrapper>
          <SidebarSignup />
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default Signup;
