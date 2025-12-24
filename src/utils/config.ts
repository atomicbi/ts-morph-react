import { RulesConfig } from '@eslint/core'
import { Options as PrettierOptions } from 'prettier'
import { FormatCodeSettings, ts } from 'ts-morph'
import { PartialDeep } from 'type-fest'

export interface TransformerConfig {
  enforceDirectExports: boolean
  enforceFunctionComponent: boolean
  enforceNamedImports: boolean
  enforceFormat: boolean
  enforceEslint: boolean
  enforcePrettier: boolean
  format: FormatCodeSettings
  prettier: PrettierOptions
  eslint: Partial<RulesConfig>
}

export function mergeConfig({ eslint, format, prettier, ...config }: PartialDeep<TransformerConfig> = {}): TransformerConfig {
  return {
    enforceDirectExports: false,
    enforceFunctionComponent: false,
    enforceNamedImports: false,
    enforceFormat: false,
    enforceEslint: false,
    enforcePrettier: false,
    eslint: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
      '@stylistic/function-paren-newline': ['error', 'never'],
      '@stylistic/object-curly-newline': ['error', 'never'],
      ...eslint
    },
    format: {
      indentSize: 2,
      convertTabsToSpaces: true,
      ensureNewLineAtEndOfFile: true,
      indentStyle: ts.IndentStyle.Block,
      semicolons: ts.SemicolonPreference.Remove,
      trimTrailingWhitespace: true,
      ...format
    },
    prettier: {
      semi: false,
      singleQuote: true,
      jsxSingleQuote: true,
      arrowParens: 'always',
      bracketSameLine: true,
      objectWrap: 'collapse',
      printWidth: 120,
      ...prettier
    },
    ...config
  }
}
