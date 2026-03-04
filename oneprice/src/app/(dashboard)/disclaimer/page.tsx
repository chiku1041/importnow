import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo } from '@/components/logo'
import { AlertTriangle, MessageCircle } from 'lucide-react'

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Logo size="md" showTagline={false} />
        <span className="text-2xl font-bold">- Disclaimer</span>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle>Important Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <h3>Service Disclaimer</h3>
          <p>
            One Price (Buy Import Now) provides import shipment tracking and logistics coordination services. 
            By using our platform, you acknowledge and agree to the following:
          </p>

          <h4>1. Shipping Times</h4>
          <p>
            All estimated delivery times are approximate and based on standard processing conditions. 
            Actual delivery times may vary due to customs clearance, weather conditions, carrier delays, 
            or other factors beyond our control. The standard estimated delivery time is approximately 
            <strong> 14 business days</strong> from warehouse receipt.
          </p>

          <h4>2. Pricing</h4>
          <p>
            Our pricing is based on per-kilogram rates, with weight rounded to the nearest <strong>0.5 kg</strong>. 
            Final shipping costs will be calculated based on the actual weight of your shipment. 
            Contact our team via WhatsApp for current rates.
          </p>

          <h4>3. Customs and Duties</h4>
          <p>
            Import customs duties, taxes, and fees are the responsibility of the customer. 
            These charges vary by destination country and are not included in our shipping rates. 
            We recommend familiarizing yourself with your country&apos;s import regulations.
          </p>

          <h4>4. Prohibited Items</h4>
          <p>
            Users are responsible for ensuring that all shipped items comply with export and import 
            regulations of both the origin and destination countries. Prohibited, restricted, or 
            illegal items must not be shipped through our service.
          </p>

          <h4>5. Liability Limitations</h4>
          <p>
            While we take every precaution to ensure safe handling of your shipments, One Price 
            is not liable for damages, losses, or delays caused by third-party carriers, customs 
            authorities, or circumstances beyond our control. We recommend obtaining shipping 
            insurance for valuable items.
          </p>

          <h4>6. Service Modifications</h4>
          <p>
            We reserve the right to modify, suspend, or discontinue any aspect of our service 
            at any time without prior notice. Pricing, terms, and service features may be updated 
            periodically.
          </p>

          <h4>7. Contact Information</h4>
          <p>
            For questions, concerns, or clarifications regarding this disclaimer or our services, 
            please contact our support team.
          </p>
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <MessageCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-primary">Questions?</p>
              <p className="text-sm text-muted-foreground mt-1">
                Contact us via{' '}
                <a 
                  href="https://wa.me/+919989724320" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline font-medium"
                >
                  WhatsApp
                </a>{' '}
                for any clarifications.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

