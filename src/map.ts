import 'styled-components';
import {defaults} from './defaults';
import {createMap} from './createMap';
import {ThemedBreakpointName} from './types';

export const map = createMap<ThemedBreakpointName>(
  theme => (theme as any).breakpoints || defaults,
);
