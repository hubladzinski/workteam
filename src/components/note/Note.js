import styled from "styled-components";
import { useState } from "react";
import { Redirect } from "react-router";

const Wrapper = styled.button`
  display: grid;
  border: none;
  width: 100%;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fontFamily2};
  font-weight: 300;
  padding: 10px;
  color: ${({ theme }) => theme.background};
  background-color: ${({ theme }) => theme.note};
  cursor: pointer;
  text-align: left;
  grid-gap: 10px;
  border-radius: 3px;
`;

const Title = styled.h3`
  font-size: 14px;
`;

const Time = styled.p`
  font-size: 16px;
`;

const Note = ({ id, title, time }) => {
  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={`/calendar/task/${id}`} />;
  }

  return (
    <Wrapper onClick={handleClick}>
      <Title>{title}</Title>
      <Time>{time}</Time>
    </Wrapper>
  );
};

export default Note;
