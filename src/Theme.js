import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import {responsiveFontSizes} from "@mui/material";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
