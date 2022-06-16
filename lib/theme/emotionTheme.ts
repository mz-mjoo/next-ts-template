import {Theme} from '@emotion/react';
import {themeSizeValues} from '.';
import muiTheme from './muiTheme';
// Theme은 빈 오브젝트이므로 새롭게 정의
declare module '@emotion/react' {
  export interface Theme {
    breakpoints: {
      values: typeof themeSizeValues;
      up: (key: keyof typeof themeSizeValues) => string;
      down: (key: keyof typeof themeSizeValues) => string;
    };
  }
}

const emotionTheme: Theme = {
  breakpoints: {
    values: themeSizeValues,
    up(key: keyof typeof themeSizeValues) {
      return muiTheme.breakpoints.up(key);
    },
    down(key: keyof typeof themeSizeValues) {
      return muiTheme.breakpoints.down(key);
    },
  },
};

export default emotionTheme;
