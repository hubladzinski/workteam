import styled from "styled-components";
import googleIcon from "../../assets/btn_google_dark_normal_ios.svg";

const Wrapper = styled.button`
  display: flex;
  padding: 0;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #4285f4;
  border: none;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  cursor: pointer;

  img {
    height: 100%;
  }

  span {
    margin: 0 auto;
    color: white;
    font-size: 16px;
  }
`;

const GoogleLogin = () => (
  <Wrapper>
    <img src={googleIcon} alt="google logo" />
    <span>Log in with google</span>
  </Wrapper>
);

export default GoogleLogin;
