// Description: A simple container component for layout purposes. responsible for alignment

import React from 'react'
import { cn } from '@/lib/utils'
function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto max-w-6xl xl: maz-w-7xl px-8', className)}>
      {children}
    </div>
  )
}

export default Container
