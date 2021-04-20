import styled from "styled-components";
import MainTemplate from "../templates/MainTemplate";
import Card from "../components/card/Card";
import IndividualItem from "../components/individualItem/IndividualItem";
import InputMain from "../components/input/InputMain";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily2};
  font-weight: 700;
  font-size: 32px;
`;

const IndividualsWrapper = styled.div`
  display: grid;
  grid-gap: 35px;
`;

const Schedule = () => (
  <MainTemplate>
    <HeaderWrapper>
      <Header>Workers/Teams</Header>
      <InputMain />
    </HeaderWrapper>
    <Card>
      <IndividualsWrapper>
        <IndividualItem />
        <IndividualItem />
        <IndividualItem />
        <IndividualItem />
        <IndividualItem />
      </IndividualsWrapper>
    </Card>
  </MainTemplate>
);

export default Schedule;
