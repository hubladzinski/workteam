import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Progress from "../progress/Progress";
import IndividualItem from "../individualItem/IndividualItem";
import { requestType } from "../../backend/backend";

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

const NoteDetails = ({ task }) => {
  const { user } = useSelector((state) => state.user);
  const [people, setPeople] = useState();

  const fetchData = async (request) => {
    try {
      const response = await fetch(request.url, request.options);
      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (task.users.length > 0) {
      setPeople([]);
      task.users.forEach((id) => {
        const request = {
          url: `${requestType.get_users}/${id}`,
          options: {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          },
        };
        const response = fetchData(request);
        response.then((fetchedData) =>
          setPeople((prevState) =>
            prevState ? [...prevState, fetchedData] : [fetchedData]
          )
        );
      });
    } else {
      setPeople([]);
    }
  }, [task.users, user.token]);

  return (
    <div>
      <Header>Task: {task.title}</Header>
      <DetailsWrapper>
        <InnerWrapper>
          <HeaderMinor>Time</HeaderMinor>
          <TimeItems>
            <li>
              From: {task.time_start.toDateString()}{" "}
              {task.time_start.getHours()}:{task.time_start.getMinutes()}
            </li>
            <li>
              To: {task.time_end.toDateString()} {task.time_end.getHours()}:
              {task.time_end.getMinutes()}
            </li>
          </TimeItems>
          <HeaderMinor>Note</HeaderMinor>
          <NoteWrapper>{task.note}</NoteWrapper>
        </InnerWrapper>
        <InnerWrapper>
          <HeaderMinor>Steps</HeaderMinor>
          <ProgressWrapper>
            <Progress steps={task.steps} taskID={task._id} />
          </ProgressWrapper>
        </InnerWrapper>
      </DetailsWrapper>
      <div>
        <HeaderMinor>People/Teams</HeaderMinor>
        {people &&
          people.map((user) => (
            <IndividualItem
              key={user._id}
              _id={user._id}
              taskId={task._id}
              name={user.name}
              email={user.email}
              picture={user.picture}
              tel={user.tel}
            />
          ))}
      </div>
    </div>
  );
};

export default NoteDetails;
