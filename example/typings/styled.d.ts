import {DefaultTheme} from 'styled-components';

declare module 'styled-components' {
  interface DefaultTheme {
    breakpoints:
      | {
          [name in 'mobile' | 'tablet' | 'desktop']: number;
        }
      | {
          [name in 'xs' | 'sm' | 'md' | 'lg' | 'xl']: number;
        };
  }
}
