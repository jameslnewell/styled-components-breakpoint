// @media is always calculated off 16px regardless of whether the root font size is the default or not
export const convertPxToEm = (pixels: number): number => pixels / 16;
