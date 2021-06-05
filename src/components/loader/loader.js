import styled, { keyframes } from "styled-components";

const loaderAnimation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const Loader = styled.div`
  position: fixed;
  bottom: 100px;
  left: 52%;
  display: inline-block;
  width: 80px;
  height: 80px;
  z-index: 999;

  &::after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid ${({ theme }) => theme.primary1};
    border-color: ${({ theme }) => theme.primary1} transparent
      ${({ theme }) => theme.primary1} transparent;
    animation: ${loaderAnimation} 1.2s linear infinite;
  }
`;

export default Loader;
