import React from "react";
import { theme } from "../../../utils/theme";

import Navigation from "./Navigation";

export default {
  title: "Components/Navigation",
  component: Navigation,
  parameters: {
    backgrounds: {
      values: [{ name: "dark", value: theme.background }],
    },
  },
};

export const Primary = () => <Navigation />;
