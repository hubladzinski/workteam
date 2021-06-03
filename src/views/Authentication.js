import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../utils/theme";
import GlobalStyle from "../utils/globalStyles";
import SidebarAuthentication from "../components/sidebar/SidebarAuthentication";
import Icon from "../components/icon/Icon";
import loginIcon from "../assets/login_icon.svg";

const Wrapper = styled.div`
  background: linear-gradient(
    45deg,
    rgba(233, 233, 233, 1) 56%,
    rgba(229, 90, 40, 0.6) 100%
  );
`;

const WrapperIcon = styled.div`
  position: absolute;
  top: 30%;
  left: 42%;
`;

const Header = styled.h3`
  font-size: 28px;
  font-family: ${({ theme }) => theme.fontFamily1};
  margin-left: 20px;
`;

const Authentication = ({ mode }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Wrapper>
          <SidebarAuthentication mode={mode} />
          <WrapperIcon>
            <Icon src={loginIcon} />
            <Header>Basically a big todo app</Header>
          </WrapperIcon>
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default Authentication;
