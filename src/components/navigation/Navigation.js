import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { colors } from "../../utils/styles";

const Wrapper = styled.ul`
  display: grid;
  grid-gap: 10px;
  list-style: none;

  a {
    text-decoration: none;
    display: block;
  }
`;

const Item = styled.button`
  width: 200px;
  height: 40px;
  padding: 10px 12px;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: ${colors.font1};
  border-bottom: 1px solid ${colors.font1};
  cursor: pointer;

  &.active {
    color: ${colors.primary2};
    border-bottom: 1px solid ${colors.primary2};
  }
`;

const Navigation = () => {
  return (
    <nav>
      <Wrapper>
        <li>
          <Item as={NavLink} to="/calendar" activeClassName="active">
            Calendar
          </Item>
        </li>
        <li>
          <Item as={NavLink} to="/teams" activeClassName="active">
            Teams
          </Item>
        </li>
        <li>
          <Item as={NavLink} to="/inventory" activeClassName="active">
            Inventory
          </Item>
        </li>
      </Wrapper>
    </nav>
  );
};

export default Navigation;
