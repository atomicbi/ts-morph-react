import { format } from 'prettier'
import { Transformer } from '../utils/transformer'

export const enforcePrettier: Transformer = {
  match: ({ config }) => config.enforcePrettier,
  transform: async ({ sourceFile, config }) => {
    const formattedText = await format(sourceFile.getText(), {
      parser: 'babel-ts',
      ...config.prettier,
      embeddedLanguageFormatting: 'auto',
      quoteProps: 'consistent',
      trailingComma: 'none',
      singleQuote: true,
      jsxSingleQuote: true
    })
    sourceFile.replaceWithText(formattedText)
  }
}
