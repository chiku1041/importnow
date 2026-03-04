'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createClient } from '@/lib/supabase/client'
import { useUser } from '@/lib/hooks/use-user'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2, MapPin, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

// Indian states list
const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
]

// Form validation schema
const deliveryAddressSchema = z.object({
  full_address: z
    .string()
    .min(10, 'Full address must be at least 10 characters')
    .max(500, 'Full address must be less than 500 characters'),
  street: z
    .string()
    .min(2, 'Street name must be at least 2 characters')
    .max(200, 'Street name must be less than 200 characters'),
  area: z
    .string()
    .min(2, 'Area must be at least 2 characters')
    .max(200, 'Area must be less than 200 characters'),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters'),
  state: z.string().min(1, 'Please select a state'),
  pincode: z
    .string()
    .regex(/^[1-9][0-9]{5}$/, 'Pincode must be a valid 6-digit Indian pincode'),
  mobile_number: z
    .string()
    .regex(/^[6-9][0-9]{9}$/, 'Mobile number must be a valid 10-digit Indian mobile number'),
})

type DeliveryAddressFormValues = z.infer<typeof deliveryAddressSchema>

export default function DeliveryLocationPage() {
  const { profile, loading: userLoading } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [fetchingAddress, setFetchingAddress] = useState(true)
  const [existingAddressId, setExistingAddressId] = useState<string | null>(null)

  const form = useForm<DeliveryAddressFormValues>({
    resolver: zodResolver(deliveryAddressSchema),
    defaultValues: {
      full_address: '',
      street: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      mobile_number: '',
    },
  })

  // Fetch existing delivery address on mount
  useEffect(() => {
    async function fetchExistingAddress() {
      if (!profile || userLoading) {
        setFetchingAddress(false)
        return
      }

      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('delivery_addresses')
          .select('*')
          .eq('user_id', profile.id)
          .single()

        if (error && error.code !== 'PGRST116') {
          // PGRST116 is "not found" error, which is fine
          console.error('Error fetching delivery address:', error)
        }

        if (data) {
          setExistingAddressId(data.id)
          form.reset({
            full_address: data.full_address,
            street: data.street,
            area: data.area,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            mobile_number: data.mobile_number || '',
          })
        }
      } catch (error) {
        console.error('Unexpected error fetching address:', error)
      } finally {
        setFetchingAddress(false)
      }
    }

    fetchExistingAddress()
  }, [profile, userLoading, form])

  async function onSubmit(data: DeliveryAddressFormValues) {
    if (!profile) {
      toast.error('Please sign in to save your delivery address')
      return
    }

    setLoading(true)
    setSuccess(false)

    try {
      const supabase = createClient()
      
      const addressData = {
        user_id: profile.id,
        full_address: data.full_address,
        street: data.street,
        area: data.area,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        mobile_number: data.mobile_number,
        is_default: true, // Since only one address per user, it's always default
      }

      let error
      if (existingAddressId) {
        // Update existing address
        const { error: updateError } = await supabase
          .from('delivery_addresses')
          .update(addressData)
          .eq('id', existingAddressId)
        error = updateError
      } else {
        // Insert new address (upsert will handle if user_id already exists due to unique constraint)
        const { error: upsertError } = await supabase
          .from('delivery_addresses')
          .upsert(addressData, {
            onConflict: 'user_id',
          })
        error = upsertError
      }

      if (error) {
        console.error('Error saving delivery address:', error)
        toast.error('Failed to save delivery address. Please try again.')
        setLoading(false)
        return
      }

      toast.success(existingAddressId ? 'Delivery address updated successfully!' : 'Delivery address saved successfully!')
      setSuccess(true)
      
      // Update existingAddressId if it was a new insert
      if (!existingAddressId) {
        const { data: savedAddress } = await supabase
          .from('delivery_addresses')
          .select('id')
          .eq('user_id', profile.id)
          .single()
        if (savedAddress) {
          setExistingAddressId(savedAddress.id)
        }
      }
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/dashboard')
        router.refresh()
      }, 1500)
    } catch (error) {
      console.error('Unexpected error:', error)
      toast.error('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  if (userLoading || fetchingAddress) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 px-4 sm:px-6 lg:px-0">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <MapPin className="h-6 w-6 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold">Delivery Location</h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Enter your delivery address for local delivery of shipments in India
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-700 dark:text-green-400">
                  Address Saved Successfully!
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your delivery address has been saved. Redirecting...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>{existingAddressId ? 'Edit Delivery Address' : 'Delivery Address Details'}</CardTitle>
          <CardDescription>
            {existingAddressId 
              ? 'Update your delivery address information'
              : 'Please provide complete address information for accurate delivery'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Address */}
              <FormField
                control={form.control}
                name="full_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Address *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter complete address including building name, floor, etc."
                        className="min-h-[100px] resize-none"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include building name, apartment number, floor, and any landmarks
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Street */}
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street / Road Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., MG Road, Park Street"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Area */}
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area / Locality *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Koramangala, Andheri East"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City and State in a grid for larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Mumbai, Bangalore"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={loading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {INDIAN_STATES.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Pincode and Mobile Number in a grid for larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode *</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="e.g., 560001"
                          maxLength={6}
                          disabled={loading}
                          {...field}
                          onChange={(e) => {
                            // Only allow numbers
                            const value = e.target.value.replace(/\D/g, '')
                            field.onChange(value)
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter 6-digit Indian pincode
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobile_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number *</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="e.g., 9876543210"
                          maxLength={10}
                          disabled={loading}
                          {...field}
                          onChange={(e) => {
                            // Only allow numbers
                            const value = e.target.value.replace(/\D/g, '')
                            field.onChange(value)
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter 10-digit Indian mobile number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  className="w-full sm:w-auto sm:min-w-[200px]"
                  disabled={loading || success}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <MapPin className="mr-2 h-4 w-4" />
                      {existingAddressId ? 'Update Delivery Address' : 'Save Delivery Address'}
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-primary">Delivery Information</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your delivery address will be used for local delivery of shipments within India. 
                Make sure all details are accurate to avoid delivery delays.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

