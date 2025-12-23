import { Node, SourceFile, ts } from 'ts-morph'

export enum SeparationIntent { IGNORE, COMBINE, SEPARATE }

export interface SeparationEntry {
  range: [number, number]
  intent: SeparationIntent
}

export function enforeLineSeparation(sourceFile: SourceFile, predicate: (cur: Node<ts.Node>, prev: Node<ts.Node>, triviaWidth: number) => SeparationIntent) {
  const instructions: SeparationEntry[] = []
  const syntaxList = sourceFile.getChildSyntaxListOrThrow()
  for (let index = syntaxList.getChildCount() - 1; index > 0; index -= 1) {
    const prev = syntaxList.getChildAtIndex(index - 1)
    const cur = syntaxList.getChildAtIndex(index)
    const intent = predicate(cur, prev, cur.getLeadingTriviaWidth())
    instructions.push({ range: [prev.getEnd(), cur.getStart()], intent })
  }
  instructions.forEach(({ range, intent }) => {
    if (intent === SeparationIntent.COMBINE) {
      sourceFile.replaceText(range, '\n')
    } else if (intent === SeparationIntent.SEPARATE) {
      sourceFile.replaceText(range, '\n\n')
    }
  })
}
