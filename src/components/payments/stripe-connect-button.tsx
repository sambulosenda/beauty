'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import React from 'react'


interface StripeConnectButtonProps {
  isConnected: boolean
  accountEnabled?: boolean
}

export function StripeConnectButton({ 
  isConnected, 
  accountEnabled 
}: StripeConnectButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleConnect = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/stripe/connect/account', {
        method: 'POST',
      })
      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // Redirect to Stripe Connect onboarding
      window.location.href = data.url
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to connect with Stripe. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isConnected && accountEnabled) {
    return (
      <Button variant="outline" className="w-full" disabled>
        ✓ Connected with Stripe
      </Button>
    )
  }

  if (isConnected && !accountEnabled) {
    return (
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={handleConnect}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          'Complete Stripe Onboarding'
        )}
      </Button>
    )
  }

  return (
    <Button 
      variant="default" 
      className="w-full"
      onClick={handleConnect}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        'Connect with Stripe'
      )}
    </Button>
  )
} 
