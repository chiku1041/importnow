import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center py-16">
          {/* 404 Visual */}
          <div className="mb-8">
            <p className="text-8xl md:text-9xl font-bold text-[#0B1F33] opacity-20">404</p>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-[#666666] mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. 
            It might have been moved or doesn&apos;t exist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/">
                <Home className="h-5 w-5" />
                Go Home
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">
                <ArrowLeft className="h-5 w-5" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


