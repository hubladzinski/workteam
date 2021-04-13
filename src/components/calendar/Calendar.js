import styled from "styled-components";

const Wrapper = styled.ul`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
  border-top: 1px solid ${({ theme }) => theme.border2};
  border-bottom: 1px solid ${({ theme }) => theme.border2};
  border-left: 1px solid ${({ theme }) => theme.border2};
  list-style: none;
`;

const Column = styled.li`
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

const Calendar = () => {
  return (
    <Wrapper>
      <Column>
        <Day>
          <DayName>Pon</DayName>
          <DayNumber>21</DayNumber>
        </Day>
        <div></div>
      </Column>
      <Column>
        <Day>
          <DayName>Pon</DayName>
          <DayNumber>21</DayNumber>
        </Day>
        <div></div>
      </Column>
      <Column>
        <Day>
          <DayName>Pon</DayName>
          <DayNumber>21</DayNumber>
        </Day>
        <div></div>
      </Column>
      <Column>
        <Day>
          <DayName>Pon</DayName>
          <DayNumber>21</DayNumber>
        </Day>
        <div></div>
      </Column>
      <Column>
        <Day>
          <DayName>Pon</DayName>
          <DayNumber>21</DayNumber>
        </Day>
        <div></div>
      </Column>
      <Column>
        <Day>
          <DayName>Pon</DayName>
          <DayNumber>21</DayNumber>
        </Day>
        <div></div>
      </Column>
      <Column>
        <Day>
          <DayName>Pon</DayName>
          <DayNumber>21</DayNumber>
        </Day>
        <div></div>
      </Column>
    </Wrapper>
  );
};

export default Calendar;
