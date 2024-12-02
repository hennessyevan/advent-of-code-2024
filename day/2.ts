import { expect } from 'bun:test'
import { loadInput } from '../utils'

const TEST_INPUT = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`
const TEST_TARGET = 2

const DEBUG = true

const debug = (...args: any[]) => DEBUG && console.log(...args)

function solve1(input: string, { tolerance }: { tolerance?: number } = {}) {
  let safeReports = 0

  const rows = input
    .trim()
    .split('\n')
    .map((row) => row.split(' ').map(Number))

  for (let rowI = 0; rowI < rows.length; rowI++) {
    let direction: 'increasing' | 'decreasing' | undefined

    function runRow(row: number[]) {
      let safe = false
      row: for (let numI = 0; numI < row.length; numI++) {
        const num = row[numI]

        const isFirst = numI === 0
        const isLast = numI === row.length - 1
        const nextNum = row.at(numI + 1)

        if (isFirst) {
          if (nextNum! > num) {
            debug(`${row.join(' ')} is increasing`)
            direction = 'increasing'
          } else {
            debug(`${row.join(' ')} is decreasing`)
            direction = 'decreasing'
          }
        }

        if (direction === 'increasing') {
          if (nextNum! < num) {
            debug(
              `should be increasing but ${nextNum} is less than ${num}: ${row.join(
                ' '
              )}`
            )
            break row
          }
        }

        if (direction === 'decreasing') {
          if (nextNum! > num) {
            debug(
              `should be decreasing but ${nextNum} is greater than ${num}: ${row.join(
                ' '
              )}`
            )
            break row
          }
        }

        if (isLast) {
          debug(`**safe**: ${row.join(' ')}\n`)
          safeReports++
          safe = true
          break row
        }

        if (
          Math.abs(nextNum! - num) > 3 ||
          Math.abs(nextNum! - num) < 1 ||
          num === nextNum
        ) {
          debug(`**unsafe**: ${row.join(' ')}\n`)
          break row
        }
      }

      return safe
    }

    const safe = runRow(rows[rowI])

    if (tolerance && !safe) {
      toleranceCheck: for (let numI = 0; numI < rows[rowI].length; numI++) {
        const newRow = rows[rowI].toSpliced(numI, 1)
        debug(`trying with ${newRow.join(' ')} \n`)

        const safe = runRow(newRow)

        if (safe) break toleranceCheck
      }
    }
  }

  return safeReports
}

const input = await loadInput(2)
const test = () => expect(solve1(TEST_INPUT)).toBe(TEST_TARGET)
const s1 = () => console.log(solve1(input))

// test()
// s1()

const solve2 = () => console.log(solve1(input, { tolerance: 1 }))

solve2()
