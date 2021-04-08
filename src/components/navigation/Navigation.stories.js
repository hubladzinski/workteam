import React from "react";
import { colors } from "../../utils/styles";

import Navigation from "./Navigation";

export default {
  title: "Components/Navigation",
  component: Navigation,
  parameters: {
    backgrounds: {
      values: [{ name: "dark", value: colors.background }],
    },
  },
};

export const Primary = () => <Navigation />;
