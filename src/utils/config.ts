import { RulesConfig } from '@eslint/core'
import { Options as PrettierOptions } from 'prettier'
import { FormatCodeSettings, ts } from 'ts-morph'
import { PartialDeep } from 'type-fest'

export interface TransformerConfig {
  enforceDirectExports: boolean
  enforceFunctionComponent: boolean
  enforceNamedImports: boolean
  enforceFormat: boolean
  enforceLineSeparation: boolean
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
    enforceLineSeparation: false,
    enforceEslint: false,
    enforcePrettier: false,
    eslint: {
      '@stylistic/space-in-parens': ['error'],
      '@stylistic/comma-spacing': ['error'],
      '@stylistic/no-multi-spaces': ['error'],
      '@stylistic/no-trailing-spaces': ['error'],
      '@stylistic/no-whitespace-before-property': ['error'],
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/array-bracket-spacing': ['error'],
      '@stylistic/arrow-spacing': ['error'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/key-spacing': ['error'],
      '@stylistic/keyword-spacing': ['error'],
      '@stylistic/member-delimiter-style': ['error', { 'multiline': { 'delimiter': 'none' } }],
      '@stylistic/no-extra-semi': ['error'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' }],
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
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
