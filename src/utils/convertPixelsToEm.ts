export function convertPixelsToEm(pixels: number): number {
  // @media is always calculated off 16px regardless of whether the root font size is the default or not
  return pixels / 16;
}
