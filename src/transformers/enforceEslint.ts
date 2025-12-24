import stylistic from '@stylistic/eslint-plugin'
import { ESLint } from 'eslint'
import { dirname } from 'path'
import tseslint from 'typescript-eslint'
import { Transformer } from '../utils/transformer'

export const enforceEslint: Transformer = {
  match: ({ config }) => config.enforceEslint,
  transform: async ({ sourceFile, config }) => {
    const filePath = sourceFile.getFilePath()
    const cwd = dirname(filePath)
    const eslint = new ESLint({
      fix: true,
      cwd,
      overrideConfigFile: true,
      overrideConfig: [{
        basePath: '.',
        languageOptions: {
          parser: tseslint.parser,
          ecmaVersion: 2020,
          sourceType: 'module',
          parserOptions: { ecmaFeatures: { jsx: true } }
        },
        files: ['**/*.{ts,tsx,js,jsx}'],
        plugins: { '@stylistic': stylistic },
        rules: config.eslint
      }]
    })

    const [result] = await eslint.lintText(sourceFile.getFullText(), { filePath })
    if (result?.output) { sourceFile.replaceWithText(result.output) }
  }
}
