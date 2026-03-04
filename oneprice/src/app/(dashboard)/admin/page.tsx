'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/hooks/use-user'
import { useOrders, OrderWithUser } from '@/lib/hooks/use-orders'
import { useWarehouses } from '@/lib/hooks/use-warehouses'
import { createClient } from '@/lib/supabase/client'
import { StatusBadge } from '@/components/status-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Plus, Pencil, Trash2, Loader2, ShieldAlert, Package, MapPin, Users, User, Eye, Phone, Mail, Home } from 'lucide-react'
import { format } from 'date-fns'
import type { OrderStatus, Warehouse, Profile } from '@/types/database'
import { TRACKING_STEPS, getStepFromStatus } from '@/types/database'
import { TrackingProgress } from '@/components/tracking-stepper'

const statuses: OrderStatus[] = [
  'waiting_for_confirmation',
  'arrived_at_warehouse',
  'accepted_by_oneprice',
  'ready_to_dispatch',
  'in_transit',
  'arrived_in_india',
  'custom_clearance',
  'dispatched_to_address',
]

const statusLabels: Record<OrderStatus, string> = {
  'waiting_for_confirmation': '1. Waiting for Confirmation',
  'arrived_at_warehouse': '2. Arrived at Warehouse',
  'accepted_by_oneprice': '3. Accepted by OnePrice',
  'ready_to_dispatch': '4. Ready to Dispatch',
  'in_transit': '5. In Transit',
  'arrived_in_india': '6. Arrived in India',
  'custom_clearance': '7. Custom Clearance',
  'dispatched_to_address': '8. Dispatched to Address',
}

function AdminSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-96" />
    </div>
  )
}

