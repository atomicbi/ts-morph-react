import { isFunctionComponent } from '../utils/react'
import { Transformer } from '../utils/transformer'

export const enforceDirectExports: Transformer = {
  match: ({ config }) => config.enforceDirectExports,
  transform: async ({ sourceFile }) => {
    // Transform function declarations: add direct export if it's a component
    sourceFile.getFunctions().forEach((func) => {
      // Skip if not a component
      if (!isFunctionComponent(func)) { return }

      // Skip if already exported directly
      if (func.isExported() && func.hasExportKeyword()) { return }

      const funcName = func.getName()

      // Check if it's exported via separate export statement
      let isExportedViaSeparateStatement = false
      sourceFile.getExportDeclarations().forEach((exportDecl) => {
        const namedExports = exportDecl.getNamedExports()
        if (namedExports.some((exp) => exp.getName() === funcName)) {
          isExportedViaSeparateStatement = true
        }
      })

      // Only convert if it's a component that should be exported
      if (isExportedViaSeparateStatement) {
        // Add direct export modifier
        func.setIsExported(true)

        // Remove from separate export statements
        sourceFile.getExportDeclarations().forEach((exportDecl) => {
          const namedExports = exportDecl.getNamedExports()
          const matchingExports = namedExports.filter((namedExport) => namedExport.getName() === funcName)
          if (matchingExports.length > 0) {
            matchingExports.forEach((namedExport) => { namedExport.remove() })
            if (exportDecl.getNamedExports().length === 0) { exportDecl.remove() }
          }
        })
      }
    })
  }
}
