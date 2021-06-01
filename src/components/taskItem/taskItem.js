import { useState } from "react";
import styled from "styled-components";
import Button from "../button/Button";
import { Redirect } from "react-router";

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas: "name date_start date_end status actions";
  align-items: center;
  align-content: center;
  height: 75px;
  font-size: 14px;
  list-style: none;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border2};
`;

const TitleWrapper = styled.li`
  grid-area: name;
`;

const DateStartWrapper = styled.li`
  grid-area: date_start;
`;

const DateEndWrapper = styled.li`
  grid-area: date_end;
`;

const ActionsWrapper = styled.li`
  grid-area: actions;
`;

const Status = styled.li`
  color: #4a8e2a;
`;

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.primary2};
`;

const TaskItem = ({
  _id,
  title,
  time_start,
  time_end,
  note,
  steps,
  users,
  status,
  admin,
  taskId,
}) => {
  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    setRedirect(true);
  };

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: `/calendar/task/${_id}`,
          data: {
            _id: _id,
            title: title,
            time_start: new Date(time_start),
            time_end: new Date(time_end),
            note: note,
            steps: steps,
            users: users,
          },
        }}
      />
    );
  }

  return (
    <Wrapper>
      <TitleWrapper>{title}</TitleWrapper>
      <DateStartWrapper>{time_start}</DateStartWrapper>
      <DateEndWrapper>{time_end}</DateEndWrapper>
      <Status>{status}</Status>
      {taskId != _id && (
        <ActionsWrapper>
          <div>
            <StyledButton onClick={handleClick} secondary>
              Show
            </StyledButton>
          </div>
        </ActionsWrapper>
      )}
    </Wrapper>
  );
};

export default TaskItem;
