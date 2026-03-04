import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo } from '@/components/logo'
import { Lock, MessageCircle } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Logo size="md" showTagline={false} />
        <span className="text-2xl font-bold">- Privacy Policy</span>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle>Your Privacy Matters</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            <strong>Last Updated:</strong> January 2026
          </p>

          <p>
            One Price (Buy Import Now) is committed to protecting your privacy. This policy 
            explains how we collect, use, and safeguard your information.
          </p>

          <h3>Information We Collect</h3>
          
          <h4>Account Information</h4>
          <p>When you create an account, we collect:</p>
          <ul>
            <li>Email address</li>
            <li>Password (encrypted)</li>
            <li>Full name (optional)</li>
            <li>Phone number (optional)</li>
          </ul>

          <h4>Shipment Information</h4>
          <p>When you create orders, we collect:</p>
          <ul>
            <li>Tracking numbers</li>
            <li>Package contents description</li>
            <li>Shipment values</li>
            <li>Number of boxes</li>
          </ul>

          <h3>How We Use Your Information</h3>
          <p>We use your information to:</p>
          <ul>
            <li>Process and track your shipments</li>
            <li>Communicate with you about your orders</li>
            <li>Improve our services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h3>Data Storage and Security</h3>
          <p>
            Your data is stored securely using industry-standard encryption and security practices. 
            We use Supabase for our database infrastructure, which provides enterprise-grade 
            security and compliance standards.
          </p>

          <h3>Data Sharing</h3>
          <p>We do not sell your personal information. We may share data with:</p>
          <ul>
            <li>Shipping carriers (to process deliveries)</li>
            <li>Customs authorities (as required by law)</li>
            <li>Service providers (who assist our operations)</li>
          </ul>

          <h3>Your Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Export your data</li>
          </ul>

          <h3>Cookies</h3>
          <p>
            We use essential cookies for authentication and session management. 
            We do not use tracking or advertising cookies.
          </p>

          <h3>Changes to This Policy</h3>
          <p>
            We may update this privacy policy from time to time. We will notify users of 
            significant changes via email or through our platform.
          </p>

          <h3>Contact Us</h3>
          <p>
            For privacy-related questions or requests, please contact our team.
          </p>
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <MessageCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-primary">Privacy Questions?</p>
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
                for any privacy-related inquiries.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

