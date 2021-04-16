import React from "react";
import { theme } from "../../utils/theme";

import InputMain from "./InputMain";

export default {
  title: "Components/InputMain",
  component: InputMain,
  parameters: {
    backgrounds: {
      values: [{ name: "dark", value: theme.font1 }],
    },
  },
};

export const Primary = () => <InputMain />;
