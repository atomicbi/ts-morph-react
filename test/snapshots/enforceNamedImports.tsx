'use client'

import { type PropsWithChildren, createContext } from 'react'

import { cn } from '@/lib/utils'

import { Button as ButtonPrimitive } from '@base-ui/react/button'
interface ExampleContextProps {
  content: string
}

const ExampleContext = createContext<ExampleContextProps | null>(null)

function ExampleProvider({ value, ...props }: PropsWithChildren<{ value: ExampleContextProps }>) {
  return (
    <ExampleContext.Provider value={value} >
      {props.children}
    </ExampleContext.Provider>
  )
}

function Example({ content, className, ...props }: ButtonPrimitive.Props & { content: string }) {
  return (
    <ExampleProvider value={{ content }}>
      <ButtonPrimitive className={cn('p-2', className)} {...props} />
    </ExampleProvider>
  )
}

export { Example, ExampleProvider }
