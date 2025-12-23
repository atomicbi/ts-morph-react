# ts-morph-react

[![npm version](https://img.shields.io/npm/v/ts-morph-react.svg)](https://www.npmjs.com/package/ts-morph-react)
[![npm downloads](https://img.shields.io/npm/dm/ts-morph-react.svg)](https://www.npmjs.com/package/ts-morph-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful collection of **AST transformers for ts-morph** to automate React code refactoring. Enforce consistent code patterns, modernize your codebase, and enforce best practices with declarative, composable transformers.

## Features

- 🔄 **Enforce Direct Exports** - Convert separate export statements to direct exports on function declarations
- 🎯 **Function Components** - Automatically convert function declarations to arrow function components with proper typing
- 📦 **Named Imports** - Transform default imports to named imports for consistency
- 🎨 **Code Formatting** - Format code and organize imports according to your style guide
- ⚡ **Composable** - Mix and match transformers to create your refactoring pipeline
- 🛡️ **Type-Safe** - Built with TypeScript for a fully typed experience
- 🎭 **AST-Powered** - Leverage ts-morph for precise, reliable code transformations

## Installation

```bash
npm install ts-morph-react
# or
pnpm add ts-morph-react
# or
yarn add ts-morph-react
```

## Quick Start

### As a Library

```typescript
import { Project } from 'ts-morph'
import { transform } from 'ts-morph-react'

const project = new Project()
const sourceFile = project.addSourceFileAtPath('src/Button.tsx')

// Run transformers with your configuration
await transform(sourceFile, {
  enforceDirectExports: true,
  enforceFunctionComponent: true,
  enforceNamedImports: true,
  enforceFormat: true
})

// Save changes
await sourceFile.save()
```

## Transformers

### enforceDirectExports

Converts separate export statement to direct exports.

❌ **Before:**
```tsx
function Button<ButtonProps>({ label }) {
  return <button>{label}</button>
}

export { Button }
```

✅ **After:**
```tsx
export function Button(props) {
  return <button>{props.label}</button>
}
```

### enforceFunctionComponent

Converts plain function components to properly typed `React.FunctionComponent` components, preserving prop types.

❌ **Before:**
```tsx
function Button(props: ButtonProps) {
  return <button>{props.label}</button>
}
```

✅ **After:**
```tsx
const Button: React.FunctionComponent<ButtonProps> = (props) => {
  return <button>{props.label}</button>
}
```

### enforceNamedImports

Transforms default imports to named imports for better tree-shaking and consistency.

❌ **Before:**
```tsx
import * as React from 'react'

export const Button: React.FunctionComponent<ButtonProps> = ({ label }) => {
  return <button>{label}</button>
}
```

✅ **After:**
```tsx
import { FunctionComponent } from 'react'

export const Button: FunctionComponent<ButtonProps> = ({ label }) => {
  return <button>{label}</button>
}
```

### enforceFormat

Formats code and organizes imports according to your style guide. Respects all standard TypeScript formatting options.

**Usage:**
```tsx
import { transform } from 'ts-morph-react'

await transform(sourceFile, {
  enforceFormat: true,
  format: {
    indentSize: 2,
    convertTabsToSpaces: true,
    semicolons: ts.SemicolonPreference.Remove
  }
})
```

❌ **Before:**
```tsx
import * as React from 'react';

import { Text } from '@/components/Text'

export const Button: React.FunctionComponent<ButtonProps> = ({ label }) => {
    return <button><Text>{label}</Text></button>;
};
```

✅ **After:**
```tsx
import * as React from 'react'
import { Text } from '@/components/Text'

export const Button: React.FunctionComponent<ButtonProps> = ({ label }) => {
  return <button><Text>{label}</Text></button>
}
```

## API Reference

### `transform(sourceFile: SourceFile, config?: TransformerConfig)`

Applies transformers to a source file.

```typescript
interface TransformerConfig {
  enforceDirectExports: boolean
  enforceFunctionComponent: boolean
  enforceNamedImports: boolean
  enforceFormat: boolean
  format: {
    baseIndentSize: number
    convertTabsToSpaces: boolean
    ensureNewLineAtEndOfFile: boolean
    indentMultiLineObjectLiteralBeginningOnBlankLine: boolean
    indentSize: number
    indentStyle: IndentStyle
    indentSwitchCase: boolean
    insertSpaceAfterCommaDelimiter: boolean
    insertSpaceAfterConstructor: boolean
    insertSpaceAfterFunctionKeywordForAnonymousFunctions: boolean
    insertSpaceAfterKeywordsInControlFlowStatements: boolean
    insertSpaceAfterOpeningAndBeforeClosingEmptyBraces: boolean
    insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: boolean
    insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: boolean
    insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: boolean
    insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: boolean
    insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: boolean
    insertSpaceAfterSemicolonInForStatements: boolean
    insertSpaceAfterTypeAssertion: boolean
    insertSpaceBeforeAndAfterBinaryOperators: boolean
    insertSpaceBeforeFunctionParenthesis: boolean
    insertSpaceBeforeTypeAnnotation: boolean
    newLineCharacter: string
    placeOpenBraceOnNewLineForControlBlocks: boolean
    placeOpenBraceOnNewLineForFunctions: boolean
    semicolons: SemicolonPreference
    tabSize: number
    trimTrailingWhitespace: boolean
  }
}
```

## Development

```bash
# Build the library
pnpm build

# Watch mode during development
pnpm watch

# Run tests
pnpm test

# Watch mode for tests
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Lint and type-check
pnpm lint

# Clean build artifacts
pnpm clean
```

### Testing

The project uses **vitest** with snapshot testing to ensure transformer behavior is consistent and intentional:

```bash
# Run tests once
pnpm test

# Run in watch mode
pnpm test:watch

# Update snapshots after intentional changes
pnpm test -- -u

# Run specific test file
pnpm test enforceFormat
```

## When to Use ts-morph-react

✅ **Good for:**
- Enforcing code patterns across your codebase
- Large-scale refactoring of React components
- Automating style guide compliance
- One-time migrations (class → function components, etc.)
- Building custom code generators and linters

❌ **Not ideal for:**
- Real-time code formatting (use Prettier for that)
- Rename refactoring with complex scope analysis (use your IDE)
- Performance-critical transformations of very large codebases

## Under the Hood

ts-morph-react is built on top of [ts-morph](https://ts-morph.com/), a fantastic library that provides a fluent API for manipulating TypeScript ASTs. If you need lower-level control, you can access the ts-morph APIs directly.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Tobias Strebitzer](mailto:tobias.strebitzer@atomic.bi)

## See Also

- [ts-morph](https://ts-morph.com/) - The underlying AST manipulation library
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API) - For deeper TypeScript understanding
