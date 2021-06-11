import React from "react";
import Calendar from "./Calendar";
import Card from "../../components/atoms/card/Card";

export default {
  title: "Components/Calendar",
  component: Calendar,
};

export const Primary = () => (
  <Card>
    <Calendar />
  </Card>
);
