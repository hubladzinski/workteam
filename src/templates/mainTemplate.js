import React from "react";
import styled from "styled-components";
import Sidebar from "../components/sidebar/Sidebar";

const MainTemplate = ({ children }) => {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
};

export default MainTemplate;
