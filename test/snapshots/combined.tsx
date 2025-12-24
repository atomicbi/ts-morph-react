'use client'

import { cn } from '@/lib/utils'
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { type FunctionComponent, type ReactNode } from 'react'

export const ExampleProvider: FunctionComponent<{ children?: ReactNode }> = ({ ...props }) => {
  return <div>{props.children}</div>
}

export const Example: FunctionComponent<ButtonPrimitive.Props & { content: string }> = ({
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
