import styled, { css } from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  font-size: 14px;
  bottom: -100px;
  left: 50%;
  padding: 15px 10px;
  font-family: "Montserrat", sans-serif;
  color: ${({ theme }) => theme.font1};
  background-color: ${({ theme }) => theme.primary1};
  border-radius: 3px;
  transition: transform 0.3s ease-in;
  cursor: pointer;

  ${({ activate }) =>
    activate &&
    css`
      transform: translateY(-20vh);
    `}
`;

const Feedback = ({ message, ...props }) => (
  <Wrapper {...props}>
    <p>{message}</p>
  </Wrapper>
);

export default Feedback;
