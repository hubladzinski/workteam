import styled from "styled-components";

const Label = styled.label`
  font-family: ${({ theme }) => theme.fontFamily2};
  font-size: 14px;
`;

const Input = styled.input`
  height: 30px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 20px;
  margin-left: 20px;
  padding: 10px;

  &:focus {
    outline-width: 0;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
  }
`;

const InputMain = () => (
  <Label>
    Search
    <Input type="text" />
  </Label>
);

export default InputMain;
