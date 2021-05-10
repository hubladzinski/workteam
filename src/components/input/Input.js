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
  width: 100%;
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

const Input = ({ children, label, type, ...props }) => {
  return (
    <Wrapper {...props}>
      <Label htmlFor={label}>{children}</Label>
      <Field type={type} id={label} />
    </Wrapper>
  );
};

export default Input;
