import styled from "styled-components";
import MainTemplate from "../templates/MainTemplate";
import Card from "../components/card/Card";
import Calendar from "../components/calendar/Calendar";

const Header = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily2};
  font-weight: 700;
  font-size: 32px;
`;

const Schedule = () => (
  <MainTemplate>
    <Header>Schedule</Header>
    <Card>
      <Calendar />
    </Card>
  </MainTemplate>
);

export default Schedule;
