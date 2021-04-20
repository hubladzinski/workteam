import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../reducers/index";
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

const Schedule = () => {
  const { inventory } = useSelector((state) => state.root);

  return (
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
            <InventoryItem
              id={inventory[0].id}
              name={inventory[0].name}
              picture={inventory[0].picture}
              status={inventory[0].status}
              price={inventory[0].price}
              date={inventory[0].date}
            />
          </li>
          <li>
            <InventoryItem
              id={inventory[0].id}
              name={inventory[0].name}
              picture={inventory[0].picture}
              status={inventory[0].status}
              price={inventory[0].price}
              date={inventory[0].date}
            />
          </li>
          <li>
            <InventoryItem
              id={inventory[0].id}
              name={inventory[0].name}
              picture={inventory[0].picture}
              status={inventory[0].status}
              price={inventory[0].price}
              date={inventory[0].date}
            />
          </li>
          <li>
            <InventoryItem
              id={inventory[0].id}
              name={inventory[0].name}
              picture={inventory[0].picture}
              status={inventory[0].status}
              price={inventory[0].price}
              date={inventory[0].date}
            />
          </li>
          <li>
            <InventoryItem
              id={inventory[0].id}
              name={inventory[0].name}
              picture={inventory[0].picture}
              status={inventory[0].status}
              price={inventory[0].price}
              date={inventory[0].date}
            />
          </li>
          <li>
            <InventoryItem
              id={inventory[0].id}
              name={inventory[0].name}
              picture={inventory[0].picture}
              status={inventory[0].status}
              price={inventory[0].price}
              date={inventory[0].date}
            />
          </li>
        </ListItems>
      </Card>
    </MainTemplate>
  );
};

export default Schedule;
