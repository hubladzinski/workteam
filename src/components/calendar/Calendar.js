import styled from "styled-components";
import Button from "../button/Button";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Note from "../note/Note";

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
`;

const Calendar = () => {
  const [time, setTime] = useState(() => {
    const now = new Date();
    const day = now.getDate();
    const dayOfWeek = now.getDay();
    const month = now.getMonth();
    const year = now.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, month - 1, 0).getDate();

    const initialTime = {
      now,
      day,
      dayOfWeek,
      month,
      year,
      daysInMonth,
      daysInPreviousMonth,
    };
    return initialTime;
  });
  const [weekDays, setWeekDays] = useState([]);
  const { tasks } = useSelector((state) => state.root);

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
    const weekDays = [];
    let day = time.day - time.dayOfWeek + 1;
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
        day = time.daysInPreviousMonth;
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
    setTime((prevTime) => {
      let daysMove;
      if (option === "left") {
        daysMove = -7;
      } else {
        daysMove = 7;
      }
      const now = new Date(
        prevTime.now.getFullYear(),
        prevTime.now.getMonth(),
        prevTime.now.getDate() + daysMove
      );
      const day = now.getDate();
      const dayOfWeek = now.getDay();
      const month = now.getMonth();
      const year = now.getFullYear();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysInPreviousMonth = new Date(year, month - 1, 0).getDate();

      const updatedTime = {
        now,
        day,
        dayOfWeek,
        month,
        year,
        daysInMonth,
        daysInPreviousMonth,
      };

      return updatedTime;
    });
  };

  return (
    <Wrapper>
      <Nav>
        <Button onClick={() => updateDate("left")} round>
          <i class="fas fa-angle-left"></i>
        </Button>
        <NavDay>
          {monthNames[time.month]} {time.year}
        </NavDay>
        <Button onClick={() => updateDate("right")} round>
          <i class="fas fa-angle-right"></i>
        </Button>
      </Nav>
      <InnerWrapper>
        {weekDays.map((weekDay) => {
          return (
            <Column>
              <Day>
                <DayName>{dayNames[weekDay.getDay()]}</DayName>
                <DayNumber>{weekDay.getDate()}</DayNumber>
              </Day>
              <InnerColumn>
                {tasks.map((task) => {
                  let taskDateSanitized = new Date(
                    task.date_start.getFullYear(),
                    task.date_start.getMonth(),
                    task.date_start.getDay()
                  );
                  if (taskDateSanitized.getTime() === weekDay.getTime())
                    return (
                      <Note
                        id={task.id}
                        title={task.title}
                        time={`${task.date_start.getHours()}:${task.date_start.getMinutes()} - ${task.date_end.getHours()}:${task.date_end.getMinutes()}`}
                      />
                    );
                })}
              </InnerColumn>
            </Column>
          );
        })}
      </InnerWrapper>
    </Wrapper>
  );
};

export default Calendar;
