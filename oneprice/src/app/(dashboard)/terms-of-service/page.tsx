import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollText, MessageCircle } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold">OnePrice - Terms of Service</span>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-primary" />
            <CardTitle>Terms and Conditions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            <strong>Effective Date:</strong> January 2026
          </p>

          <p>
            Welcome to One Price (Buy Import Now). By accessing or using our services, 
            you agree to be bound by these Terms of Service.
          </p>

          <h3>1. Services</h3>
          <p>
            One Price provides import shipment tracking and logistics coordination services. 
            Our platform allows users to:
          </p>
          <ul>
            <li>Access warehouse addresses for shipping</li>
            <li>Track their import shipments</li>
            <li>Manage their order history</li>
          </ul>

          <h3>2. Account Registration</h3>
          <p>
            To use our services, you must create an account by providing accurate information. 
            You are responsible for:
          </p>
          <ul>
            <li>Maintaining the confidentiality of your account</li>
            <li>All activities that occur under your account</li>
            <li>Providing accurate and up-to-date information</li>
          </ul>

          <h3>3. Pricing and Payment</h3>
          <p>
            Our pricing is based on per-kilogram rates:
          </p>
          <ul>
            <li>Weight is rounded to the nearest 0.5 kg</li>
            <li>Rates vary by origin and destination</li>
            <li>Online payments coming soon - currently via WhatsApp coordination</li>
            <li>Customs duties and taxes are the customer&apos;s responsibility</li>
          </ul>

          <h3>4. User Responsibilities</h3>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate tracking and shipment information</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not ship prohibited or illegal items</li>
            <li>Pay all applicable fees and charges</li>
          </ul>

          <h3>5. Prohibited Items</h3>
          <p>
            Users must not ship items that are illegal, dangerous, or prohibited by 
            law in either the origin or destination country. This includes but is not 
            limited to weapons, drugs, counterfeit goods, and hazardous materials.
          </p>

          <h3>6. Service Limitations</h3>
          <p>We do not guarantee:</p>
          <ul>
            <li>Specific delivery dates or times</li>
            <li>Uninterrupted or error-free service</li>
            <li>That all items will clear customs</li>
          </ul>

          <h3>7. Liability</h3>
          <p>
            Our liability is limited to the service fees paid for the affected shipment. 
            We are not responsible for consequential, incidental, or indirect damages.
          </p>

          <h3>8. Termination</h3>
          <p>
            We reserve the right to suspend or terminate accounts that violate these terms 
            or engage in fraudulent activity. Users may close their account at any time.
          </p>

          <h3>9. Changes to Terms</h3>
          <p>
            We may update these terms at any time. Continued use of the service after 
            changes constitutes acceptance of the new terms.
          </p>

          <h3>10. Governing Law</h3>
          <p>
            These terms are governed by applicable laws. Any disputes will be resolved 
            through appropriate legal channels.
          </p>

          <h3>11. Contact</h3>
          <p>
            For questions about these terms, please contact our support team.
          </p>
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <MessageCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-primary">Questions About Terms?</p>
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
                if you need clarification on any terms.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

