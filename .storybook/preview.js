import React from "react";
import GlobalStyle from "../src/utils/globalStyles";
import { BrowserRouter } from "react-router-dom";

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <GlobalStyle />
      <Story />
    </BrowserRouter>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
