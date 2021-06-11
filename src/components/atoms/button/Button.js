import styled, { css } from "styled-components";

const Button = styled.button`
  width: 100%;
  height: 55px;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.font1};
  background-color: ${({ theme }) => theme.primary1};
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 4px solid rgba(0, 0, 0, 0.25);

  &:hover {
    box-shadow: 0px 15px 25px -5px rgba(0, 0, 0, 0.15);
  }

  &:active {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transform: scale(0.98);
  }

  ${({ secondary }) =>
    secondary &&
    css`
      width: auto;
      height: auto;
      color: ${({ theme }) => theme.background};
      font-size: 12px;
      font-weight: 500;
      background-color: transparent;
      border-radius: 0;
      border-bottom: 1px solid ${({ theme }) => theme.primary2};
      box-shadow: none;
    `}

  ${({ round }) =>
    round &&
    css`
      width: 50px;
      height: 50px;
      border-radius: 25px;
      border: none;
      font-size: 24px;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    `};
`;

export default Button;
