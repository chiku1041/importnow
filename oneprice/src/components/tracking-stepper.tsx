'use client'

import { cn } from '@/lib/utils'
import { 
  Clock, 
  Truck, 
  Warehouse, 
  CheckCircle, 
  Package, 
  PackageCheck,
  Plane,
  FileCheck,
  MapPin,
  Check
} from 'lucide-react'
import type { OrderStatus, TrackingStep, TrackingStepConfig } from '@/types/database'
import { TRACKING_STEPS, getStepFromStatus } from '@/types/database'

const stepIcons = {
  1: Clock,
  2: Warehouse,
  3: PackageCheck,
  4: Package,
  5: Truck,
  6: Plane,
  7: FileCheck,
  8: MapPin,
}

interface TrackingStepperProps {
  currentStatus: OrderStatus
  className?: string
}

export function TrackingStepper({ currentStatus, className }: TrackingStepperProps) {
  const currentStep = getStepFromStatus(currentStatus)

  function getLabel(config: TrackingStepConfig, stepPosition: 'past' | 'present' | 'future') {
    switch (stepPosition) {
      case 'past':
        return config.pastLabel
      case 'present':
        return config.presentLabel
      case 'future':
        return config.futureLabel
    }
  }

  function getStepPosition(step: TrackingStep): 'past' | 'present' | 'future' {
    if (step < currentStep) return 'past'
    if (step === currentStep) return 'present'
    return 'future'
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (TRACKING_STEPS.length - 1)) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {TRACKING_STEPS.map((config) => {
              const position = getStepPosition(config.step)
              const Icon = stepIcons[config.step]
              const isPast = position === 'past'
              const isPresent = position === 'present'
              const isFuture = position === 'future'

              return (
                <div 
                  key={config.step}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / TRACKING_STEPS.length}%` }}
                >
                  {/* Circle */}
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10',
                      isPast && 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30',
                      isPresent && 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30 animate-pulse',
                      isFuture && 'bg-background border-muted-foreground/30 text-muted-foreground'
                    )}
                  >
                    {isPast ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>

                  {/* Label */}
                  <div className="mt-3 text-center px-1">
                    <p
                      className={cn(
                        'text-xs font-medium leading-tight',
                        isPast && 'text-emerald-600 dark:text-emerald-400',
                        isPresent && 'text-primary font-semibold',
                        isFuture && 'text-muted-foreground'
                      )}
                    >
                      {getLabel(config, position)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile View - Vertical Timeline */}
      <div className="md:hidden">
        <div className="relative pl-8">
          {/* Vertical Line */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-muted">
            <div 
              className="w-full bg-gradient-to-b from-emerald-500 to-emerald-400 transition-all duration-500"
              style={{ height: `${((currentStep - 1) / (TRACKING_STEPS.length - 1)) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {TRACKING_STEPS.map((config) => {
              const position = getStepPosition(config.step)
              const Icon = stepIcons[config.step]
              const isPast = position === 'past'
              const isPresent = position === 'present'
              const isFuture = position === 'future'

              return (
                <div key={config.step} className="relative flex items-start gap-4">
                  {/* Circle */}
                  <div
                    className={cn(
                      'absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10',
                      isPast && 'bg-emerald-500 border-emerald-500 text-white',
                      isPresent && 'bg-primary border-primary text-primary-foreground animate-pulse',
                      isFuture && 'bg-background border-muted-foreground/30 text-muted-foreground'
                    )}
                  >
                    {isPast ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Icon className="h-3 w-3" />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      'flex-1 pb-2',
                      isPresent && 'bg-primary/5 -mx-2 px-2 py-2 rounded-lg border border-primary/20'
                    )}
                  >
                    <p
                      className={cn(
                        'text-sm font-medium',
                        isPast && 'text-emerald-600 dark:text-emerald-400',
                        isPresent && 'text-primary font-semibold',
                        isFuture && 'text-muted-foreground'
                      )}
                    >
                      {getLabel(config, position)}
                    </p>
                    {isPresent && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Current status
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// Compact version for order cards
export function TrackingProgress({ currentStatus }: { currentStatus: OrderStatus }) {
  const currentStep = getStepFromStatus(currentStatus)
  const config = TRACKING_STEPS.find(s => s.step === currentStep)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium">{currentStep}/8</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-primary transition-all duration-300 rounded-full"
          style={{ width: `${(currentStep / TRACKING_STEPS.length) * 100}%` }}
        />
      </div>
      <p className="text-xs text-primary font-medium">
        {config?.presentLabel}
      </p>
    </div>
  )
}

