'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useUser } from '@/lib/hooks/use-user'
import { useOrders } from '@/lib/hooks/use-orders'
import { useWarehouses } from '@/lib/hooks/use-warehouses'
import { TrackingStepper, TrackingProgress } from '@/components/tracking-stepper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  Search, 
  Package, 
  MessageCircle, 
  Boxes, 
  DollarSign, 
  Calendar, 
  MapPin,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'
import { format } from 'date-fns'
import type { Order } from '@/types/database'
import { TRACKING_STEPS, getStepFromStatus } from '@/types/database'

function TrackingSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-96" />
    </div>
  )
}

function TrackPackageContent() {
  const searchParams = useSearchParams()
  const { profile, loading: userLoading } = useUser()
  const { orders, loading: ordersLoading } = useOrders({ userId: profile?.id })
  const { warehouses } = useWarehouses()
  const [trackingNumber, setTrackingNumber] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [searchError, setSearchError] = useState<string | null>(null)

  // Auto-load tracking from URL parameter
  useEffect(() => {
    const trackingFromUrl = searchParams.get('tracking')
    if (trackingFromUrl && orders.length > 0) {
      setTrackingNumber(trackingFromUrl)
      const foundOrder = orders.find(
        order => order.tracking_number.toLowerCase() === trackingFromUrl.toLowerCase()
      )
      if (foundOrder) {
        setSelectedOrder(foundOrder)
      }
    }
  }, [searchParams, orders])

  if (userLoading || ordersLoading) {
    return <TrackingSkeleton />
  }

  const getWarehouseName = (warehouseId: string) => {
    const warehouse = warehouses.find(w => w.id === warehouseId)
    return warehouse ? `${warehouse.country} - ${warehouse.state}` : 'Unknown'
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearchError(null)
    
    const foundOrder = orders.find(
      order => order.tracking_number.toLowerCase() === trackingNumber.toLowerCase()
    )
    
    if (foundOrder) {
      setSelectedOrder(foundOrder)
    } else {
      setSearchError('No order found with this tracking number. Make sure you have created an order first.')
      setSelectedOrder(null)
    }
  }

  function handleOrderClick(order: Order) {
    setSelectedOrder(order)
    setTrackingNumber(order.tracking_number)
    setSearchError(null)
  }

  function handleTrackAnother() {
    setSelectedOrder(null)
    setTrackingNumber('')
    setSearchError(null)
  }

  const currentStep = selectedOrder ? getStepFromStatus(selectedOrder.status) : null
  const currentConfig = currentStep ? TRACKING_STEPS.find(s => s.step === currentStep) : null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Track Package</h1>
        <p className="text-muted-foreground">
          Enter your tracking number to see where your shipment is
        </p>
      </div>

      {/* Search Form */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter tracking number..."
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <Button type="submit" className="gap-2">
              <Search className="h-4 w-4" />
              Track
            </Button>
          </form>
          {searchError && (
            <p className="text-sm text-destructive mt-3">{searchError}</p>
          )}
        </CardContent>
      </Card>

      {/* Tracking Result */}
      {selectedOrder && (
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
          {/* Track Another Button */}
          <Button 
            variant="ghost" 
            onClick={handleTrackAnother}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Track Another Package
          </Button>

          {/* Order Details Card */}
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-background">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardDescription>Tracking Number</CardDescription>
                  <CardTitle className="text-xl font-mono">
                    {selectedOrder.tracking_number}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                  <Package className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">
                    {currentConfig?.presentLabel}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{getWarehouseName(selectedOrder.warehouse_id)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Boxes className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedOrder.num_boxes} {selectedOrder.num_boxes === 1 ? 'box' : 'boxes'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>${selectedOrder.shipment_value}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(selectedOrder.created_at), 'MMM d, yyyy')}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Contents:</span> {selectedOrder.box_content}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Stepper */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Shipment Progress
              </CardTitle>
              <CardDescription>
                Track your package through each step of the delivery process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TrackingStepper currentStatus={selectedOrder.status} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Orders Quick Access */}
      {!selectedOrder && orders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Your Recent Orders
            </CardTitle>
            <CardDescription>
              Click on an order to view its tracking status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <button
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className="w-full flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent transition-colors text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium font-mono">{order.tracking_number}</p>
                      <p className="text-sm text-muted-foreground">
                        {getWarehouseName(order.warehouse_id)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <TrackingProgress currentStatus={order.status} />
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!selectedOrder && orders.length === 0 && (
        <Card>
          <CardContent className="py-16">
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders to track</h3>
              <p className="text-muted-foreground mb-4">
                Create an order first, then you can track it here
              </p>
              <Button asChild>
                <a href="/orders">Go to Orders</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Card */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <MessageCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-primary">Need Help?</p>
              <p className="text-sm text-muted-foreground mt-1">
                If you have any questions about tracking your package, contact us via{' '}
                <a 
                  href="https://wa.me/+919989724320" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline font-medium text-primary"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function TrackPackagePage() {
  return (
    <Suspense fallback={<TrackingSkeleton />}>
      <TrackPackageContent />
    </Suspense>
  )
}
