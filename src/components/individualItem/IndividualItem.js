import styled from "styled-components";
import ItemImage from "../../assets/pexels-james-wheeler-3936137.jpg";
import Button from "../button/Button";
import InventoryItem from "../inventoryItem/InventoryItem";

const Wrapper = styled.div`
  display: grid;
  grid-gap: 50px;
  padding: 20px 35px;
  border: 1px solid ${({ theme }) => theme.border2};
`;

const BasicWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Picture = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin-right: 50px;
  object-fit: cover;
`;

const HeaderWrapper = styled.div`
  margin-right: 70px;
`;

const Header = styled.h2`
  font-size: 26px;
  margin-bottom: 15px;
`;

const ListWrapper = styled.div`
  display: flex;
  list-style: none;
  font-size: 16px;

  li {
    position: relative;
    margin-right: 100px;
  }

  li:not(:last-child)::after {
    content: "";
    position: absolute;
    border-right: 1px solid #000;
    height: 96px;
    right: -50px;
    bottom: -40%;
  }

  div {
    margin-top: 20px;
  }
`;

const H3 = styled.h3`
  font-size: 22px;
  font-weight: 500;
`;

const ListLabel = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
  list-style: none;
  text-align: center;
  height: 30px;
  margin: 15px 0;
  font-weight: 500;
`;

const AdvancedWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const IndividualItem = () => (
  <Wrapper>
    <BasicWrapper>
      <Picture src={ItemImage} />
      <HeaderWrapper>
        <Header>Jan Nowak</Header>
        <Button>Details</Button>
      </HeaderWrapper>
      <ListWrapper>
        <li>
          Telefon:<div>123456789</div>
        </li>
        <li>
          Email:<div>email@email.com</div>
        </li>
      </ListWrapper>
    </BasicWrapper>
    <AdvancedWrapper>
      <div>
        <H3>Teams</H3>
        <ListLabel>
          <li>Id</li>
          <li>Name</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li>Actions</li>
        </ListLabel>
        <InventoryItem />
      </div>
      <div>
        <H3>Tasks history</H3>
        <ListLabel>
          <li>Id</li>
          <li>Task</li>
          <li>Date</li>
          <li>Status</li>
          <li></li>
          <li></li>
          <li>Actions</li>
        </ListLabel>
        <InventoryItem />
      </div>
    </AdvancedWrapper>
  </Wrapper>
);

export default IndividualItem;
