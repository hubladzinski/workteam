import React from "react";
import styled from "styled-components";
import Calendar from "./Calendar";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.font1};
  padding: 50px;
`;

const Card = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  padding: 50px;
  border-radius: 5px;
`;

export default {
  title: "Components/Calendar",
  component: Calendar,
};

export const Primary = () => (
  <Wrapper>
    <h2>Schedule</h2>
    <Card>
      <Calendar />
    </Card>
  </Wrapper>
);
