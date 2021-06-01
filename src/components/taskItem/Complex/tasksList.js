import styled from "styled-components";
import TaskItem from "../taskItem";

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

const TasksList = ({ tasks, taskId }) => (
  <div>
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
              task.steps[task.steps.length - 1].status !== "completed"
                ? "In progress"
                : "Completed"
            }
            note={task.note}
            steps={task.steps}
            users={task.users}
            admin={false}
          />
        ))}
    </TasksWrapper>
  </div>
);

export default TasksList;
