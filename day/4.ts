import { expect } from 'bun:test'
import { loadInput } from '../utils'

const TEST_INPUT = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`
const TEST_TARGET = 18

const DEBUG = false

const debug = (...args: any[]) => DEBUG && console.log(...args)

const matchLog = {
  right: 0,
  left: 0,
  up: 0,
  down: 0,
  downright: 0,
  downleft: 0,
  upright: 0,
  upleft: 0,
}

const testmatchLog = {
  right: 3,
  left: 2,
  up: 2,
  down: 1,
  downright: 1,
  downleft: 1,
  upright: 3,
  upleft: 4,
}

type Matrix = string[][]
type Coord = [row: number, col: number]
class XMASWordSearch {
  #matrix: Matrix
  #coord: Coord = [0, 0]
  #matches = 0

  constructor(input: string) {
    this.#matrix = this.#convertToMatrix(input)
  }

  #convertToMatrix(input: string): Matrix {
    const rows = input.trim().split('\n')
    const matrix = rows.map((row) => row.split(''))

    return matrix
  }

  #isValidStartingLetter(letter: string): letter is 'X' {
    return letter === 'X'
  }

  #setupCheck(): {
    ok: boolean
    rowIndex: number
    colIndex: number
    startingLetter: string
  } {
    const [rowIndex, colIndex] = this.#coord
    const startingLetter = this.#matrix[rowIndex][colIndex]
    const validStartingLetter = this.#isValidStartingLetter(startingLetter)

    return {
      ok: validStartingLetter,
      rowIndex,
      colIndex,
      startingLetter,
    }
  }

  #searchRight(): boolean {
    const { rowIndex, colIndex, ok } = this.#setupCheck()
    if (!ok) return false

    if (!this.#matrix[rowIndex][colIndex + 3]) return false

    const word = Array.from({ length: 4 }).map(
      (_, i) => this.#matrix[rowIndex][colIndex + i]
    )

    if (word.join('') !== 'XMAS') return false
    matchLog.right++
    return true
  }

  #searchLeft(): boolean {
    const { rowIndex, colIndex, ok } = this.#setupCheck()
    if (!ok) return false

    if (!this.#matrix[rowIndex][colIndex - 3]) return false

    const word = Array.from({ length: 4 }).map(
      (_, i) => this.#matrix[rowIndex][colIndex - i]
    )

    if (word.join('') !== 'XMAS') return false
    matchLog.left++
    return true
  }

  #searchUp() {
    const { rowIndex, colIndex, ok } = this.#setupCheck()
    if (!ok) return false

    if (!this.#matrix[rowIndex - 3]?.[colIndex]) return false

    const word = Array.from({ length: 4 }).map(
      (_, i) => this.#matrix[rowIndex - i][colIndex]
    )

    if (word.join('') !== 'XMAS') return false
    matchLog.up++
    return true
  }

  #searchDown() {
    const { rowIndex, colIndex, ok } = this.#setupCheck()
    if (!ok) return false

    if (!this.#matrix[rowIndex + 3]?.[colIndex]) return false

    const word = Array.from({ length: 4 }).map(
      (_, i) => this.#matrix[rowIndex + i][colIndex]
    )

    if (word.join('') !== 'XMAS') return false
    matchLog.down++
    return true
  }

  #searchDiagonalDownRight(): boolean {
    const { rowIndex, colIndex, ok } = this.#setupCheck()
    if (!ok) return false

    if (!this.#matrix[rowIndex + 3]?.[colIndex + 3]) return false

    const word = Array.from({ length: 4 }).map(
      (_, i) => this.#matrix[rowIndex + i][colIndex + i]!
    )

    if (word.join('') !== 'XMAS') return false
    matchLog.downright++
    return true
  }

  #searchDiagonalDownLeft(): boolean {
    const { rowIndex, colIndex, ok } = this.#setupCheck()
    if (!ok) return false

    if (!this.#matrix[rowIndex + 3]?.[colIndex - 3]) return false

    const word = Array.from({ length: 4 }).map(
      (_, i) => this.#matrix[rowIndex + i][colIndex - i]
    )

    if (word.join('') !== 'XMAS') return false
    matchLog.downleft++
    return true
  }

  #searchDiagonalUpRight(): boolean {
    const { rowIndex, colIndex, ok } = this.#setupCheck()
    if (!ok) return false

    if (!this.#matrix[rowIndex - 3]?.[colIndex + 3]) return false

    const word = Array.from({ length: 4 }).map(
      (_, i) => this.#matrix[rowIndex - i][colIndex + i]
    )

    if (word.join('') !== 'XMAS') return false
    matchLog.upright++
    return true
  }

  #searchDiagonalUpLeft(): boolean {
    const { rowIndex, colIndex, ok } = this.#setupCheck()
    if (!ok) return false

    if (!this.#matrix[rowIndex - 3]?.[colIndex - 3]) return false

    const word = Array.from({ length: 4 }).map(
      (_, i) => this.#matrix[rowIndex - i][colIndex - i]
    )

    if (word.join('') !== 'XMAS') return false
    matchLog.upleft++
    return true
  }

  run() {
    for (const [rowIndex, row] of this.#matrix.entries()) {
      for (const [colIndex] of row.entries()) {
        this.#coord = [rowIndex, colIndex]

        for (const match of [
          this.#searchRight(),
          this.#searchLeft(),
          this.#searchUp(),
          this.#searchDown(),
          this.#searchDiagonalDownRight(),
          this.#searchDiagonalDownLeft(),
          this.#searchDiagonalUpRight(),
          this.#searchDiagonalUpLeft(),
        ]) {
          try {
            if (match) this.#matches++
          } catch {
            continue
          }
        }
      }
    }

    return this.#matches
  }
}

function solve1(input: string) {
  const matches = new XMASWordSearch(input).run()

  debug({ matches, matchLog })

  return matches
}

const input = await loadInput(4)
const test = () => expect(solve1(TEST_INPUT)).toBe(TEST_TARGET)
const s1 = () => console.log(solve1(input))

// test()
// s1()

class X_MASWordSearch {
  #matrix: Matrix
  #coord: Coord = [0, 0]
  #matches = 0

  constructor(input: string) {
    this.#matrix = this.#convertToMatrix(input)
  }

  #convertToMatrix(input: string): Matrix {
    const rows = input.trim().split('\n')
    const matrix = rows.map((row) => row.split(''))

    return matrix
  }

  #isValidStartingLetter(letter: string): letter is 'A' {
    return letter === 'A'
  }

  #setupCheck(): {
    ok: boolean
    rowIndex: number
    colIndex: number
    startingLetter: string
  } {
    const [rowIndex, colIndex] = this.#coord
    const startingLetter = this.#matrix[rowIndex][colIndex]
    const validStartingLetter = this.#isValidStartingLetter(startingLetter)

    return {
      ok: validStartingLetter,
      rowIndex,
      colIndex,
      startingLetter,
    }
  }

  #isValidCornerLetter(letter: string): letter is 'S' | 'M' {
    return letter === 'S' || letter === 'M'
  }

  #checkForXMAS() {
    const { rowIndex, colIndex, ok, startingLetter } = this.#setupCheck()
    if (!ok) return false

    const topLeft = this.#matrix[rowIndex - 1]?.[colIndex - 1]
    const topRight = this.#matrix[rowIndex - 1]?.[colIndex + 1]

    const bottomLeft = this.#matrix[rowIndex + 1]?.[colIndex - 1]
    const bottomRight = this.#matrix[rowIndex + 1]?.[colIndex + 1]

    if (
      !this.#isValidCornerLetter(topLeft) ||
      !this.#isValidCornerLetter(topRight) ||
      !this.#isValidCornerLetter(bottomLeft) ||
      !this.#isValidCornerLetter(bottomRight)
    ) {
      return false
    }

    if (topLeft === bottomRight || topRight === bottomLeft) {
      return false
    }

    debug(`
    ${topLeft}.${topRight}
    .${startingLetter}.
    ${bottomLeft}.${bottomRight}
    `)

    return true
  }

  run() {
    for (const [rowIndex, row] of this.#matrix.entries()) {
      for (const [colIndex] of row.entries()) {
        this.#coord = [rowIndex, colIndex]

        const match = this.#checkForXMAS()
        if (match) this.#matches++
      }
    }

    return this.#matches
  }
}

function solve2() {
  const matches = new X_MASWordSearch(input).run()

  return matches
}
// console.log(solve2())
