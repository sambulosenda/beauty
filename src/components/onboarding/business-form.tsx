'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"

const businessFormSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  address: z.string().min(5, "Please enter a valid address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  category: z.string().min(1, "Please select a business category"),
  description: z.string().optional(),
})

export function BusinessOnboardingForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof businessFormSchema>>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      businessName: '',
      address: '',
      phone: '',
      category: '',
      description: ''
    }
  })

  async function onSubmit(values: z.infer<typeof businessFormSchema>) {
    console.log('onSubmit triggered')
    console.log('Form values:', values)
    
    if (isLoading) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/business/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to register business')
      }

      const data = await response.json()
      console.log('Registration successful:', data)
      router.push('/dashboard')
    } catch (error) {
      console.error('Registration error:', error)
      alert(error instanceof Error ? error.message : 'Failed to register business')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={(e) => {
          e.preventDefault()
          console.log('Form submitted')
          form.handleSubmit(onSubmit)(e)
        }} 
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Complete Registration"}
        </Button>
      </form>
    </Form>
  )
} 
