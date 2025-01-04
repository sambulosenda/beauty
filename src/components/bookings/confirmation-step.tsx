import { CheckCircle } from "lucide-react"
import { format } from "date-fns"

interface ConfirmationStepProps {
  selectedDate: Date | null
  selectedTime: string | null
  service: any
}

export function ConfirmationStep({ selectedDate, selectedTime, service }: ConfirmationStepProps) {
  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <CheckCircle className="h-12 w-12 text-green-500" />
      </div>
      <h2 className="text-xl font-semibold">Booking Confirmed!</h2>
      <p className="text-gray-600">
        Your appointment for {service.name} on {selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedTime} has been confirmed.
      </p>
    </div>
  )
} 
