'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useUser } from '@/lib/hooks/use-user'
import { useWarehouses } from '@/lib/hooks/use-warehouses'
import { useDeliveryAddress } from '@/lib/hooks/use-delivery-address'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, MapPin, AlertCircle } from 'lucide-react'

interface OrderFormProps {
  onSuccess?: () => void
}

export function OrderForm({ onSuccess }: OrderFormProps) {
  const { profile } = useUser()
  const { warehouses, loading: warehousesLoading } = useWarehouses()
  const { hasDeliveryAddress, loading: addressLoading } = useDeliveryAddress({ userId: profile?.id })
  const router = useRouter()
  
  const [warehouseId, setWarehouseId] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [boxContent, setBoxContent] = useState('')
  const [numBoxes, setNumBoxes] = useState('1')
  const [shipmentValue, setShipmentValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!profile) return

    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.from('orders').insert({
      user_id: profile.id,
      warehouse_id: warehouseId,
      tracking_number: trackingNumber,
      box_content: boxContent,
      num_boxes: parseInt(numBoxes, 10),
      shipment_value: parseFloat(shipmentValue) || 0,
      status: 'waiting_for_confirmation',
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Reset form
    setWarehouseId('')
    setTrackingNumber('')
    setBoxContent('')
    setNumBoxes('1')
    setShipmentValue('')
    setLoading(false)

    if (onSuccess) {
      onSuccess()
    } else {
      router.push('/orders')
      router.refresh()
    }
  }

  const selectedWarehouse = warehouses.find(w => w.id === warehouseId)

  // Show loading state while checking delivery address
  if (addressLoading) {
    return (
      <Card>
        <CardContent className="py-12 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  // Show message if no delivery address is set
  if (!hasDeliveryAddress) {
    return (
      <Card className="border-amber-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Delivery Address Required
          </CardTitle>
          <CardDescription>
            You need to set up your delivery address before creating an order
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-700 dark:text-amber-300">
                  No delivery address found
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Please add your delivery address first. This address will be used for 
                  local delivery of your shipments within India.
                </p>
              </div>
            </div>
          </div>
          <Button asChild className="w-full gap-2">
            <Link href="/delivery-location">
              <MapPin className="h-4 w-4" />
              Add Delivery Address
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Order</CardTitle>
        <CardDescription>
          Enter your shipment details to track your import
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="warehouse">Warehouse Location</Label>
            <Select
              value={warehouseId}
              onValueChange={setWarehouseId}
              disabled={warehousesLoading}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a warehouse" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map((warehouse) => (
                  <SelectItem key={warehouse.id} value={warehouse.id}>
                    {warehouse.country} - {warehouse.state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedWarehouse && (
              <p className="text-xs text-muted-foreground mt-1">
                {selectedWarehouse.address}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tracking">Tracking Number</Label>
            <Input
              id="tracking"
              type="text"
              placeholder="Enter tracking number from supplier"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Box Content</Label>
            <Textarea
              id="content"
              placeholder="Describe the contents of your shipment (e.g., Electronics, Clothing, etc.)"
              value={boxContent}
              onChange={(e) => setBoxContent(e.target.value)}
              required
              disabled={loading}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="boxes">Number of Boxes</Label>
              <Input
                id="boxes"
                type="number"
                min="1"
                placeholder="1"
                value={numBoxes}
                onChange={(e) => setNumBoxes(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Shipment Value (USD)</Label>
              <Input
                id="value"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={shipmentValue}
                onChange={(e) => setShipmentValue(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading || warehousesLoading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Order...
              </>
            ) : (
              'Create Order'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

