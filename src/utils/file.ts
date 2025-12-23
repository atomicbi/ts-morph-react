import { mkdtemp } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'

export async function createTempSourceFile(filename: string) {
  const dir = await mkdtemp(join(tmpdir(), 'ts-morph-react-'))
  return join(dir, filename)
}
