// app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Book Your Next Beauty Service
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Connect with top beauty professionals. Book appointments instantly and experience the best in beauty services.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/services">
                  <Button className="px-8">
                    Browse Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/providers">
                  <Button variant="outline" className="px-8">
                    View Providers
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/10">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Popular Services
            </h2>
            {/* Add service cards grid here */}
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Featured Providers
            </h2>
            {/* Add provider cards carousel here */}
          </div>
        </section>
      </main>
    </div>
  );
}