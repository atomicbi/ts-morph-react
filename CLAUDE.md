# tsx-morph Project Guide

## Project Overview

**tsx-morph** is a collection of transformers for [ts-morph](https://ts-morph.com/) to refactor React code. It provides utilities and transformers that automate code modifications for React TypeScript codebases.

## Key Technologies

- **ts-morph**: AST manipulation and code transformation library
- **TypeScript**: Primary language (v5.9.2)
- **Build**: tsup for bundling
- **Testing**: Vitest
- **Linting**: ESLint with TypeScript support

## Project Structure

```
src/
├── transformers/          # Main transformation logic
│   ├── enforceDirectExports.ts      # Transform default exports to direct exports
│   ├── enforceFunctionComponent.ts  # Enforce function component syntax
│   ├── enforceNamedImports.ts       # Transform to named imports
│   ├── enforceFormat.ts             # Code formatting transformer
├── utils/                 # Shared utilities
│   ├── transformer.ts     # Base transformer utilities
│   ├── ts-morph.ts        # ts-morph helper functions
│   ├── transform.ts       # Transformation helpers
│   ├── file.ts            # File operations
│   ├── config.ts          # Configuration management
├── index.ts               # Main export barrel
├── test.ts                # Test utilities
└── cli.ts                 # CLI interface
docs/
├── organize-imports.md    # Documentation for import organization feature
```

## Core Concepts

### Transformers
The project exports multiple transformer classes that extend ts-morph's capabilities:
- **enforceDirectExports**: Converts default exports to direct exports
- **enforceFunctionComponent**: Enforces function component syntax over class components
- **enforceNamedImports**: Transforms to use named imports instead of defaults
- **enforceFormat**: Handles code formatting (including import organization)

### Utilities
- `ts-morph.ts`: Helper functions for AST manipulation
- `transformer.ts`: Base transformer utilities
- `transform.ts`: General transformation helpers
- `file.ts`: File I/O operations

## Development Scripts

```bash
pnpm build          # Build to dist/
pnpm watch         # Watch mode during development
pnpm lint          # Lint and type-check
pnpm cli           # Run CLI tool from dist/
pnpm clean         # Remove dist/ directory
pnpm test          # Run all tests
pnpm test:watch    # Run tests in watch mode
pnpm test:ui       # Run tests with UI
```

## Testing

The project uses **vitest** with **snapshot testing** to lock in expected transformer behavior:

### Test Files
- **[src/transformers/__tests__/enforceDirectExports.test.ts](src/transformers/__tests__/enforceDirectExports.test.ts)** - Tests for converting separate exports to direct exports
- **[src/transformers/__tests__/enforceFunctionComponent.test.ts](src/transformers/__tests__/enforceFunctionComponent.test.ts)** - Tests for FunctionComponent type conversion
- **[src/transformers/__tests__/enforceNamedImports.test.ts](src/transformers/__tests__/enforceNamedImports.test.ts)** - Tests for namespace to named imports conversion
- **[src/transformers/__tests__/enforceFormat.test.ts](src/transformers/__tests__/enforceFormat.test.ts)** - Tests for code formatting and import organization
- **[src/__tests__/transform.test.ts](src/__tests__/transform.test.ts)** - Combined transformer pipeline tests

### Test Helpers
- **[src/__tests__/helpers.ts](src/__tests__/helpers.ts)** - Shared test utilities (transformFixture function)

### Snapshots
Vitest automatically generates and manages snapshot files in `__snapshots__/` directories. Update snapshots with:
```bash
pnpm test -- -u    # Update snapshots after intentional code changes
```

### Running Tests
```bash
pnpm test                  # Run all tests once
pnpm test:watch           # Run tests in watch mode during development
pnpm test enforceFormat   # Run specific test file
pnpm test -- -u           # Update all snapshots
```

## Exporting

The package exports:
- **Main export**: `dist/index.js` with TypeScript definitions
- **CLI**: Available as `./dist/cli.js` (bin entry point)
- Module type: ESM

## Common Tasks

### Adding a New Transformer
1. Create file in `src/transformers/enforce[Feature].ts`
2. Implement transformer logic using ts-morph APIs
3. Export from `src/index.ts`
4. Document in `docs/` if needed

### Working with Import Organization
See [organize-imports.md](docs/organize-imports.md) for details on implementing import organization in `enforceFormat.ts`.

## Notes for Claude

- Use ts-morph's AST manipulation APIs for code transformations
- Transformers should be composable and focused on single responsibilities
- When modifying transformers, ensure TypeScript compilation passes (`npm run lint`)
- The project has a CLI interface for running transformations
