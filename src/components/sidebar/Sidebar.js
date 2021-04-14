import styled from "styled-components";
import Navigation from "../navigation/Navigation";
import Icon from "../icon/Icon";
import logoIcon from "../../assets/archive-paper.svg";
import Button from "../button/Button";

const Wrapper = styled.div`
  width: 240px;
  height: 100vh;
  padding: 40px 20px;
  background: ${({ theme }) => theme.background};
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

const LoggedWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const Logged = styled.div`
  font-weight: 600;
  font-size: 26px;
  color: ${({ theme }) => theme.font1};
  margin-right: 15px;
`;

const StyledButton = styled(Button)`
  margin-bottom: 5px;
`;

const Sidebar = () => {
  return (
    <Wrapper>
      <div>
        <Logo>
          <StyledIcon src={logoIcon} />
          <p>WorkTeam</p>
        </Logo>
        <LoggedWrapper>
          <Logged>hublad</Logged>
          <StyledButton secondary>Logout</StyledButton>
        </LoggedWrapper>
        <Navigation />
      </div>
    </Wrapper>
  );
};

export default Sidebar;
