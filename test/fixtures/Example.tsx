'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

import { Button as ButtonPrimitive } from '@base-ui/react/button'

function ExampleProvider({
  ...props
}: {
  children?: React.ReactNode
}) {
  return (
    <div>
      {props.children}
    </div>
  )
}

function Example({ content, className, ...props }: ButtonPrimitive.Props & { content: string }) {
  return (
    <ExampleProvider>
      <ButtonPrimitive className={cn('p-2', className)} {...props} />
    </ExampleProvider>
  )
}

export { Example, ExampleProvider }
