import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { resetStatus, setItem } from "../reducers/calendarSlice";
import MainTemplate from "../templates/mainTemplate/MainTemplate";
import Card from "../components/atoms/card/Card";
import Calendar from "../templates/calendar/Calendar";
import SelectPeopleInline from "../components/molecules/select/SelectPeopleInline";
import Feedback from "../components/atoms/feedback/Feedback";
import Loader from "../components/atoms/loader/Loader";

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
  const { status, addStatus, addError, addResponse } = useSelector(
    (state) => state.calendar
  );
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
      {(status === "loading" || addStatus === "loading") && <Loader />}
    </MainTemplate>
  );
};

export default Schedule;
