import styled, { css } from "styled-components";
import { ErrorMessage, useField } from "formik";

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

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
`;

const Input = ({
  label,
  type,
  secondary,
  editMode,
  component,
  name,
  accept,
  min,
  step,
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
        min={min}
        step={step}
        {...field}
        {...props}
      />
      <StyledErrorMessage>
        <ErrorMessage name={name} />
      </StyledErrorMessage>
    </Wrapper>
  );
};

export default Input;
