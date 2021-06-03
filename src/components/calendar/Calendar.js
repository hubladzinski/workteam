import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import Button from "../button/Button";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Note from "../note/Note";
import TaskForm from "../taskForm/TaskForm";
import { setItem, getTasks, resetStatus } from "../../reducers/calendarSlice";
import Feedback from "../feedback/Feedback";
import { animated, useTransition } from "react-spring";

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 30px;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavDay = styled.div`
  width: 210px;
  font-size: 24px;
  margin: 0 25px;
  text-align: center;
`;

const InnerWrapper = styled.ul`
  display: grid;
  position: relative;
  grid-template-columns: repeat(7, 1fr);
  border-top: 1px solid ${({ theme }) => theme.border2};
  border-bottom: 1px solid ${({ theme }) => theme.border2};
  border-left: 1px solid ${({ theme }) => theme.border2};
  list-style: none;
`;

const Column = styled.li`
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  border-right: 1px solid ${({ theme }) => theme.border2};
`;

const Day = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.border2};
  text-align: center;
`;

const DayName = styled.div`
  font-size: 16px;
`;

const DayNumber = styled.div`
  font-size: 40px;
`;

const InnerColumn = styled.div`
  display: grid;
  padding: 10px;
  grid-gap: 10px;
  grid-auto-rows: min-content;
  cursor: pointer;
`;

const TaskFormWrapper = styled(animated.div)`
  position: absolute;
  display: grid;
  top: ${({ taskFormPosition }) => taskFormPosition.top + "px"};
  left: ${({ taskFormPosition }) => taskFormPosition.left + "px"};

  ${({ formDirection }) =>
    !formDirection &&
    css`
      &::before {
        position: absolute;
        height: 100%;
        content: "";
        border: 1px solid red;
        border-radius: 5px;
      }
    `}

  ${({ formDirection }) =>
    formDirection &&
    css`
      &::after {
        position: absolute;
        left: 100%;
        height: 100%;
        content: "";
        border: 1px solid red;
        border-radius: 5px;
      }
    `}
`;

const LeftMark = styled.div`
  display: ${({ formDirection }) => (formDirection ? "none" : "block")};
  position: absolute;
  font-size: 22px;
  color: ${({ theme }) => theme.primary2};
  top: 50%;
  left: -10px;
`;

const RightMark = styled.div`
  display: ${({ formDirection }) => (formDirection ? "block" : "none")};
  position: absolute;
  font-size: 22px;
  color: ${({ theme }) => theme.primary2};
  top: 50%;
  left: 100%;
`;

const CloseMark = styled.div`
  position: absolute;
  left: 92%;
  font-size: 22px;
  cursor: pointer;
  padding: 10px;
