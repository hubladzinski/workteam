import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../utils/theme";
import GlobalStyle from "../utils/globalStyles";
import SidebarLogin from "../components/sidebar/SidebarLogin";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.font1};
`;

const Login = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Wrapper>
          <SidebarLogin />
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default Login;
