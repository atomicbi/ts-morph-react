import { FormatCodeSettings, ts } from 'ts-morph'
import { PartialDeep } from 'type-fest'

export interface TransformerConfig {
  enforceDirectExports: boolean
  enforceFunctionComponent: boolean
  enforceNamedImports: boolean
  enforceFormat: boolean
  format: FormatCodeSettings
}

export function mergeConfig({ format, ...config }: PartialDeep<TransformerConfig> = {}): TransformerConfig {
  return {
    enforceDirectExports: false,
    enforceFunctionComponent: false,
    enforceNamedImports: false,
    enforceFormat: false,
    format: {
      indentSize: 2,
      convertTabsToSpaces: true,
      indentStyle: ts.IndentStyle.Smart,
      indentMultiLineObjectLiteralBeginningOnBlankLine: true,
      ensureNewLineAtEndOfFile: true,
      semicolons: ts.SemicolonPreference.Remove,
      trimTrailingWhitespace: true,
      ...format
    },
    ...config
  }
}
