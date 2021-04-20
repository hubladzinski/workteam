import styled from "styled-components";
import Button from "../button/Button";

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-areas: ${({ isTask }) =>
    isTask
      ? `"id name date status price picture actions"`
      : `"id name picture status price date actions"`};
  align-items: center;
  align-content: center;
  height: 75px;
  font-size: 14px;
  list-style: none;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border2};
`;

const IdWrapper = styled.li`
  grid-area: id;
`;

const NameWrapper = styled.li`
  grid-area: name;
`;

const PictureWrapper = styled.li`
  grid-area: picture;
`;

const PriceWrapper = styled.li`
  grid-area: price;
`;

const DateWrapper = styled.li`
  grid-area: date;
`;

const ActionsWrapper = styled.li`
  grid-area: actions;
`;

const Picture = styled.img`
  display: ${({ isTask }) => (isTask ? "none" : "inline-block")};
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Status = styled.li`
  color: #4a8e2a;
`;

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.primary2};
`;

const InventoryItem = ({ id, name, picture, status, price, date, isTask }) => (
  <Wrapper isTask={isTask}>
    <IdWrapper>{id}</IdWrapper>
    <NameWrapper>{name}</NameWrapper>
    <PictureWrapper>
      <Picture src={picture} isTask={isTask} />
    </PictureWrapper>
    <Status>{status}</Status>
    <PriceWrapper>{price}</PriceWrapper>
    <DateWrapper>{date}</DateWrapper>
    <ActionsWrapper>
      <div>
        <StyledButton secondary>Edit</StyledButton>
      </div>
      <div>
        <StyledButton secondary>Delete</StyledButton>
      </div>
    </ActionsWrapper>
  </Wrapper>
);

export default InventoryItem;
