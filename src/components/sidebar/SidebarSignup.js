import styled from "styled-components";
import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Icon from "../icon/Icon";
import logoIcon from "../../assets/archive-paper.svg";
import Input from "../input/Input";
import Button from "../button/Button";

const Wrapper = styled.div`
  width: 400px;
  height: 100vh;
  padding: 40px;
  background: ${({ theme }) => theme.background};
`;

const InnerWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const Logo = styled.div`
  display: flex;
  margin-bottom: 50px;
  align-items: center;
  font-family: "Nunito Sans", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary2};
  stroke: ${({ theme }) => theme.primary2};
`;

const StyledIcon = styled(Icon)`
  width: 44px;
  height: 52px;
  margin-right: 15px;
`;

const Header = styled.h2`
  font-size: 26px;
  font-weight: 500;
  color: ${({ theme }) => theme.font1};
  margin-bottom: 35px;
`;

const SidebarSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <Wrapper>
      <Logo>
        <StyledIcon src={logoIcon} />
        <p>WorkTeam</p>
      </Logo>
      <Header>Create an account</Header>
      <InnerWrapper>
        <Input
          type={"email"}
          value={email}
          label={"email"}
          onChange={(e) => setEmail(e.target.value)}
        >
          Email address
        </Input>
        <Input
          type={"password"}
          label={"password"}
          onChange={(e) => setPassword(e.target.value)}
        >
          Password
        </Input>
        <Button onClick={SignUp}>Sign up</Button>
      </InnerWrapper>
    </Wrapper>
  );
};

export default SidebarSignup;
