import { Node } from 'ts-morph'
import { isForwardRefComponent, isFunctionComponent, isReactComponent } from '../utils/react'
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

    // Transform const arrow functions to function declarations (if they're components and not forwardRef)
    sourceFile.getVariableDeclarations().forEach((varDecl) => {
      // Skip if not a component
      if (!isReactComponent(varDecl)) return

      // Skip forwardRef and memo patterns
      if (isForwardRefComponent(varDecl)) return

      const initializer = varDecl.getInitializer()
      if (!initializer || !Node.isArrowFunction(initializer)) return

      const varName = varDecl.getName()
      const varStatement = varDecl.getVariableStatement()
      if (!varStatement) return

      const isExportedViaKeyword = varStatement.hasExportKeyword()

      // Check if it's exported via separate export statement
      let isExportedViaSeparateStatement = false
      sourceFile.getExportDeclarations().forEach((exportDecl) => {
        const namedExports = exportDecl.getNamedExports()
        if (namedExports.some((exp) => exp.getName() === varName)) {
          isExportedViaSeparateStatement = true
        }
      })

      const isExported = isExportedViaKeyword || isExportedViaSeparateStatement

      // Get the parameters
      const params = initializer.getParameters()
      const paramsText = params.map((p) => p.getText()).join(', ')

      // Get the body
      const body = initializer.getBody()
      if (!body) return

      const bodyText = body.getText()

      // Build the function body
      let functionBody: string
      const trimmedBody = bodyText.trim()

      if (trimmedBody.startsWith('(') && trimmedBody.endsWith(')')) {
        // Parenthesized expression like: (
        //   <button />
        // )
        const innerBody = trimmedBody.slice(1, -1).trim()
        functionBody = `{\n    return ${innerBody}\n  }`
      } else if (trimmedBody.startsWith('{')) {
        // Already a block statement
        functionBody = bodyText
      } else {
        // Simple JSX expression like: <button />
        functionBody = `{\n    return ${bodyText}\n  }`
      }

      const funcText = `${isExported ? 'export ' : ''}function ${varName}(${paramsText}) ${functionBody}`

      // Replace the variable statement with function declaration
      varStatement.replaceWithText(funcText)

      // Remove from separate export statements if it was exported that way
      if (isExportedViaSeparateStatement) {
        sourceFile.getExportDeclarations().forEach((exportDecl) => {
          const namedExports = exportDecl.getNamedExports()
          const matchingExports = namedExports.filter((namedExport) => namedExport.getName() === varName)

          if (matchingExports.length > 0) {
            matchingExports.forEach((namedExport) => {
              namedExport.remove()
            })

            // Remove the entire export declaration if no exports remain
            if (exportDecl.getNamedExports().length === 0) {
              exportDecl.remove()
            }
          }
        })
      }
    })
  }
}
