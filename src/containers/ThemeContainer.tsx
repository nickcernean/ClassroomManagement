import React, { ReactNode } from "react";

import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  Theme,
  StyledEngineProvider
} from "@mui/material";


import { lightTheme } from "@/theme/themes";

type ThemeContainerProps = {
  theme?: Theme;
  children: ReactNode;
};

const ThemeContainer: React.FC<ThemeContainerProps> = (props) => {
  return (
    <StyledEngineProvider injectFirst>
    <MuiThemeProvider theme={props.theme ?? lightTheme}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  </StyledEngineProvider>
  );
};

export { ThemeContainer };