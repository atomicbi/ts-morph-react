import { Transformer } from '../utils/transformer'

export const enforceFormat: Transformer = {
  match: ({ config }) => config.enforceFormat,
  transform: async ({ sourceFile, config }) => {
    sourceFile.organizeImports()
    sourceFile.formatText(config.format)
  }
}
