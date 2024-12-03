import path from 'node:path'

export async function loadInput(day: number): Promise<string> {
  return Bun.file(path.join('./input', `${day.toString()}.txt`)).text()
}

export function invariant(
  condition: any,
  message?: string | (() => string)
): asserts condition {
  if (condition) {
    return
  }

  const prefix: string = 'Invariant failed'
  const provided: string | undefined =
    typeof message === 'function' ? message() : message

  // Options:
  // 1. message provided: `${prefix}: ${provided}`
  // 2. message not provided: prefix
  const value: string = provided ? `${prefix}: ${provided}` : prefix
  throw new Error(value)
}
