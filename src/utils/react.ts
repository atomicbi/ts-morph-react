import { FunctionDeclaration, Node, SyntaxKind, VariableDeclaration } from 'ts-morph'

// React types that should be imported as named imports
export const REACT_TYPES = [
  'ComponentProps',
  'ComponentPropsWithRef',
  'ComponentPropsWithoutRef',
  'FC',
  'FunctionComponent',
  'ReactNode',
  'ReactElement',
  'JSX',
  'RefObject',
  'MutableRefObject',
  'CSSProperties',
  'HTMLAttributes',
  'SVGAttributes',
  'DOMAttributes',
  'PropsWithChildren',
  'PropsWithRef'
]

// React hooks that should be imported as named imports
export const REACT_HOOKS = [
  'useState',
  'useEffect',
  'useCallback',
  'useMemo',
  'useRef',
  'useContext',
  'useReducer',
  'useImperativeHandle',
  'useLayoutEffect',
  'useDebugValue',
  'useTransition',
  'useDeferredValue',
  'useId',
  'useSyncExternalStore'
]

// React APIs that should be imported as named imports
export const REACT_APIS = [
  'forwardRef',
  'memo',
  'lazy',
  'createContext',
  'createElement',
  'cloneElement',
  'isValidElement',
  'Children',
  'Fragment',
  'StrictMode',
  'Suspense'
]

// Helper to detect if a variable declaration is a React component
export function isReactComponent(varDecl: VariableDeclaration): boolean {
  try {
    const initializer = varDecl.getInitializer?.()
    if (!initializer) return false

    // Check if the initializer contains JSX
    const descendants = initializer.getDescendantsOfKind?.(SyntaxKind.JsxElement) || []
    const selfClosing = initializer.getDescendantsOfKind?.(SyntaxKind.JsxSelfClosingElement) || []

    if (descendants.length > 0 || selfClosing.length > 0) { return true }

    // Check if it's assigned to an arrow function that returns JSX
    if (Node.isArrowFunction(initializer)) {
      const body = initializer.getBody?.()
      if (body) {
        const bodyDescendants = body.getDescendantsOfKind?.(SyntaxKind.JsxElement) || []
        const bodySelfClosing = body.getDescendantsOfKind?.(SyntaxKind.JsxSelfClosingElement) || []
        return bodyDescendants.length > 0 || bodySelfClosing.length > 0
      }
    }

    return false
  } catch {
    return false
  }
}

// Helper to check if a variable is a forwardRef component
export function isForwardRefComponent(varDecl: VariableDeclaration): boolean {
  try {
    const initializer = varDecl.getInitializer?.()
    if (!initializer) return false

    const text = initializer.getText?.()
    return text?.includes('forwardRef(') || text?.includes('React.forwardRef(') ? true : false
  } catch {
    return false
  }
}

// Helper to check if a function is a React component (returns JSX)
export function isFunctionComponent(func: FunctionDeclaration): boolean {
  try {
    const descendants = func.getDescendantsOfKind?.(SyntaxKind.JsxElement) || []
    const selfClosing = func.getDescendantsOfKind?.(SyntaxKind.JsxSelfClosingElement) || []
    if (descendants.length > 0 || selfClosing.length > 0) { return true }
    return false
  } catch {
    return false
  }
}
