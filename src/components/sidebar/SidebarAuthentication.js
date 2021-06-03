import styled from "styled-components";
import { Form, Formik } from "formik";
import {
  authenticateLogin,
  authenticateSignup,
  authenticateLoginGoogle,
} from "../../reducers/userSlice";
import { Redirect, useHistory } from "react-router-dom";
import Icon from "../icon/Icon";
import logoIcon from "../../assets/archive-paper.svg";
import GoogleLogin from "../button/GoogleLogin";
import Input from "../input/Input";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

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

const StyledForm = styled(Form)`
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

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.font1};
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email").required("Required"),
  password: Yup.string()
    .min(2, "Must be between 2-30 characters long")
    .max(30, "Must be between 2-30 characters long")
    .required("Required"),
});

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email").required("Required"),
  password: Yup.string()
    .min(2, "Must be between 2-30 characters long")
    .max(30, "Must be between 2-30 characters long")
    .required("Required"),
  confirm_password: Yup.string()
    .min(2, "Must be between 2-30 characters long")
    .max(30, "Must be between 2-30 characters long")
    .required("Required")
    .test("is-equal", "Passwords must match", function (value) {
      const { password } = this.parent;
      return value === password;
    }),
});

const SidebarAuthentication = ({ mode }) => {
  const { user, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = async (values, { setSubmitting }) => {
    dispatch(
      authenticateLogin({ email: values.email, password: values.password })
    );
  };

  const handleLoginGoogle = () => {
    dispatch(authenticateLoginGoogle());
  };

  const handleSignUp = async (values, { setSubmitting }) => {
    dispatch(
      authenticateSignup({ email: values.email, password: values.password })
    );
  };

  const handleChangeToSignup = () => {
    history.push("/signup");
  };

  const handleChangeToLogin = () => {
    history.push("/login");
  };

  let component;
  mode === "signup"
    ? (component = (
        <SidebarSignup
          handleSubmit={handleSignUp}
          handleClick={handleChangeToLogin}
        />
      ))
    : (component = (
        <SidebarLogin
          handleSubmit={handleLogin}
          handleLoginGoogle={handleLoginGoogle}
          handleClick={handleChangeToSignup}
        />
      ));

  if (user._id) {
    return <Redirect to="/calendar" />;
  }
  return component;
};

const SidebarLogin = ({ handleSubmit, handleClick, handleLoginGoogle }) => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={handleSubmit}
    validationSchema={LoginSchema}
  >
    <Wrapper>
      <Logo>
        <StyledIcon src={logoIcon} />
        <p>WorkTeam</p>
      </Logo>
      <Header>Log in to your account</Header>
      <StyledForm>
        <GoogleLogin onClick={handleLoginGoogle} type="button" />
        <Spacer>
          <span>or</span>
        </Spacer>
        <Input
          name={"email"}
          type={"email"}
          label={"Email address"}
          component="input"
        />
        <Input
          name={"password"}
          type={"password"}
          label={"Password"}
          component="input"
        />
        <Button type="submit">Log in</Button>
        <SignUp>
          Dont have an account?{" "}
          <StyledButton onClick={handleClick} type="button" secondary>
            Sign up
          </StyledButton>
        </SignUp>
      </StyledForm>
    </Wrapper>
  </Formik>
);

const SidebarSignup = ({ handleSubmit, handleClick }) => (
  <Formik
    initialValues={{ email: "", password: "", confirm_password: "" }}
    onSubmit={handleSubmit}
    validationSchema={SignupSchema}
  >
    <Wrapper>
      <Logo>
        <StyledIcon src={logoIcon} />
        <p>WorkTeam</p>
      </Logo>
      <Header>Create an account</Header>
      <StyledForm>
        <InnerWrapper>
          <Input
            name={"email"}
            type={"email"}
            label={"Email address"}
            component="input"
          />
          <Input
            name={"password"}
            type={"password"}
            label={"Password"}
            component="input"
          />
          <Input
            name={"confirm_password"}
            type={"password"}
            label={"Confirm password"}
            component="input"
          />
          <Button type="submit">Sign up</Button>
          <SignUp>
            Already have an account?{" "}
            <StyledButton onClick={handleClick} type="button" secondary>
              Log in
            </StyledButton>
          </SignUp>
        </InnerWrapper>
      </StyledForm>
    </Wrapper>
  </Formik>
);

export default SidebarAuthentication;
