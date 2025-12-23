import { StructureKind, VariableDeclarationKind } from 'ts-morph'
import { isFunctionComponent } from '../utils/react'
import { Transformer } from '../utils/transformer'

export const enforceFunctionComponent: Transformer = {
  match: ({ config }) => config.enforceFunctionComponent,
  transform: async ({ sourceFile, config: { enforceDirectExports } }) => {
    sourceFile.getFunctions().forEach((func) => {
      if (!isFunctionComponent(func)) { return }

      const funcName = func.getName()
      if (!funcName) { return }

      const isExportedViaKeyword = func.isExported()
      let isExportedViaSeparateStatement = false

      sourceFile.getExportDeclarations().forEach((exportDecl) => {
        const namedExports = exportDecl.getNamedExports()
        if (namedExports.some((exp) => exp.getName() === funcName)) {
          isExportedViaSeparateStatement = true
        }
      })

      const isExported = enforceDirectExports && (isExportedViaKeyword || isExportedViaSeparateStatement)

      // Get the parameters with their type annotations
      const params = func.getParameters()
      const param = params[0]
      const type = param.getTypeNode() ?? param.getType()
      const typeText = type.getText()
      param.removeType()
      const typeAnnotation = typeText === 'any' ? 'React.FunctionComponent' : `React.FunctionComponent<${typeText}>`

      const index = func.getChildIndex()
      sourceFile.insertVariableStatement(index, {
        declarations: [{
          name: funcName,
          type: typeAnnotation,
          initializer: (writer) => {
            writer.write('(').write(func.getParameters().map((p) => p.getText()).join(', ')).write(')')
            const returnType = func.getReturnTypeNode()?.getText()
            if (returnType) { writer.write(`: ${returnType}`) }
            writer.write(' => ')
            const bodyText = func.getBody()?.getText() ?? '{}'
            writer.block(() => { writer.write(bodyText.replace(/^{|}$/g, '').trim()) })
          }
        }],
        declarationKind: VariableDeclarationKind.Const,
        kind: StructureKind.VariableStatement,
        isExported
      })
      func.remove()
    })
  }
}
