import styled from "styled-components";
import Progress from "../progress/Progress";
import { useState } from "react";
import IndividualItem from "../individualItem/IndividualItem";

const Header = styled.h2`
  font-size: 26px;
  font-family: ${({ theme }) => theme.fontFamily2};
  font-weight: 700;
  margin-bottom: 25px;
`;

const DetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  margin-bottom: 25px;
`;

const HeaderMinor = styled.h3`
  margin: 0 0 25px 35px;
`;

const TimeItems = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  list-style: none;
  align-items: center;
  align-content: center;
  height: 75px;
  font-size: 14px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border2};
  margin-bottom: 25px;
`;

const NoteWrapper = styled.p`
  flex: 1;
  padding: 20px 35px;
  border: 1px solid ${({ theme }) => theme.border2};
  line-height: 1.5em;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProgressWrapper = styled.div`
  flex: 1;
  padding: 20px 35px;
  border: 1px solid ${({ theme }) => theme.border2};
`;

const PeopleWrapper = styled.div``;

const NoteDetails = () => {
  const [task, setTask] = useState({
    id: 1,
    title: "Hello its me 1",
    date_start: new Date(2021, 4, 5, 15, 45),
    date_end: new Date(2022, 11, 10, 15, 55),
    note:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layou",
    steps: [
      {
        order: 1,
        task: "Do it 1#",
        status: "completed",
      },
      {
        order: 2,
        task: "Do it 2#",
        status: "inProgress",
      },
      {
        order: 3,
        task: "Do it 3#",
        status: "idle",
      },
      {
        order: 3,
        task: "Do it 3#",
        status: "idle",
      },
      {
        order: 3,
        task: "Do it 3#",
        status: "idle",
      },
      {
        order: 3,
        task: "Do it 3#",
        status: "idle",
      },
      {
        order: 3,
        task: "Do it 3#",
        status: "idle",
      },
    ],
    users: [],
    teams: [],
  });

  return (
    <div>
      <Header>Task: {task.title}</Header>
      <DetailsWrapper>
        <InnerWrapper>
          <HeaderMinor>Time</HeaderMinor>
          <TimeItems>
            <li>
              From: {task.date_start.toDateString()}{" "}
              {task.date_start.getHours()}:{task.date_start.getMinutes()}
            </li>
            <li>
              To: {task.date_end.toDateString()} {task.date_end.getHours()}:
              {task.date_end.getMinutes()}
            </li>
          </TimeItems>
          <HeaderMinor>Note</HeaderMinor>
          <NoteWrapper>{task.note}</NoteWrapper>
        </InnerWrapper>
        <InnerWrapper>
          <HeaderMinor>Steps</HeaderMinor>
          <ProgressWrapper>
            <Progress steps={task.steps} />
          </ProgressWrapper>
        </InnerWrapper>
      </DetailsWrapper>
      <PeopleWrapper>
        <HeaderMinor>People/Teams</HeaderMinor>
        <IndividualItem />
      </PeopleWrapper>
    </div>
  );
};

export default NoteDetails;
