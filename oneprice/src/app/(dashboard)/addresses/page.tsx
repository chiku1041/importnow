'use client'

import { useState } from 'react'
import { useWarehouses } from '@/lib/hooks/use-warehouses'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { MapPin, Copy, Check, Globe, MessageCircle } from 'lucide-react'

function AddressesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-5 w-96" />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    </div>
  )
}

interface CopyButtonProps {
  text: string
}

function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="gap-2"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-500" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy Address
        </>
      )}
    </Button>
  )
}

export default function AddressesPage() {
  const { warehousesByCountry, loading, error } = useWarehouses()

  if (loading) {
    return <AddressesSkeleton />
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="py-8 text-center">
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  const countries = Object.keys(warehousesByCountry)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Warehouse Addresses</h1>
        <p className="text-muted-foreground">
          Use these addresses when shipping from your suppliers. Share the appropriate address based on your supplier&apos;s location.
        </p>
      </div>

      {/* Info Card */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <MessageCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-700 dark:text-amber-400">Important</p>
              <p className="text-sm text-muted-foreground mt-1">
                After sharing the warehouse address with your supplier, make sure to create an order with the tracking number once you receive it.
                Need help choosing a warehouse? Contact us via{' '}
                <a 
                  href="https://wa.me/+919989724320" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline font-medium"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {countries.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No warehouses available</h3>
            <p className="text-muted-foreground">
              Warehouse addresses will appear here once they are added by the admin.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {countries.map((country) => (
            <div key={country} className="space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">{country}</h2>
                <Badge variant="secondary" className="ml-2">
                  {warehousesByCountry[country].length} {warehousesByCountry[country].length === 1 ? 'warehouse' : 'warehouses'}
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {warehousesByCountry[country].map((warehouse) => (
                  <Card key={warehouse.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            {warehouse.state}
                          </CardTitle>
                          <CardDescription>{warehouse.country}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-mono whitespace-pre-wrap">
                          {warehouse.address}
                        </p>
                      </div>
                      
                      {warehouse.notes && (
                        <p className="text-sm text-muted-foreground">
                          <strong>Note:</strong> {warehouse.notes}
                        </p>
                      )}
                      
                      <CopyButton text={warehouse.address} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

