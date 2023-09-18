import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        color: 'black',
      },
    },
  },
  colors: {
    black: '#0c1012',
    gray: {
      '50': '#f9fafa',
      '100': '#f1f1f2',
      '200': '#e6e8e8',
      '300': '#d2d4d5',
      '400': '#a9adaf',
      '500': '#7a8082',
      '600': '#4e5659',
      '700': '#2f383c',
      '800': '#1a2124',
      '900': '#141a1d',
    },
    purple: {
      '50': '#f8f6fa',
      '100': '#e2dcea',
      '200': '#cdc3da',
      '300': '#af9fc4',
      '400': '#9b86b4',
      '500': '#8066a1',
      '600': '#6f5194',
      '700': '#5e3d87',
      '800': '#502c7d',
      '900': '#3e1670',
    },
    yellow: {
      '50': '#fefefd',
      '100': '#f9f9f5',
      '200': '#eeede3',
      '300': '#e1e0ce',
      '400': '#cfcdb1',
      '500': '#adaa79',
      '600': '#8c8945',
      '700': '#706b16',
      '800': '#545008',
      '900': '#454207',
    },
    cyan: {
      '50': '#f8fafb',
      '100': '#e1ebec',
      '200': '#d3e2e4',
      '300': '#c4d8db',
      '400': '#98bbc0',
      '500': '#83adb3',
      '600': '#6c9ea4',
      '700': '#46858d',
      '800': '#256f78',
      '900': '#095661',
    },
    primary: {
      '50': '#f5f8f9',
      '100': '#d7e2e6',
      '200': '#b5c9d1',
      '300': '#8babb8',
      '400': '#749aa9',
      '500': '#558396',
      '600': '#3a7086',
      '700': '#1d5b74',
      '800': '#0a4d68',
      '900': '#07384b',
    },
  },
});

export default theme;
