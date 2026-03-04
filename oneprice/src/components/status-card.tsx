'use client'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Clock, 
  Truck, 
  Warehouse, 
  CheckCircle, 
  Package, 
  PackageCheck,
  Plane,
  FileCheck,
  MapPin
} from 'lucide-react'
import type { OrderStatus, TrackingStep, TRACKING_STEPS } from '@/types/database'
import { getStepFromStatus } from '@/types/database'

const statusConfig: Record<OrderStatus, {
  icon: typeof Clock
  bgColor: string
  textColor: string
  borderColor: string
  iconColor: string
}> = {
  'waiting_for_confirmation': {
    icon: Clock,
    bgColor: 'bg-slate-500/10',
    textColor: 'text-slate-700 dark:text-slate-400',
    borderColor: 'border-slate-500/20',
    iconColor: 'text-slate-500',
  },
  'arrived_at_warehouse': {
    icon: Warehouse,
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-700 dark:text-blue-400',
    borderColor: 'border-blue-500/20',
    iconColor: 'text-blue-500',
  },
  'accepted_by_oneprice': {
    icon: PackageCheck,
    bgColor: 'bg-indigo-500/10',
    textColor: 'text-indigo-700 dark:text-indigo-400',
    borderColor: 'border-indigo-500/20',
    iconColor: 'text-indigo-500',
  },
  'ready_to_dispatch': {
    icon: Package,
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-700 dark:text-purple-400',
    borderColor: 'border-purple-500/20',
    iconColor: 'text-purple-500',
  },
  'in_transit': {
    icon: Truck,
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-700 dark:text-amber-400',
    borderColor: 'border-amber-500/20',
    iconColor: 'text-amber-500',
  },
  'arrived_in_india': {
    icon: Plane,
    bgColor: 'bg-cyan-500/10',
    textColor: 'text-cyan-700 dark:text-cyan-400',
    borderColor: 'border-cyan-500/20',
    iconColor: 'text-cyan-500',
  },
  'custom_clearance': {
    icon: FileCheck,
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-700 dark:text-orange-400',
    borderColor: 'border-orange-500/20',
    iconColor: 'text-orange-500',
  },
  'dispatched_to_address': {
    icon: MapPin,
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-700 dark:text-green-400',
    borderColor: 'border-green-500/20',
    iconColor: 'text-green-500',
  },
}

// Human-readable labels for status badges
const statusLabels: Record<OrderStatus, string> = {
  'waiting_for_confirmation': 'Waiting',
  'arrived_at_warehouse': 'At Warehouse',
  'accepted_by_oneprice': 'Accepted',
  'ready_to_dispatch': 'Ready',
  'in_transit': 'In Transit',
  'arrived_in_india': 'In India',
  'custom_clearance': 'Customs',
  'dispatched_to_address': 'Dispatched',
}

interface StatusCardProps {
  status: OrderStatus
  count: number
  className?: string
}

export function StatusCard({ status, count, className }: StatusCardProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Card className={cn('border-2 transition-all hover:shadow-md', config.borderColor, config.bgColor, className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn('text-sm font-medium', config.textColor)}>
          {statusLabels[status]}
        </CardTitle>
        <Icon className={cn('h-5 w-5', config.iconColor)} />
      </CardHeader>
      <CardContent>
        <div className={cn('text-3xl font-bold', config.textColor)}>{count}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {count === 1 ? 'shipment' : 'shipments'}
        </p>
      </CardContent>
    </Card>
  )
}

export function StatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  const config = statusConfig[status]
  
  // Fallback for unknown status values
  if (!config) {
    return (
      <span className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20 border',
        className
      )}>
        {status || 'Unknown'}
      </span>
    )
  }
  
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      config.bgColor,
      config.textColor,
      config.borderColor,
      'border',
      className
    )}>
      {statusLabels[status]}
    </span>
  )
}

export function getStatusConfig(status: OrderStatus) {
  return statusConfig[status]
}
