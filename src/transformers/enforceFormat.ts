import { Transformer } from '../utils/transformer'

export const enforceFormat: Transformer = {
  match: ({ config }) => config.enforceFormat,
  transform: async ({ sourceFile, config }) => {
    sourceFile.formatText(config.format)
    sourceFile.organizeImports(config.format, { organizeImportsTypeOrder: 'first' })
  }
}
