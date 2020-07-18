export const getRandNum = (min: number, max: number) =>
  min + Math.floor((max - min + 1) * Math.random())
