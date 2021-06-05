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
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  border-bottom: 4px solid rgba(0, 0, 0, 0.25);

  &:active {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transform: scale(0.98);
  }
`;

const Title = styled.h3`
  font-size: 14px;
`;

const Time = styled.p`
  font-size: 16px;
`;

const Note = ({ id, title, time_start, time_end, note, steps, users }) => {
  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    setRedirect(true);
  };

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: `/calendar/task/${id}`,
          data: {
            _id: id,
            title: title,
            time_start: time_start,
            time_end: time_end,
            note: note,
            steps: steps,
            users: users,
          },
        }}
      />
    );
  }

  return (
    <Wrapper onClick={handleClick}>
      <Title>{title}</Title>
      <Time>{`${time_start.getHours()}:${time_start.getMinutes()} - ${time_end.getHours()}:${time_end.getMinutes()}`}</Time>
    </Wrapper>
  );
};

export default Note;
