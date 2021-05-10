import styled from "styled-components";
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { requestType } from "../../backend/backend";
import { setUserInfo } from "../../reducers/index";
import { useHistory } from "react-router-dom";
import Icon from "../icon/Icon";
import logoIcon from "../../assets/archive-paper.svg";
import GoogleLogin from "../button/GoogleLogin";
import Input from "../input/Input";
import Button from "../button/Button";
import { useDispatch } from "react-redux";

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

const Spacer = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.font1};
  line-height: 0em;
  color: ${({ theme }) => theme.font1};
  margin: 10px 0;
  span {
    background: ${({ theme }) => theme.background};
    font-size: 14px;
    padding: 0 20px;
  }
`;

const SignUp = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.font1};
`;

const SidebarLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const LogIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        fetchUser(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const fetchUser = async ({ email, uid }) => {
    // Login user in the API using data from Firebase
    const response = await fetch(requestType.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, uid: uid }),
    });

    const responseJSON = await response.json();
    const { user, token } = responseJSON;
    const userInfo = {
      email: user.email,
      _id: user._id,
      uid: user.uid,
      token: token,
      loginStatus: true,
    };
    dispatch(setUserInfo(userInfo));
    history.push("/");
  };

  return (
    <Wrapper>
      <Logo>
        <StyledIcon src={logoIcon} />
        <p>WorkTeam</p>
      </Logo>
      <Header>Log in to your account</Header>
      <InnerWrapper>
        <GoogleLogin />
        <Spacer>
          <span>or</span>
        </Spacer>
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
        <Button onClick={LogIn}>Log in</Button>
        <SignUp>
          Dont have an account? <Button secondary>Sign up</Button>
        </SignUp>
      </InnerWrapper>
    </Wrapper>
  );
};

export default SidebarLogin;
