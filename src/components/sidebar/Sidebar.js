import styled from "styled-components";
import Navigation from "../navigation/Navigation";
import Icon from "../icon/Icon";
import logoIcon from "../../assets/archive-paper.svg";
import Button from "../button/Button";
import { useSelector, useDispatch } from "react-redux";

const Wrapper = styled.div`
  min-width: 300px;
  min-height: 100vh;
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

const Logged = styled.div`
  font-weight: 600;
  font-size: 26px;
  color: ${({ theme }) => theme.font1};
`;

const StyledButton = styled(Button)`
  margin-bottom: 20px;
`;

const Sidebar = () => {
  const { user } = useSelector((state) => state.root);

  return (
    <Wrapper>
      <Logo>
        <StyledIcon src={logoIcon} />
        <p>WorkTeam</p>
      </Logo>
      <Logged>{user.email}</Logged>
      <StyledButton secondary>Logout</StyledButton>
      <Navigation />
    </Wrapper>
  );
};

export default Sidebar;
