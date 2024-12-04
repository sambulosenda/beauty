"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon } from "lucide-react"
import { ServiceDialog } from "@/components/services/service-dialog"

export function ServicesContent() {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
        <Button onClick={() => setShowDialog(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-4 gap-4 p-4 font-medium">
              <div>Service</div>
              <div>Duration</div>
              <div>Price</div>
              <div>Actions</div>
            </div>
            <div className="p-4 text-sm text-gray-500">
              No services found
            </div>
          </div>
        </CardContent>
      </Card>

      <ServiceDialog open={showDialog} onOpenChange={setShowDialog} />
    </div>
  )
}