import styled, { css } from "styled-components";
import numWords from "num-words";
import Button from "../button/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { putTask } from "../../reducers/calendarSlice";

const Wrapper = styled.div`
  display: grid;
  grid-gap: 15px;
`;

const List = styled.ul`
  display: grid;
  grid-gap: 15px;
  list-style: none;
`;

const ListItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
`;

const TextWrapper = styled.div`
  margin: 7px 0 0 10px;
`;

const StepWrapper = styled.div`
  margin-left: 10px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily1};
  font-size: 23px;
  line-height: 23px;
  font-weight: 600;
  margin-top: 5px;
`;

const Eyebrow = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily2};
  font-size: 16px;
  line-height: 14px;
  font-weight: 400;
  text-transform: uppercase;
  margin-top: 5px;
`;

const Checkmark = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  border: 1px solid ${({ theme }) => theme.primary2};
  border-radius: 8px;

  ${({ state, index, itemsLength }) =>
    (state === States.inProgress &&
      css`
        background-color: #f4d7da;
        border: 1px solid ${({ theme }) => theme.primary2};
      `) ||
    (state === States.completed &&
      index !== itemsLength - 1 &&
      css`
        background-color: ${({ theme }) => theme.primary2};
        border: none;
        ::after {
          content: "";
          position: absolute;
          top: 15px;
          left: 7px;
          width: 2px;
          height: 50px;
          background-color: ${({ theme }) => theme.primary2};
        }
      `) ||
    (state === States.completed &&
      css`
        background-color: #f3344a;
        border: none;
      `)}
`;

const States = {
  completed: "completed",
  inProgress: "inProgress",
  idle: "idle",
};

const StyledButton = styled(Button)`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-size: 10px;
  margin-left: 20px;
`;

const StyledSubmitButton = styled(Button)`
  width: 250px;
`;

const Progress = ({ steps, taskID, ...props }) => {
  const dispatch = useDispatch();
  const [stepsState, setStepsState] = useState(steps);
  const [stateUpdated, setStateUpdated] = useState(false);

  const handleClick = async (stepIndex) => {
    await setStepsState((prevState) => {
      const newState = prevState.map((step, index) => {
        if (index < stepIndex + 1) {
          return { ...step, status: "completed" };
        }
        if (index === stepIndex + 1) {
          return { ...step, status: "inProgress" };
        }
        return { ...step, status: "idle" };
      });
      return newState;
    });
    setStateUpdated(true);
  };

  const handleDispatch = (taskID, stepsState) => {
    setStateUpdated(false);
    dispatch(putTask({ taskID, stepsState }));
  };

  return (
    <Wrapper>
      <List {...props}>
        {stepsState.map((step, index) => (
          <ListItem key={index}>
            <Checkmark
              state={step.status}
              index={index}
              itemsLength={steps.length}
            />
            <StepWrapper>
              <TextWrapper>
                <Eyebrow>Step {numWords(index + 1)}</Eyebrow>
                <Title>{step.task}</Title>
              </TextWrapper>
            </StepWrapper>
            {step.status === "inProgress" && (
              <StyledButton onClick={() => handleClick(index)}>
                <i class="fas fa-check"></i>
              </StyledButton>
            )}
          </ListItem>
        ))}
      </List>
      {stateUpdated && (
        <StyledSubmitButton onClick={() => handleDispatch(taskID, stepsState)}>
          Update steps
        </StyledSubmitButton>
      )}
    </Wrapper>
  );
};

export default Progress;
