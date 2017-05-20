import styled from 'styled-components';
import {map} from 'styled-components-breakpoint';

const Thing = styled.div`
  ${({width}) => map(width, (value = 1) => `width: ${Math.round(value * 100)}%;`)}
`;


export default Thing;
