import styled from "styled-components";
import Button from "../button/Button";
import ItemImage from "../../assets/pexels-james-wheeler-3936137.jpg";

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
  align-content: center;
  height: 75px;
  font-size: 14px;
  list-style: none;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border2};
`;

const Picture = styled.img`
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

const InventoryItem = () => (
  <Wrapper>
    <li>02</li>
    <li>Kekw</li>
    <li>
      <Picture src={ItemImage} />
    </li>
    <Status>In stock</Status>
    <li>65,3</li>
    <li>21.02.2012</li>
    <li>
      <div>
        <StyledButton secondary>Edit</StyledButton>
      </div>
      <div>
        <StyledButton secondary>Delete</StyledButton>
      </div>
    </li>
  </Wrapper>
);

export default InventoryItem;
