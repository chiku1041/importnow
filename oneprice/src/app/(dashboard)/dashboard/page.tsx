'use client'

import { useUser } from '@/lib/hooks/use-user'
import { useOrders } from '@/lib/hooks/use-orders'
import { StatusBadge } from '@/components/status-card'
import { TrackingProgress } from '@/components/tracking-stepper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { 
  UserPlus, 
  MapPin, 
  Share2, 
  FileInput, 
  Home,
  ArrowRight,
  MessageCircle,
} from 'lucide-react'
import Link from 'next/link'
import type { OrderStatus } from '@/types/database'

const steps = [
  {
    number: 1,
    title: 'Sign Up',
    description: 'Create your free account to get started',
    icon: UserPlus,
  },
  {
    number: 2,
    title: 'Get Warehouse Address',
    description: 'Access our warehouse addresses for your imports',
    icon: MapPin,
  },
  {
    number: 3,
    title: 'Share with Supplier',
    description: 'Provide the warehouse address to your supplier',
    icon: Share2,
  },
  {
    number: 4,
    title: 'Enter Tracking',
    description: 'Submit your shipment tracking details',
    icon: FileInput,
  },
  {
    number: 5,
    title: 'Receive at Doorstep',
    description: 'We deliver your package to your door',
    icon: Home,
  },
]

import { TRACKING_STEPS, getStepFromStatus } from '@/types/database'

// Key statuses to display on dashboard (simplified view)
const keyStatuses: { status: OrderStatus; label: string; color: string }[] = [
  { status: 'waiting_for_confirmation', label: 'Pending', color: 'bg-slate-500' },
  { status: 'in_transit', label: 'In Transit', color: 'bg-amber-500' },
  { status: 'custom_clearance', label: 'Customs', color: 'bg-orange-500' },
  { status: 'dispatched_to_address', label: 'Delivered', color: 'bg-emerald-500' },
]

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <Skeleton className="h-64" />
    </div>
  )
}

export default function DashboardPage() {
  const { profile, loading: userLoading } = useUser()
  const { orders, statusCounts, loading: ordersLoading } = useOrders({
    userId: profile?.id,
  })

  if (userLoading || ordersLoading) {
    return <DashboardSkeleton />
  }

  const recentOrders = orders.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Welcome to</h1>
          <span className="text-4xl font-bold">OnePrice</span>
        </div>
        <p className="text-muted-foreground text-lg">
          Track your import shipments and manage your orders all in one place.
        </p>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {keyStatuses.map(({ status, label, color }) => {
          // Count orders at or past this status for "Delivered", exact match for others
          const count = status === 'dispatched_to_address' 
            ? orders.filter(o => o.status === 'dispatched_to_address').length
            : statusCounts[status] || 0
          
          return (
            <Card 
              key={status} 
              className="relative overflow-hidden border-2 hover:shadow-md transition-all"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 ${color}`} />
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-3xl font-bold mt-1">{count}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full ${color}/10 flex items-center justify-center`}>
                    <span className={`text-lg font-bold ${color.replace('bg-', 'text-')}`}>
                      {count}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      
      {/* Overall Stats */}
      <Card className="bg-gradient-to-br from-primary/5 to-background">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">Total Active Shipments</p>
              <p className="text-4xl font-bold">{orders.length}</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-500">
                  {orders.filter(o => o.status === 'dispatched_to_address').length}
                </p>
                <p>Delivered</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-500">
                  {orders.filter(o => ['in_transit', 'arrived_in_india', 'custom_clearance'].includes(o.status)).length}
                </p>
                <p>In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-500">
                  {orders.filter(o => ['waiting_for_confirmation', 'arrived_at_warehouse', 'accepted_by_oneprice', 'ready_to_dispatch'].includes(o.status)).length}
                </p>
                <p>Processing</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Notice */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-primary">Online Payments Coming Soon!</p>
              <p className="text-sm text-muted-foreground mt-1">
                For payment inquiries, please contact our team directly.
              </p>
            </div>
            <Button asChild className="gap-2">
              <a href="https://wa.me/+919989724320" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Contact WhatsApp
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>Get started with your first import in 5 easy steps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="relative">
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors h-full">
                    {/* Step number */}
                    <span className="text-xs font-medium text-muted-foreground mb-2">
                      Step {step.number}
                    </span>
                    {/* Icon with number overlay */}
                    <div className="relative w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center border-2 border-background">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                  </div>
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 items-center">
                      <div className="w-6 h-0.5 bg-border" />
                      <ArrowRight className="h-3 w-3 text-muted-foreground -ml-1" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your latest shipment activity</CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/orders">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No orders yet. Start your first import!</p>
              <Button asChild>
                <Link href="/orders">Create Order</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/track-package?tracking=${order.tracking_number}`}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <div className="space-y-1">
                    <p className="font-medium font-mono group-hover:text-primary transition-colors">
                      {order.tracking_number}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.num_boxes} {order.num_boxes === 1 ? 'box' : 'boxes'} • ${order.shipment_value}
                    </p>
                  </div>
                  <div className="w-32">
                    <TrackingProgress currentStatus={order.status} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

