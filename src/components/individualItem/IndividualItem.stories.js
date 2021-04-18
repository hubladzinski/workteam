import React from "react";
import { theme } from "../../utils/theme";

import IndividualItem from "./IndividualItem";

export default {
  title: "Components/IndividualItem",
  component: IndividualItem,
  parameters: {
    backgrounds: {
      values: [{ name: "dark", value: theme.font1 }],
    },
  },
};

export const Primary = () => <IndividualItem />;
