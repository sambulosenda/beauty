import { Calendar, Clock } from "lucide-react"
import { format } from "date-fns"

interface ReviewDetailsProps {
  service: any
  selectedDate: Date | null
  selectedTime: string | null
}

export function ReviewDetails({ service, selectedDate, selectedTime }: ReviewDetailsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium">{service.name}</h3>
        <p className="text-sm text-gray-500">{service.duration} minutes</p>
      </div>
      {selectedDate && selectedTime && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {format(selectedDate, 'MMMM d, yyyy')}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {selectedTime}
          </div>
        </div>
      )}
    </div>
  )
} 
