import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import BookingSteps from "./booking-steps"

interface BookingDialogProps {
  serviceId: string
}

export default function BookingDialog({ serviceId }: BookingDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full md:w-auto">
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="text-xl font-semibold mb-4">
          Book Appointment
        </DialogTitle>
        <BookingSteps serviceId={serviceId} onComplete={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
} 
