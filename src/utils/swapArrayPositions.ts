export function swap<T>(arr: T[], i: number, j: number): T[] {
  const arrCopy = [...arr]
  const tmp = arrCopy[i]
  arrCopy[i] = arrCopy[j]
  arrCopy[j] = tmp
  return arrCopy
}
