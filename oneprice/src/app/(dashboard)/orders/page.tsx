'use client'

import { useState } from 'react'
import { useUser } from '@/lib/hooks/use-user'
import { useOrders } from '@/lib/hooks/use-orders'
import { useWarehouses } from '@/lib/hooks/use-warehouses'
import { StatusBadge } from '@/components/status-card'
import { TrackingProgress } from '@/components/tracking-stepper'
import Link from 'next/link'
import { OrderForm } from '@/components/order-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Plus, Package, Calendar, DollarSign, Boxes, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'

function OrdersSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-36" />
      </div>
      <Skeleton className="h-96" />
    </div>
  )
}

export default function OrdersPage() {
  const { profile, loading: userLoading } = useUser()
  const { orders, loading: ordersLoading } = useOrders({ userId: profile?.id })
  const { warehouses } = useWarehouses()
  const [sheetOpen, setSheetOpen] = useState(false)

  if (userLoading || ordersLoading) {
    return <OrdersSkeleton />
  }

  const getWarehouseName = (warehouseId: string) => {
    const warehouse = warehouses.find(w => w.id === warehouseId)
    return warehouse ? `${warehouse.country} - ${warehouse.state}` : 'Unknown'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage and track your shipments</p>
        </div>
        
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Order
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle>New Order</SheetTitle>
              <SheetDescription>
                Enter your shipment details to start tracking
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <OrderForm onSuccess={() => setSheetOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Orders Table */}
      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-16">
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first order to start tracking your imports
              </p>
              <Button onClick={() => setSheetOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Create New Order
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Mobile Cards View */}
          <div className="grid gap-4 md:hidden">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link 
                        href={`/track-package?tracking=${order.tracking_number}`}
                        className="text-base font-semibold hover:text-primary transition-colors flex items-center gap-1"
                      >
                        {order.tracking_number}
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                      <CardDescription>{getWarehouseName(order.warehouse_id)}</CardDescription>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Tracking Progress */}
                  <div className="mb-4 pb-4 border-b">
                    <TrackingProgress currentStatus={order.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Boxes className="h-4 w-4" />
                      <span>{order.num_boxes} {order.num_boxes === 1 ? 'box' : 'boxes'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>${order.shipment_value}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(order.created_at), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 pt-3 border-t">
                    {order.box_content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <Card className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking Number</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead className="text-center">Boxes</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium font-mono">{order.tracking_number}</TableCell>
                    <TableCell>{getWarehouseName(order.warehouse_id)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {order.box_content}
                    </TableCell>
                    <TableCell className="text-center">{order.num_boxes}</TableCell>
                    <TableCell className="text-right">${order.shipment_value}</TableCell>
                    <TableCell>
                      <div className="w-28">
                        <TrackingProgress currentStatus={order.status} />
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(order.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/track-package?tracking=${order.tracking_number}`}>
                          Track
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </>
      )}
    </div>
  )
}

