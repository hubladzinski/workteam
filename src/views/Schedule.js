import styled from "styled-components";
import MainTemplate from "../templates/MainTemplate";
import Card from "../components/card/Card";
import Calendar from "../components/calendar/Calendar";
import SelectPeopleInline from "../components/select/SelectPeopleInline";
import { useDispatch } from "react-redux";
import { setItem } from "../reducers/calendarSlice";
import Button from "../components/button/Button";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.h2`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fontFamily2};
  font-weight: 700;
  font-size: 32px;
`;

const Schedule = () => {
  const dispatch = useDispatch();

  const handleCallback = (selectedPeople) => {
    dispatch(setItem({ type: "searchCalendar", data: selectedPeople }));
  };

  return (
    <MainTemplate>
      <HeaderWrapper>
        <Header>Schedule</Header>
        <SelectPeopleInline handleCallback={handleCallback} />
      </HeaderWrapper>
      <Card>
        <Calendar />
      </Card>
    </MainTemplate>
  );
};

export default Schedule;
