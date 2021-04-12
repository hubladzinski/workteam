import styled, { css } from "styled-components";

const Button = styled.button`
  width: 200px;
  height: 55px;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.font1};
  background-color: ${({ theme }) => theme.primary1};
  border: none;
  border-radius: 3px;
  cursor: pointer;

  ${({ secondary }) =>
    secondary &&
    css`
      width: auto;
      height: auto;
      font-size: 10px;
      font-weight: 500;
      background-color: transparent;
      border-radius: 0;
      border-bottom: 1px solid ${({ theme }) => theme.font1};
    `}
`;

export default Button;
