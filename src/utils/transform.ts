import { SourceFile } from 'ts-morph'
import { PartialDeep } from 'type-fest'
import { enforceDirectExports } from '../transformers/enforceDirectExports'
import { enforceFormat } from '../transformers/enforceFormat'
import { enforceFunctionComponent } from '../transformers/enforceFunctionComponent'
import { enforceNamedImports } from '../transformers/enforceNamedImports'
import { mergeConfig, TransformerConfig } from './config'
import { TransformerParams } from './transformer'

export const transformers = [enforceDirectExports, enforceFunctionComponent, enforceNamedImports, enforceFormat]

export async function transform(
  sourceFile: SourceFile,
  config: PartialDeep<TransformerConfig> = {}
): Promise<void> {
  const params: TransformerParams = { config: mergeConfig(config), sourceFile }
  for (const transformer of transformers) {
    if (transformer.match(params)) {
      await transformer.transform(params)
    }
  }
}
