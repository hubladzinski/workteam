import styled from "styled-components";
import MainTemplate from "../templates/MainTemplate";
import Card from "../components/card/Card";
import InventoryItem from "../components/inventoryItem/InventoryItem";

const Header = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily2};
  font-weight: 700;
  font-size: 32px;
`;

const ListLabel = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  text-align: center;
  height: 30px;
  margin-bottom: 15px;
  font-weight: 500;
`;

const ListItems = styled.ul`
  display: grid;
  grid-gap: 20px;
  list-style: none;
`;

const Schedule = () => (
  <MainTemplate>
    <Header>Inventory</Header>
    <Card>
      <ListLabel>
        <li>Id</li>
        <li>Name</li>
        <li>Picture</li>
        <li>Status</li>
        <li>Price</li>
        <li>Date added</li>
        <li>Actions</li>
      </ListLabel>
      <ListItems>
        <li>
          <InventoryItem />
        </li>
        <li>
          <InventoryItem />
        </li>
        <li>
          <InventoryItem />
        </li>
        <li>
          <InventoryItem />
        </li>
        <li>
          <InventoryItem />
        </li>
        <li>
          <InventoryItem />
        </li>
      </ListItems>
    </Card>
  </MainTemplate>
);

export default Schedule;
