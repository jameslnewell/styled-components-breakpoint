import * as React from 'react';
import styled from 'styled-components';
import {breakpoint, map} from '../../src';

const square = `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 256px;
  height: 256px;
  margin: auto;
  font-size: 48px;
  :after {
    display: inline-block;
  }
`;

const Breakpoint = styled.div`
  ${square}
  ${breakpoint('mobile')`
    background-color: deepskyblue;
    :after {content: "📱";}
  `}
  ${breakpoint('tablet')`
    background-color: orangered;
    :after {content: "💻";}
  `}
  ${breakpoint('desktop')`
    background-color: deeppink;
    :after {content: "🖥";}
  `}
`;

const Map = styled.div`
  ${square}
  background-color: deepskyblue;
  ${map(
    {mobile: '📱', tablet: '💻', desktop: '🖥'},
    value => `:after {content "${value}";}`,
  )}
  ${map(
    {mobile: 'deepskyblue', tablet: 'orangered', desktop: 'deeppink'},
    value => `background-color: ${value};`,
  )}
`;

const PartialMap = styled.div`
  ${square}
  background-color: deepskyblue;
  ${map(
    {mobile: 'red', desktop: 'green'},
    value => `background-color: ${value};`,
  )}
`;

const UnOrderedMap = styled.div`
  ${square}
  background-color: deepskyblue;
  ${map(
    {desktop: 'green', mobile: 'red'},
    value => `background-color: ${value};`,
  )}
`;

export const App: React.FC = () => {
  return (
    <>
      <Breakpoint />
      <Map />
      <PartialMap />
      <UnOrderedMap />
    </>
  );
};
