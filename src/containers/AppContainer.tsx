import React from "react";
import { ThemeContainer } from "./ThemeContainer";


const AppContainer: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
      <ThemeContainer>{props.children}</ThemeContainer>
  );
};

export default AppContainer;
