import { expect } from 'bun:test'
import { loadInput } from '../utils'

const TEST_INPUT = `
3   4
4   3
2   5
1   3
3   9
3   3
`
const TEST_TARGET = 11

function solve1(input: string) {
  let columns: [number[], number[]] = [[], []]
  input
    .trim()
    .split('\n')
    .map((line) => line.split('   ').map(Number) as [number, number])
    .forEach((row) => {
      columns[0].push(row[0])
      columns[1].push(row[1])
    })

  columns[0].sort()
  columns[1].sort()

  let aggregatedDistance = 0

  columns[0].forEach((num, i) => {
    const col2Num = columns[1][i]
    const distance = Math.abs(num - col2Num)
    aggregatedDistance += distance
  })

  return aggregatedDistance
}

const input = await loadInput(1)
const test = () => expect(solve1(TEST_INPUT)).toBe(TEST_TARGET)
const s1 = async () => {
  console.log(solve1(input))
}

function solve2() {
  let columns: [number[], number[]] = [[], []]

  input
    .trim()
    .split('\n')
    .map((line) => line.split('   ').map(Number) as [number, number])
    .forEach((row) => {
      columns[0].push(row[0])
      columns[1].push(row[1])
    })

  columns[0].sort()
  columns[1].sort()

  const rightColMap = new Map<number, number>()

  for (const num of columns[1]) {
    if (rightColMap.has(num)) {
      rightColMap.set(num, rightColMap.get(num)! + 1)
      continue
    }

    rightColMap.set(num, 1)
  }

  let similarityScore = 0
  for (const num of columns[0]) {
    if (!rightColMap.has(num)) continue

    similarityScore += rightColMap.get(num)! * num
  }

  console.log(similarityScore)
}

solve2()
