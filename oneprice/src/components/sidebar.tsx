'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useClerk } from '@clerk/nextjs'
import { useUser } from '@/lib/hooks/use-user'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Separator } from '@/components/ui/separator'
import {
  LayoutDashboard,
  Package,
  MapPin,
  Search,
  Settings,
  Shield,
  FileText,
  Lock,
  ScrollText,
  LogOut,
  Menu,
  Users,
  Truck,
} from 'lucide-react'
import { useState } from 'react'

const mainNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/orders', label: 'Orders', icon: Package },
  { href: '/addresses', label: 'Addresses', icon: MapPin },
  { href: '/delivery-location', label: 'Delivery Location', icon: Truck },
  { href: '/track-package', label: 'Track Package', icon: Search },
]

const settingsNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/security', label: 'Security', icon: Shield },
]

const legalNavItems = [
  { href: '/disclaimer', label: 'Disclaimer', icon: FileText },
  { href: '/privacy-policy', label: 'Privacy Policy', icon: Lock },
  { href: '/terms-of-service', label: 'Terms of Service', icon: ScrollText },
]

const adminNavItems = [
  { href: '/admin', label: 'Admin Panel', icon: Users },
]

interface SidebarContentProps {
  onLinkClick?: () => void
}

function SidebarContent({ onLinkClick }: SidebarContentProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAdmin } = useUser()
  const { signOut } = useClerk()

  async function handleLogout() {
    try {
      await signOut({ redirectUrl: '/sign-in' })
    } catch (error) {
      console.error('Error signing out:', error)
      // Force redirect even if signOut fails
      router.push('/sign-in')
      router.refresh()
    }
  }

  const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: typeof LayoutDashboard }) => (
    <Link
      href={href}
      onClick={onLinkClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
        pathname === href
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Logo size="md" />
      </div>

      <nav className="flex-1 p-4 space-y-6 overflow-y-auto scrollbar-thin">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>

        {isAdmin && (
          <>
            <div>
              <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Administration
              </p>
              <div className="space-y-1">
                {adminNavItems.map((item) => (
                  <NavLink key={item.href} {...item} />
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        <div>
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Account
          </p>
          <div className="space-y-1">
            {settingsNavItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Legal
          </p>
          <div className="space-y-1">
            {legalNavItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col bg-sidebar border-r border-sidebar-border h-screen sticky top-0">
      <SidebarContent />
    </aside>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Main navigation menu for the application</SheetDescription>
        </VisuallyHidden>
        <SidebarContent onLinkClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

