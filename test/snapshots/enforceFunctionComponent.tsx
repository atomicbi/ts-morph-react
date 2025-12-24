'use client'

import { cn } from '@/lib/utils'
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import * as React from 'react'

const ExampleProvider: React.FunctionComponent<{ children?: React.ReactNode }> = ({ ...props }) => {
  return <div>{props.children}</div>
}

const Example: React.FunctionComponent<ButtonPrimitive.Props & { content: string }> = ({
  content,
  className,
  ...props
}) => {
  return (
    <ExampleProvider>
      <ButtonPrimitive className={cn('p-2', className)} {...props} />
    </ExampleProvider>
  )
}

export { Example, ExampleProvider }
