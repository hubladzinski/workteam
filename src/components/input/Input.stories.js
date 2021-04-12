import React from "react";
import { theme } from "../../utils/theme";

import Input from "./Input";

export default {
  title: "Components/Input",
  component: Input,
  parameters: {
    backgrounds: {
      values: [{ name: "dark", value: theme.background }],
    },
  },
};

export const Primary = () => <Input />;
