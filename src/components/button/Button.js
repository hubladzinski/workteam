import styled from "styled-components";
import { colors } from "../../utils/styles";

const Button = styled.button`
  width: 200px;
  height: 55px;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: ${colors.font1};
  background-color: ${colors.primary1};
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export default Button;
