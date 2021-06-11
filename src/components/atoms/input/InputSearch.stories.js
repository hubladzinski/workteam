import React from "react";
import { theme } from "../../../utils/theme";

import InputSearch from "./InputSearch";

export default {
  title: "Components/InputMain",
  component: InputSearch,
  parameters: {
    backgrounds: {
      values: [{ name: "dark", value: theme.font1 }],
    },
  },
};

export const Primary = () => <InputSearch />;
