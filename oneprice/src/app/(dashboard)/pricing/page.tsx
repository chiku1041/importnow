'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Pricing</h1>
        <p className="text-muted-foreground">
          Transparent pricing for all your import needs
        </p>
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle>Custom Pricing</CardTitle>
          <CardDescription>
            Our pricing is tailored to your specific import requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Pricing depends on various factors including:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
              <li>Package weight and dimensions</li>
              <li>Destination location</li>
              <li>Shipping method</li>
              <li>Customs and duties</li>
            </ul>
          </div>
          <div className="pt-4">
            <Button asChild className="gap-2">
              <a href="https://wa.me/+919989724320" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Contact Us for Pricing
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
