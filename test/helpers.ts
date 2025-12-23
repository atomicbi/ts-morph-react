import { readFileSync } from 'fs'
import { join } from 'path'
import { Project, ScriptKind } from 'ts-morph'
import { PartialDeep } from 'type-fest'
import { createTempSourceFile, transform, TransformerConfig } from '../src/index'

export async function transformFixture(name: string, config: PartialDeep<TransformerConfig>): Promise<string> {
  const filePath = join(__dirname, 'fixtures', name)
  const source = readFileSync(filePath, 'utf-8')
  const project = new Project({ compilerOptions: {} })
  const tempFile = await createTempSourceFile('test.tsx')
  const sourceFile = project.createSourceFile(tempFile, source, { scriptKind: ScriptKind.TSX })
  await transform(sourceFile, config)
  return sourceFile.getText()
}

export function snapshotPath(name: string, extension = 'tsx') {
  return join(__dirname, 'snapshots', `${name}.${extension}`)
}
