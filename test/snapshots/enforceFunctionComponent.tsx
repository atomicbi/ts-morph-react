'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

import { Button as ButtonPrimitive } from '@base-ui/react/button'
interface ExampleContextProps {
  content: string
}

const ExampleContext = React.createContext<ExampleContextProps | null>(null)
const ExampleProvider: React.FunctionComponent<React.PropsWithChildren<{ value: ExampleContextProps }>> = ({ value, ...props }) => {
        return (
            <ExampleContext.Provider value={value} >
              {props.children}
            </ExampleContext.Provider>
          )
    };
const Example: React.FunctionComponent<ButtonPrimitive.Props & { content: string }> = ({ content, className, ...props }) => {
        return (
            <ExampleProvider value={{ content }}>
              <ButtonPrimitive className={cn('p-2', className)} {...props} />
            </ExampleProvider>
          )
    };
export { Example, ExampleProvider }
