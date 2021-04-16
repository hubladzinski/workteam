import React from "react";
import { theme } from "../../utils/theme";

import InventoryItem from "./InventoryItem";

export default {
  title: "Components/InputMain",
  component: InventoryItem,
  parameters: {
    backgrounds: {
      values: [{ name: "dark", value: theme.font1 }],
    },
  },
};

export const Primary = () => <InventoryItem />;
