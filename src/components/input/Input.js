import styled, { css } from "styled-components";
import { useField } from "formik";

const Wrapper = styled.div`
  display: grid;
  grid-gap: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.font1};

  ${({ secondary }) =>
    secondary &&
    css`
      color: ${({ theme }) => theme.font2};
    `}

  ${({ editMode }) =>
    editMode &&
    css`
      display: none;
    `}
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

  ${({ secondary }) =>
    secondary &&
    css`
      color: ${({ theme }) => theme.font2};
      background-color: transparent;
      border: 1px solid ${({ theme }) => theme.border3};
    `}
`;

const Input = ({
  label,
  type,
  secondary,
  editMode,
  component,
  name,
  accept,
  ...props
}) => {
  const [field] = useField(name);

  return (
    <Wrapper {...props}>
      <Label secondary={secondary} editMode={editMode} htmlFor={name}>
        {label}
      </Label>
      <Field
        secondary={secondary}
        id={name}
        name={name}
        type={type}
        accept={accept}
        as={component}
        {...field}
        {...props}
      />
    </Wrapper>
  );
};

export default Input;
