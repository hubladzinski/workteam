import React from "react";
import { colors } from "../../utils/styles";

import Input from "./Input";

export default {
  title: "Components/Input",
  component: Input,
  parameters: {
    backgrounds: {
      values: [{ name: "dark", value: colors.background }],
    },
  },
};

export const Primary = () => <Input />;
