import { expect } from 'bun:test'
import { invariant, loadInput } from '../utils'

const TEST_INPUT = `
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
`
const TEST_TARGET = 161

const DEBUG = true

const debug = (...args: any[]) => DEBUG && console.log(...args)

function solve1(input: string) {
  let result = 0
  const multiplicationFunctions = /mul\((\d+),(\d+)\)/g

  for (const [_, param1, param2] of [
    ...input.matchAll(multiplicationFunctions),
  ]) {
    const [num1, num2] = [param1, param2].map(Number)

    invariant(typeof num1 === 'number', 'param1 is not a number')
    invariant(typeof num2 === 'number', 'param2 is not a number')

    result += num1 * num2
  }

  return result
}

const input = await loadInput(3)
const test = () => expect(solve1(TEST_INPUT)).toBe(TEST_TARGET)
const s1 = () => console.log(solve1(input))

test()
// s1()

function solve2(input: string) {
  let result = 0
  const functions = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g

  let enabled = true
  for (const [functionName, param1, param2] of [...input.matchAll(functions)]) {
    if (functionName === "don't()") {
      enabled = false
      continue
    }
    if (functionName === 'do()') {
      enabled = true
      continue
    }

    if (enabled === false) continue

    invariant(
      functionName.startsWith('mul('),
      `function was not mul: ${functionName}`
    )

    const [num1, num2] = [param1, param2].map(Number)

    invariant(typeof num1 === 'number', 'param1 is not a number')
    invariant(typeof num2 === 'number', 'param2 is not a number')

    result += num1 * num2
  }

  return result
}

console.log(solve2(input))
