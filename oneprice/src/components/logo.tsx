'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'

interface LogoProps {
  className?: string
  showTagline?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className, showTagline = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: {
      width: 120,
      height: 40,
    },
    md: {
      width: 180,
      height: 60,
    },
    lg: {
      width: 280,
      height: 93,
    },
  }

  return (
    <div className={cn('flex flex-col items-start', className)}>
      <Image
        src="/logo.png"
        alt="OnePrice by ImportNow"
        width={sizes[size].width}
        height={sizes[size].height}
        className="object-contain dark:invert"
        style={{ height: 'auto' }}
        priority
      />
    </div>
  )
}
