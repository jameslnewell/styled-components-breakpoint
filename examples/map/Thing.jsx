import styled from 'styled-components';
import { map } from 'styled-components-breakpoint';
debugger;
const Thing = styled.div`
  ${({ width }) => console.log('width', width) || map(width, (value = 1) => `width: ${Math.round(value * 100)}%;`)}
`;


export default Thing;
