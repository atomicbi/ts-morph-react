import { ImportDeclaration } from 'ts-morph'
import { Transformer } from '../utils/transformer'
import { enforeLineSeparation, SeparationIntent } from '../utils/trivia'

export const enforceFormat: Transformer = {
  match: ({ config }) => config.enforceFormat,
  transform: async ({ sourceFile, config }) => {
    enforeLineSeparation(sourceFile, (cur, prev) => (prev instanceof ImportDeclaration && cur instanceof ImportDeclaration)
      ? SeparationIntent.COMBINE
      : SeparationIntent.SEPARATE
    )
    sourceFile.organizeImports()
    sourceFile.formatText(config.format)
  }
}
