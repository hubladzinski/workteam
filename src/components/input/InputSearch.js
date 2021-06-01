import styled from "styled-components";
import { useState, useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

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

const InputSearch = ({ handleCallback, label }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    handleCallback(inputValue);
  }, [inputValue, handleCallback]);

  return (
    <Wrapper>
      <Label htmlFor={label}>Search</Label>
      <Input
        id={label}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Wrapper>
  );
};

export default InputSearch;
