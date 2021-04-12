import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-gap: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.font1};
`;

const Field = styled.input`
  width: 300px;
  height: 55px;
  padding: 10px;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  color: ${({ theme }) => theme.font1};
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 3px;
`;

const Input = () => {
  return (
    <Wrapper>
      <Label for="password">Log in with google</Label>
      <Field id="password" />
    </Wrapper>
  );
};

export default Input;
