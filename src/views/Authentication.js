import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import { resetStatus } from "../reducers/userSlice";
import { theme } from "../utils/theme";
import GlobalStyle from "../utils/globalStyles";
import SidebarAuthentication from "../components/organisms/sidebar/SidebarAuthentication";
import Icon from "../components/atoms/icon/Icon";
import loginIcon from "../assets/login_icon.svg";
import Loader from "../components/atoms/loader/Loader";
import Feedback from "../components/atoms/feedback/Feedback";

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
  const dispatch = useDispatch();
  const { status, response } = useSelector((state) => state.user);

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
          {status === "loading" && (
            <Loader>Backend is booting please wait...</Loader>
          )}
          <Feedback
            onClick={() =>
              dispatch(
                resetStatus({
                  statusType: "status",
                  errorType: "error",
                })
              )
            }
            message={response}
            activate={
              (status === "succeeded" || status === "failed") && response !== ""
                ? true
                : false
            }
          />
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default Authentication;
