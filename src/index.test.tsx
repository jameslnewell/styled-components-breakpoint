test('foo', () => {});
// import 'jest-styled-components';
// import * as React from 'react';
// import styled from 'styled-components';
// import {render} from '@testing-library/react';
// import {gte} from '.';

// // const customBreakpoints = {
// //   xs: 320,
// //   md: 960,
// //   xl: 2880,
// // };

// describe('gte()', () => {

//   const GreaterThanOrEqualExample = styled.p`

//     ${gte('mobile')`
//       font-size: 12px;
//     `}

//     ${gte('tablet')`
//       font-size: 16px;
//     `}

//     ${gte('desktop')`
//       font-size: 24px;
//     `}

//   `;

//   it('should render styles at each breakpoint', () => {
//     const {container} = render(<GreaterThanOrEqualExample/>);
//     expect(container.firstChild).toHaveStyleRule('font-size', '12px');
//     expect(container.firstChild).toHaveStyleRule('font-size', '16px', {
//       media: '(min-width:46.0625em)',
//     });
//     expect(container.firstChild).toHaveStyleRule('font-size', '24px', {
//       media: '(min-width:64.0625)',
//     });
//   });

// });

// // describe('breakpoint()', () => {

// //   const DefaultThing = styled.h1`

// //     ${breakpoint('mobile')`
// //       font-size: 12px;
// //     `}

// //     ${breakpoint('tablet')`
// //       font-size: 16px;
// //     `}

// //     ${breakpoint('desktop')`
// //       font-size: 24px;
// //     `}

// //   `;

// //   const CustomThing = styled.h1`

// //     ${breakpoint('xs')`
// //       font-size: 12px;
// //     `}

// //     ${breakpoint('md')`
// //       font-size: 16px;
// //     `}

// //     ${breakpoint('xl')`
// //       font-size: 24px;
// //     `}

// //   `;

// //   it('should have styles defined for each default breakpoint', () => {
// //     const element = shallow(<DefaultThing />);
// //     expect(element).toHaveStyleRule('font-size', '12px');
// //     expect(element).toHaveStyleRule('font-size', '16px', {
// //       media: '(min-width:46.0625em)',
// //     });
// //     expect(element).toHaveStyleRule('font-size', '24px', {
// //       media: '(min-width:64.0625em)',
// //     });
// //   });

// //   it('should have styles defined for each custom breakpoint', () => {
// //     const element = shallow(
// //       <CustomThing theme={{breakpoints: customBreakpoints}} />,
// //     );
// //     expect(element).toHaveStyleRule('font-size', '12px', {
// //       media: '(min-width:20em)',
// //     });
// //     expect(element).toHaveStyleRule('font-size', '16px', {
// //       media: '(min-width:60em)',
// //     });
// //     expect(element).toHaveStyleRule('font-size', '24px', {
// //       media: '(min-width:180em)',
// //     });
// //   });

// //   // https://github.com/jameslnewell/styled-components-breakpoint/issues/11
// //   it('should render multiple expressions correctly #11', () => {
// //     const Thing = styled.div`
// //       ${breakpoint('tablet')`
// //         background: ${'grey'};
// //         color: ${'white'};
// //       `}
// //     `;
// //     const element = shallow(<Thing />);
// //     expect(element).toHaveStyleRule('background', 'grey', {
// //       media: '(min-width:46.0625em)',
// //     });
// //     expect(element).toHaveStyleRule('color', 'white', {
// //       media: '(min-width:46.0625em)',
// //     });
// //   });
// // });

// // describe('map()', () => {
// //   const Thing = styled.h1`
// //     ${({size}) => map(size, val => `width: ${val * 100}%;`)}
// //   `;

// //   it('should have styles defined for each default breakpoint', () => {
// //     const element = shallow(
// //       <Thing size={{mobile: 1, tablet: 1 / 2, desktop: 1 / 4}} />,
// //     );
// //     expect(element).toHaveStyleRule('width', '100%');
// //     expect(element).toHaveStyleRule('width', '50%', {
// //       media: '(min-width:46.0625em)',
// //     });
// //     expect(element).toHaveStyleRule('width', '25%', {
// //       media: '(min-width:64.0625em)',
// //     });
// //   });

// //   it('should have styles defined for each custom breakpoint', () => {
// //     const element = shallow(
// //       <Thing
// //         theme={{breakpoints: customBreakpoints}}
// //         size={{xs: 1, md: 1 / 2, xl: 1 / 4}}
// //       />,
// //     );
// //     expect(element).toHaveStyleRule('width', '100%', {
// //       media: '(min-width:20em)',
// //     });
// //     expect(element).toHaveStyleRule('width', '50%', {
// //       media: '(min-width:60em)',
// //     });
// //     expect(element).toHaveStyleRule('width', '25%', {
// //       media: '(min-width:180em)',
// //     });
// //   });
// // });
