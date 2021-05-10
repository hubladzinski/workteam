import styled, { css } from "styled-components";

const Button = styled.button`
  width: 100%;
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
      font-size: 12px;
      font-weight: 500;
      background-color: transparent;
      border-radius: 0;
      border-bottom: 1px solid ${({ theme }) => theme.font1};
    `}

  ${({ round }) =>
    round &&
    css`
      width: 50px;
      height: 50px;
      border-radius: 25px;
      font-size: 24px;
      background-color: transparent;
      color: #1b262c;

      &:hover {
        background-color: ${({ theme }) => theme.border};
      }

      &:active {
        background-color: ${({ theme }) => theme.font1};
      }
    `}
`;

export default Button;