// Warehouse Management Section
function WarehouseManagement() {
  const { warehouses, loading, refetch } = useWarehouses()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Form state
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')

  function resetForm() {
    setCountry('')
    setState('')
    setAddress('')
    setNotes('')
    setEditingWarehouse(null)
    setError(null)
  }

  function openEditSheet(warehouse: Warehouse) {
    setEditingWarehouse(warehouse)
    setCountry(warehouse.country)
    setState(warehouse.state)
    setAddress(warehouse.address)
    setNotes(warehouse.notes || '')
    setSheetOpen(true)
  }

  function openNewSheet() {
    resetForm()
    setSheetOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormLoading(true)
    setError(null)

    const supabase = createClient()
    const warehouseData = { country, state, address, notes: notes || null }

    if (editingWarehouse) {
      const { error } = await supabase
        .from('warehouses')
        .update(warehouseData as never)
        .eq('id', editingWarehouse.id)

      if (error) {
        setError(error.message)
        setFormLoading(false)
        return
      }
    } else {
      const { error } = await supabase
        .from('warehouses')
        .insert(warehouseData as never)

      if (error) {
        setError(error.message)
        setFormLoading(false)
        return
      }
    }

    setFormLoading(false)
    setSheetOpen(false)
    resetForm()
    refetch()
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this warehouse?')) return

    const supabase = createClient()
    const { error } = await supabase.from('warehouses').delete().eq('id', id)

    if (error) {
      alert(error.message)
      return
    }

    refetch()
  }

  if (loading) {
    return <Skeleton className="h-96" />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Warehouses</h2>
          <p className="text-sm text-muted-foreground">
            Manage warehouse locations for shipments
          </p>
        </div>
        <Sheet open={sheetOpen} onOpenChange={(open) => {
          setSheetOpen(open)
          if (!open) resetForm()
        }}>
          <SheetTrigger asChild>
            <Button onClick={openNewSheet} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Warehouse
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {editingWarehouse ? 'Edit Warehouse' : 'Add Warehouse'}
              </SheetTitle>
              <SheetDescription>
                {editingWarehouse ? 'Update warehouse details' : 'Add a new warehouse location'}
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g., China"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g., Guangdong"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter full warehouse address"
                  required
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional notes for users"
                  rows={2}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <SheetClose asChild>
                  <Button type="button" variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </SheetClose>
                <Button type="submit" disabled={formLoading} className="flex-1">
                  {formLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editingWarehouse ? (
                    'Update'
                  ) : (
                    'Create'
                  )}
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {warehouses.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No warehouses added yet</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouses.map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell className="font-medium">{warehouse.country}</TableCell>
                  <TableCell>{warehouse.state}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{warehouse.address}</TableCell>
                  <TableCell className="max-w-[150px] truncate text-muted-foreground">
                    {warehouse.notes || '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditSheet(warehouse)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(warehouse.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}

// Order Management Section
function OrderManagement() {
  const { isAdmin } = useUser()
  const { orders, loading, refetch } = useOrders({ isAdmin })
  const { warehouses } = useWarehouses()
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<OrderWithUser | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  async function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    setUpdatingId(orderId)
    
    console.log('Updating order:', orderId, 'to status:', newStatus, 'type:', typeof newStatus)
    
    const supabase = createClient()
    const { data, error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)
      .select()

    if (error) {
      console.error('Update error:', error)
      alert(error.message)
    } else {
      console.log('Update success:', data)
    }

    setUpdatingId(null)
    refetch()
  }

  const getWarehouseName = (warehouseId: string) => {
    const warehouse = warehouses.find(w => w.id === warehouseId)
    return warehouse ? `${warehouse.country} - ${warehouse.state}` : 'Unknown'
  }

  if (loading) {
    return <Skeleton className="h-96" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">All Orders</h2>
        <p className="text-sm text-muted-foreground">
          Manage and update order statuses for all users
        </p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No orders yet</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Tracking #</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead className="text-center">Boxes</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="min-w-[200px]">Status</TableHead>
                  <TableHead className="w-[80px]">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const orderWithUser = order as OrderWithUser
                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <User className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate max-w-[150px]">
                              {orderWithUser.profile?.full_name || 'Unknown User'}
                            </p>
                            <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                              {orderWithUser.profile?.email || '-'}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{order.tracking_number}</TableCell>
                      <TableCell>{getWarehouseName(order.warehouse_id)}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{order.box_content}</TableCell>
                      <TableCell className="text-center">{order.num_boxes}</TableCell>
                      <TableCell className="text-right">${order.shipment_value}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(order.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        <div className="w-20">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-500 to-primary transition-all duration-300 rounded-full"
                              style={{ width: `${(getStepFromStatus(order.status) / 8) * 100}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 text-center">
                            {getStepFromStatus(order.status)}/8
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                          disabled={updatingId === order.id}
                        >
                          <SelectTrigger className="w-[200px]">
                            {updatingId === order.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <SelectValue>
                                <span className="text-xs">{statusLabels[order.status]}</span>
                              </SelectValue>
                            )}
                          </SelectTrigger>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                <span className="text-sm">{statusLabels[status]}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(orderWithUser)
                            setDetailsOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* Order Details Sheet */}
      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Order Details</SheetTitle>
            <SheetDescription>
              View complete order and customer information
            </SheetDescription>
          </SheetHeader>
          
          {selectedOrder && (
            <div className="mt-6 space-y-6">
              {/* Order Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Order Information
                </h3>
                <Card>
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tracking #</span>
                      <span className="text-sm font-medium font-mono">{selectedOrder.tracking_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Warehouse</span>
                      <span className="text-sm font-medium">{getWarehouseName(selectedOrder.warehouse_id)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Content</span>
                      <span className="text-sm font-medium text-right max-w-[200px]">{selectedOrder.box_content}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Boxes</span>
                      <span className="text-sm font-medium">{selectedOrder.num_boxes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Value</span>
                      <span className="text-sm font-medium">${selectedOrder.shipment_value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <StatusBadge status={selectedOrder.status} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Created</span>
                      <span className="text-sm font-medium">{format(new Date(selectedOrder.created_at), 'MMM d, yyyy h:mm a')}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Customer Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Customer Information
                </h3>
                <Card>
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {selectedOrder.profile?.full_name || 'Unknown User'}
                        </p>
                        <p className="text-sm text-muted-foreground">Customer</p>
                      </div>
                    </div>
                    <div className="border-t pt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedOrder.profile?.email || 'No email'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedOrder.profile?.phone || 'No phone number'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Delivery Address
                </h3>
                {selectedOrder.delivery_address ? (
                  <Card>
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <Home className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{selectedOrder.delivery_address.full_address}</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedOrder.delivery_address.street}, {selectedOrder.delivery_address.area}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedOrder.delivery_address.city}, {selectedOrder.delivery_address.state} - {selectedOrder.delivery_address.pincode}
                          </p>
                        </div>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {selectedOrder.delivery_address.mobile_number}
                          </span>
                          <span className="text-xs text-muted-foreground">(Delivery Contact)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-amber-500/30 bg-amber-500/5">
                    <CardContent className="py-6 text-center">
                      <MapPin className="h-8 w-8 mx-auto text-amber-500 mb-2" />
                      <p className="text-sm text-muted-foreground">
                        No delivery address set by this customer
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Close Button */}
              <div className="pt-4">
                <SheetClose asChild>
                  <Button variant="outline" className="w-full">
                    Close
                  </Button>
                </SheetClose>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

// Users Section
function UsersManagement() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfiles() {
      const supabase = createClient()
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      
      setProfiles(data || [])
      setLoading(false)
    }
    fetchProfiles()
  }, [])

  if (loading) {
    return <Skeleton className="h-96" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Users</h2>
        <p className="text-sm text-muted-foreground">
          View registered users
        </p>
      </div>

      {profiles.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No users registered yet</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.email}</TableCell>
                  <TableCell>{profile.full_name || '-'}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      profile.role === 'admin' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {profile.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(profile.created_at), 'MMM d, yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}

export default function AdminPage() {
  const { isAdmin, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/dashboard')
    }
  }, [isAdmin, loading, router])

  if (loading) {
    return <AdminSkeleton />
  }

  if (!isAdmin) {
    return (
      <Card className="border-destructive">
        <CardContent className="py-16 text-center">
          <ShieldAlert className="h-16 w-16 mx-auto text-destructive mb-4" />
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">
            You don&apos;t have permission to access the admin panel.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage warehouses, orders, and users
        </p>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders" className="gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Orders</span>
          </TabsTrigger>
          <TabsTrigger value="warehouses" className="gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Warehouses</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <OrderManagement />
        </TabsContent>
        
        <TabsContent value="warehouses">
          <WarehouseManagement />
        </TabsContent>
        
        <TabsContent value="users">
          <UsersManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}

