'use client';

import { Button } from "@/components/ui/button";

interface StripeSetupButtonProps {
  dashboardUrl: string;
}

export function StripeSetupButton({ dashboardUrl }: StripeSetupButtonProps) {
  return (
    <Button
      className="mt-4 w-full"
      onClick={() => window.open(dashboardUrl, '_blank')}
    >
      Complete Stripe Setup
    </Button>
  );
} 
