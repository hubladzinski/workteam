import styled, { css } from "styled-components";
import numWords from "num-words";

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

const Progress = ({ steps, ...props }) => (
  <List {...props}>
    {steps.map((step, index) => (
      <ListItem>
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
      </ListItem>
    ))}
  </List>
);

export default Progress;
