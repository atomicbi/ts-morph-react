'use client'

import { cn } from '@/lib/utils'
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { type FunctionComponent, type PropsWithChildren, createContext } from 'react'

interface ExampleContextProps {
  content: string
}

const ExampleContext = createContext<ExampleContextProps | null>(null)

export const ExampleProvider: FunctionComponent<PropsWithChildren<{ value: ExampleContextProps }>> = ({ value, ...props }) => {
  return (
    <ExampleContext.Provider value={value} >
      {props.children}
    </ExampleContext.Provider>
  )
}

export const Example: FunctionComponent<ButtonPrimitive.Props & { content: string }> = ({ content, className, ...props }) => {
  return (
    <ExampleProvider value={{ content }}>
      <ButtonPrimitive className={cn('p-2', className)} {...props} />
    </ExampleProvider>
  )
}
