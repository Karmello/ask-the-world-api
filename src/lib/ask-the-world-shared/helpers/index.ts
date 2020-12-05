export const getRandNum = (min: number, max: number) =>
  min + Math.floor((max - min + 1) * Math.random())

export const getRandNums = (min: number, max: number, length: number = max - min + 1) => {
  const result = []
  const pool = []
  for (let i = min; i <= max; i++) pool.push(i)
  for (let i = 0; i < length; i++) {
    const rIndex = getRandNum(0, pool.length - 1)
    const rNum = pool[parseInt(rIndex.toString())]
    result.push(rNum)
    pool.splice(rIndex, 1)
  }
  return result
}
