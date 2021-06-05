import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import TaskItem from "../taskItem";
import { requestType } from "../../../backend/backend";
import Loader from "../../loader/loader";

const Wrapper = styled.div`
  position: relative;
`;

const Header = styled.h3`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.font2};
`;

const ListLabel = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  list-style: none;
  text-align: center;
  height: 30px;
  margin: 15px 25px 15px 0;
  font-weight: 500;
`;

const TasksWrapper = styled.div`
  display: grid;
  grid-gap: 15px;
  max-height: 600px;
  overflow-y: scroll;
`;

const StyledLoader = styled(Loader)`
  position: absolute;
  top: 50px;
  left: 45%;
`;

const TasksList = ({ _id, taskId }) => {
  const { user } = useSelector((state) => state.user);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (request, callback) => {
    try {
      const response = await fetch(request.url, request.options);
      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const request = {
      url: `${requestType.get_user_tasks}/${_id}`,
      options: {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      },
    };
    setLoading(true);
    fetchData(request).then((response) => {
      setTasks(response);
      setLoading(false);
    });
  }, [_id, user.token]);

  return (
    <Wrapper>
      <Header>Tasks history</Header>
      <ListLabel>
        <li>Title</li>
        <li>Date start</li>
        <li>Date end</li>
        <li>Status</li>
        <li></li>
      </ListLabel>
      <TasksWrapper>
        {tasks &&
          tasks.map((task) => (
            <TaskItem
              _id={task._id}
              taskId={taskId}
              title={task.title}
              time_start={task.time_start}
              time_end={task.time_end}
              status={
                task.steps.length === 0 ||
                task.steps[task.steps.length - 1].status !== "completed"
                  ? "In progress"
                  : "Completed"
              }
              note={task.note}
              steps={task.steps}
              users={task.users}
            />
          ))}
      </TasksWrapper>
      {loading && <StyledLoader />}
    </Wrapper>
  );
};

export default TasksList;
