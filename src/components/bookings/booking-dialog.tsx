import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import BookingSteps from "./booking-steps"
import { X } from "lucide-react"

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
      <DialogContent className="sm:max-w-[600px] p-0">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Book Appointment</h2>
          <button 
            onClick={() => setOpen(false)}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <BookingSteps serviceId={serviceId} onComplete={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
} 
