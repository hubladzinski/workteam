import styled from "styled-components";
import Navigation from "../navigation/Navigation";
import Icon from "../icon/Icon";
import logoIcon from "../../assets/archive-paper.svg";
import Button from "../button/Button";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/userSlice";
import { getPeople } from "../../reducers/peopleSlice";
import { getInventory } from "../../reducers/inventorySlice";
import { setItem } from "../../reducers/calendarSlice";
import Feedback from "../feedback/Feedback";

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
  text-decoration: none;
`;

const StyledIcon = styled(Icon)`
  width: 44px;
  height: 52px;
  margin-right: 15px;
`;

const Logged = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 26px;
  color: ${({ theme }) => theme.font1};
`;

const StyledButtonRefresh = styled(Button)`
  color: ${({ theme }) => theme.font1};
`;

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.font1};
  margin-bottom: 20px;
`;

const IconWrapper = styled.span`
  margin-right: 10px;
`;

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [refreshStatus, setRefreshStatus] = useState(false);

  const handleRefresh = async () => {
    if (!refreshStatus) {
      await dispatch(getPeople());
      await dispatch(getInventory());
      dispatch(setItem({ type: "searchCalendar", data: [] }));
      setRefreshStatus(true);
    }
  };

  return (
    <Wrapper>
      <Logo as={NavLink} to="/calendar">
        <StyledIcon src={logoIcon} />
        <p>WorkTeam</p>
      </Logo>
      <Logged>
        <h2>{user.email.split("@")[0]}</h2>
        <StyledButtonRefresh onClick={handleRefresh} secondary>
          <IconWrapper>
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </IconWrapper>
          <span>Refresh</span>
        </StyledButtonRefresh>
      </Logged>
      <StyledButton onClick={() => dispatch(logout())} secondary>
        Logout
      </StyledButton>
      <Navigation />
      <Feedback
        onClick={() => setRefreshStatus(false)}
        message={"Refresh complete"}
        activate={refreshStatus}
      />
    </Wrapper>
  );
};

export default Sidebar;
