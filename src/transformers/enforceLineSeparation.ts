import { ImportDeclaration } from 'ts-morph'
import { Transformer } from '../utils/transformer'
import { enforeLineSeparation, SeparationIntent } from '../utils/trivia'

export const enforceLineSeparation: Transformer = {
  match: ({ config }) => config.enforceLineSeparation,
  transform: async ({ sourceFile }) => {
    enforeLineSeparation(sourceFile, (cur, prev) => (prev instanceof ImportDeclaration && cur instanceof ImportDeclaration)
      ? SeparationIntent.COMBINE
      : SeparationIntent.SEPARATE
    )
  }
}
