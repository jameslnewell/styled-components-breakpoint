import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const Heading = styled.h1`

  color: #444;
  font-family: sans-serif;
  
  font-size: 12px;
  
  ${({theme}) => breakpoint('sm', theme.breakpoints)`
    font-size: 14px;
  `}
  
  ${({theme}) => breakpoint('md', theme.breakpoints)`
    font-size: 16px;
  `}
  
  ${({theme}) => breakpoint('lg', theme.breakpoints)`
    font-size: 24px;
  `}
  
`;

export default Heading;
