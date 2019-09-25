import * as React from 'react';
import styled from 'styled-components';
import {gte, between} from '../../src';

const Square = styled.div`
  display: flex;
  width: 256px;
  height: 256px;
  margin: auto;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  ${gte('mobile')`
    background-color: deepskyblue;
    :after {display: inline-block; content: "📱";}
  `}
  ${gte('tablet')`
    background-color: orangered;
    :after {display: inline-block; content: "💻";}
  `}
  ${gte('desktop')`
    background-color: deeppink;
    :after {display: inline-block; content: "🖥";}
  `}
`;

export const App: React.FC = () => {
  return <Square />;
};
