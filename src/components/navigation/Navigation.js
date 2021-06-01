import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Icon from "../icon/Icon";
import briefcaseIcon from "../../assets/briefcase.svg";

const Wrapper = styled.ul`
  display: grid;
  grid-gap: 10px;
  list-style: none;

  a {
    text-decoration: none;
  }
`;

const Item = styled.button`
  display: flex;
  align-items: flex-end;
  padding: 10px 12px;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.font1};
  border-bottom: 1px solid ${({ theme }) => theme.font1};
  cursor: pointer;
  fill: ${({ theme }) => theme.font1};

  span {
    display: block;
    margin-left: 15px;
  }

  &.active {
    color: ${({ theme }) => theme.primary2};
    border-bottom: 1px solid ${({ theme }) => theme.primary2};
    fill: ${({ theme }) => theme.primary2};
  }
`;

const StyledIcon = styled(Icon)`
  width: 25px;
  height: 25px;
`;

const Navigation = () => {
  return (
    <nav>
      <Wrapper>
        <li>
          <Item as={NavLink} to="/calendar" activeClassName="active">
            <StyledIcon src={briefcaseIcon} />
            <span>Calendar</span>
          </Item>
        </li>
        <li>
          <Item as={NavLink} to="/teams" activeClassName="active">
            <StyledIcon src={briefcaseIcon} />
            <span>People</span>
          </Item>
        </li>
        <li>
          <Item as={NavLink} to="/inventory" activeClassName="active">
            <StyledIcon src={briefcaseIcon} />
            <span>Inventory</span>
          </Item>
        </li>
        <li>
          <Item as={NavLink} to="/user" activeClassName="active">
            <StyledIcon src={briefcaseIcon} />
            <span>User profile</span>
          </Item>
        </li>
      </Wrapper>
    </nav>
  );
};

export default Navigation;
