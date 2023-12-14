import { createTheme, } from "@mui/material/styles";


export const lightTheme = createTheme({
  palette: {
    mode: "light",
     primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff'
     },
     secondary: {
        light: '#ffcf00',
        main: '#017fb0',
        dark: '#201D48',
        contrastText: '#fff'
     },
     
     
  },
});