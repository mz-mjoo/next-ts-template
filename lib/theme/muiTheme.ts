import {createTheme} from '@mui/material';
import {red} from '@mui/material/colors';
import {themeSizeValues} from '.';
// breakpoints의 value를 추가해줘서 새롭게 정의
declare module '@mui/material' {
  interface BreakpointOverrides {
    xxl: true;
    mobile: true;
    tablet: true;
    desktop: true;
  }
}

const muiTheme = createTheme({
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
  },
  breakpoints: {
    values: themeSizeValues,
  },
});

export default muiTheme;
