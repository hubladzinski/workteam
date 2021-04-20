import { useState } from "react";
import styled from "styled-components";
import Button from "../button/Button";
import InventoryItem from "../inventoryItem/InventoryItem";

const Individual = {
  name: "Jan Nowak",
  picture:
    "https://images.pexels.com/photos/7473931/pexels-photo-7473931.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  tel: "123456789",
  email: "email@email.com",
  teams: [
    {
      id: "01",
      name: "Team A",
      picture:
        "https://images.pexels.com/photos/7473931/pexels-photo-7473931.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
  ],
  tasks: [
    { id: "01", name: "Task A", date: "21.02.2021", status: "Completed" },
  ],
};

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
  display: ${({ isOpen }) => (isOpen ? "grid" : "none")};
  grid-gap: 20px;
`;

const IndividualItem = () => {
  const { name, picture, tel, email, teams, tasks } = Individual;

  const [toggleDetails, setToggleDetails] = useState(false);

  return (
    <Wrapper>
      <BasicWrapper>
        <Picture src={picture} />
        <HeaderWrapper>
          <Header>{name}</Header>
          <Button onClick={() => setToggleDetails(!toggleDetails)}>
            Details
          </Button>
        </HeaderWrapper>
        <ListWrapper>
          <li>
            Telefon:<div>{tel}</div>
          </li>
          <li>
            Email:<div>{email}</div>
          </li>
        </ListWrapper>
      </BasicWrapper>
      <AdvancedWrapper isOpen={toggleDetails}>
        <div>
          <H3>Teams</H3>
          <ListLabel>
            <li>Id</li>
            <li>Name</li>
            <li>Picture</li>
            <li></li>
            <li></li>
            <li></li>
            <li>Actions</li>
          </ListLabel>
          <InventoryItem
            id={teams[0].id}
            name={teams[0].name}
            picture={teams[0].picture}
          />
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
          <InventoryItem
            id={tasks[0].id}
            name={tasks[0].name}
            date={tasks[0].date}
            status={tasks[0].status}
            isTask={true}
          />
        </div>
      </AdvancedWrapper>
    </Wrapper>
  );
};

export default IndividualItem;
