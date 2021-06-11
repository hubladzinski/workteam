import styled from "styled-components";
import googleIcon from "../../../assets/btn_google_dark_normal_ios.svg";

const Wrapper = styled.button`
  display: flex;
  padding: 0;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #4285f4;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  cursor: pointer;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 4px solid rgba(0, 0, 0, 0.25);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);

  &:hover {
    box-shadow: 0px 15px 25px -5px rgba(0, 0, 0, 0.15);
  }

  &:active {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transform: scale(0.98);
  }

  img {
    height: 100%;
  }

  span {
    margin: 0 auto;
    color: white;
    font-size: 16px;
  }
`;

const GoogleLogin = ({ type, ...props }) => (
  <Wrapper type={type} {...props}>
    <img src={googleIcon} alt="google logo" />
    <span>Log in with google</span>
  </Wrapper>
);

export default GoogleLogin;
