import path from 'node:path'

export async function loadInput(day: number): Promise<string> {
  return Bun.file(path.join('./input', `${day.toString()}.txt`)).text()
}
