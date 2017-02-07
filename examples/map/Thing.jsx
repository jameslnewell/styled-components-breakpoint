import styled from 'styled-components';
import {map} from 'styled-components-breakpoint';

const Thing = styled.div`
  ${({width, theme}) => map(width, w => `width: ${Math.round(w * 100)}%;`)}
`;


export default Thing;
