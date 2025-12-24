import { Node, SyntaxKind } from 'ts-morph'
import { REACT_APIS, REACT_HOOKS, REACT_TYPES } from '../utils/react'
import { Transformer } from '../utils/transformer'

export const enforceNamedImports: Transformer = {
  match: ({ config }) => config.enforceNamedImports,
  transform: async ({ sourceFile }) => {
    // Find React import declaration
    const reactImport = sourceFile.getImportDeclarations().find((importDeclaration) => {
      return importDeclaration.getModuleSpecifier().getLiteralValue() === 'react'
    })

    // Initialize tracking sets
    const typeImportsNeeded = new Set<string>()
    const valueImportsNeeded = new Set<string>()

    // ============================================================
    // Phase 2 & 3: Transform Type References and Hook Calls
    // (Single-pass traversal for efficiency)
    // ============================================================

    sourceFile.forEachDescendant((node) => {
      // Handle TypeReference nodes (Phase 2)
      if (node.getKind() === SyntaxKind.TypeReference) {
        const typeRef = node.asKind(SyntaxKind.TypeReference)
        if (!typeRef) return

        const typeName = typeRef.getTypeName()

        // Check if it's a qualified name like React.ComponentProps or React.HTMLAttributes
        if (Node.isQualifiedName(typeName)) {
          const left = typeName.getLeft().getText()
          const right = typeName.getRight().getText()

          if (left === 'React') {
            // Check if it's a known React type
            if (REACT_TYPES.includes(right)) {
              typeName.replaceWithText(right)
              typeImportsNeeded.add(right)
            }
          }
        }
      }

      // Handle PropertyAccessExpression nodes (Phase 3)
      // This handles both React.Component and React.SomethingRef patterns
      if (node.getKind() === SyntaxKind.PropertyAccessExpression) {
        const propAccess = node.asKind(SyntaxKind.PropertyAccessExpression)
        if (!propAccess) return

        const expr = propAccess.getExpression()
        const name = propAccess.getName()

        if (expr.getText() === 'React') {
          // Check if it's a known hook or API
          if (REACT_HOOKS.includes(name) || REACT_APIS.includes(name) || REACT_TYPES.includes(name)) {
            propAccess.replaceWithText(name)

            // Determine if it's a type or value import
            if (REACT_TYPES.includes(name)) {
              typeImportsNeeded.add(name)
            } else if (REACT_HOOKS.includes(name) || REACT_APIS.includes(name)) {
              valueImportsNeeded.add(name)
            }
          }
        }
      }
    })

    // ============================================================
    // Phase 4: Import Management
    // ============================================================

    // Only add named imports and remove namespace if we have imports to add
    if (reactImport && (typeImportsNeeded.size > 0 || valueImportsNeeded.size > 0)) {
      // Remove namespace import FIRST (before adding named imports)
      reactImport.removeNamespaceImport()

      // Add type imports (with 'type' keyword for type-only imports)
      const typeImportsArray = Array.from(typeImportsNeeded).sort()
      for (const typeName of typeImportsArray) {
        reactImport.addNamedImport({ name: typeName, isTypeOnly: true })
      }

      // Add value imports
      const valueImportsArray = Array.from(valueImportsNeeded).sort()
      for (const valueName of valueImportsArray) {
        reactImport.addNamedImport(valueName)
      }
    }
  }
}