`;

const Calendar = () => {
  const dispatch = useDispatch();
  const {
    time,
    searchCalendar,
    tasks,
    addStatus,
    addError,
    addResponse,
  } = useSelector((state) => state.calendar);
  const [weekDays, setWeekDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskFormPosition, setTaskFormPosition] = useState({ top: 0, left: 0 });
  const [formDirection, setFormDirection] = useState(false);

  const transitions = useTransition(showTaskForm, {
    from: { transform: "scale(0)", opacity: 1 },
    enter: { transform: "scale(1)", opacity: 1 },
    leave: { transform: "scale(0)", opacity: 0 },
    reverse: showTaskForm,
    delay: 50,
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    dispatch(getTasks());
  }, [searchCalendar, dispatch]);

  useEffect(() => {
    if (addStatus === "succeeded") {
      dispatch(getTasks());
    }
  }, [addStatus, dispatch]);

  useEffect(() => {
    const weekDays = [];
    let day = time.day;
    let month = time.month;
    let year = time.year;
    for (let i = 1; i <= 7; i++) {
      if (day > time.daysInMonth) {
        day = 1;
        month++;
        if (month > 11) {
          month = 0;
          year++;
        }
      }
      if (day < 1) {
        day = time.daysInPreviousMonth + day - 1;
        month--;
        if (month < 0) {
          month = 11;
          year--;
        }
      }
      weekDays.push(new Date(year, month, day));
      day++;
    }
    setWeekDays(weekDays);
  }, [time]);

  const updateDate = (option) => {
    let prevTime = time;
    let daysMove;
    if (option === "left") {
      daysMove = -7;
    } else {
      daysMove = 7;
    }
    const now = new Date(
      prevTime.year,
      prevTime.month,
      prevTime.day + daysMove
    );
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    const updatedTime = {
      day,
      month,
      year,
      daysInMonth,
      daysInPreviousMonth,
    };
    console.log(updatedTime);
    dispatch(setItem({ type: "time", data: updatedTime }));
  };

  const handleTaskForm = (id, weekDay) => {
    const columnElementLength =
      document.querySelector(`#column2`).offsetLeft -
      document.querySelector(`#column1`).offsetLeft;
    const columnElement = document.querySelector(`#column${id}`);

    let position = {
      top: columnElement.offsetHeight / 2 - 595 / 2,
    };
    if (id < 4) {
      position.left = columnElement.offsetLeft + columnElementLength + 10;
      setFormDirection(false);
    } else {
      position.left = columnElement.offsetLeft - 576 - 10;
      setFormDirection(true);
    }
    setTaskFormPosition(position);
    setSelectedDay(weekDay);
    setShowTaskForm(true);
  };

  return (
    <Wrapper>
      <Nav>
        <Button onClick={() => updateDate("left")} round>
          <i className="fas fa-angle-left"></i>
        </Button>
        <NavDay>
          {monthNames[time.month]} {time.year}
        </NavDay>
        <Button onClick={() => updateDate("right")} round>
          <i className="fas fa-angle-right"></i>
        </Button>
      </Nav>
      <InnerWrapper>
        {transitions(
          (styles, item) =>
            item && (
              <TaskFormWrapper
                taskFormPosition={taskFormPosition}
                formDirection={formDirection}
                id="taskForm1"
                style={styles}
              >
                <LeftMark formDirection={formDirection}>
                  <i className="fas fa-angle-left"></i>
                </LeftMark>
                <TaskForm selectedDay={selectedDay} />
                <RightMark formDirection={formDirection}>
                  <i className="fas fa-angle-right"></i>
                </RightMark>
                <CloseMark onClick={() => setShowTaskForm(false)}>
                  <i className="fas fa-times"></i>
                </CloseMark>
              </TaskFormWrapper>
            )
        )}
        {weekDays.map((weekDay, index) => {
          return (
            <Column key={weekDay.getTime()}>
              <Day>
                <DayName>{dayNames[weekDay.getDay()]}</DayName>
                <DayNumber>{weekDay.getDate()}</DayNumber>
              </Day>
              <InnerColumn
                onClick={() => handleTaskForm(index, weekDay)}
                id={"column" + index}
              >
                {tasks &&
                  tasks.map((task) => {
                    const taskDateStart = new Date(task.time_start);
                    const taskDateEnd = new Date(task.time_end);
                    let taskDateSanitized = new Date(
                      taskDateStart.getFullYear(),
                      taskDateStart.getMonth(),
                      taskDateStart.getDate()
                    );
                    if (taskDateSanitized.getTime() === weekDay.getTime())
                      return (
                        <Note
                          key={task._id}
                          id={task._id}
                          title={task.title}
                          time_start={taskDateStart}
                          time_end={taskDateEnd}
                          note={task.note}
                          steps={task.steps}
                          users={task.users}
                        />
                      );
                  })}
              </InnerColumn>
            </Column>
          );
        })}
      </InnerWrapper>
      <Feedback
        onClick={() =>
          dispatch(
            resetStatus({
              statusType: "addStatus",
              errorType: "addError",
            })
          )
        }
        message={addError ? addError : addResponse}
        activate={
          addStatus === "succeeded" || addStatus === "failed" ? true : false
        }
      />
    </Wrapper>
  );
};

export default Calendar;
