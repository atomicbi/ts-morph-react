import { readFileSync } from 'fs'
import { mkdtemp, rmdir } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'
import { Project, ScriptKind } from 'ts-morph'
import { PartialDeep } from 'type-fest'
import { transform, TransformerConfig } from '../src/index'

export async function transformFixture(name: string, config: PartialDeep<TransformerConfig>): Promise<string> {
  const sourceFilePath = join(__dirname, 'fixtures', name)
  const source = readFileSync(sourceFilePath, 'utf-8')
  const project = new Project({ compilerOptions: {} })
  const tempDir = await mkdtemp(join(tmpdir(), 'ts-morph-react-'))
  const filePath = join(tempDir, name)
  const sourceFile = project.createSourceFile(filePath, source, { scriptKind: ScriptKind.TSX })
  await transform(sourceFile, config)
  const result = sourceFile.getText()
  await rmdir(tempDir)
  return result
}

export function snapshotPath(name: string, extension = 'tsx') {
  return join(__dirname, 'snapshots', `${name}.${extension}`)
}
