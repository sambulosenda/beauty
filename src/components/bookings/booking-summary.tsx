import { format } from 'date-fns';
import { formatCurrency } from '@/lib/utils';

interface BookingSummaryProps {
  service: any;
  selectedDate: Date | null;
  selectedTime: string | null;
}

export function BookingSummary({ service, selectedDate, selectedTime }: BookingSummaryProps) {
  if (!service) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 md:relative bg-white border-t md:border md:rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{service.name}</h3>
          {selectedDate && selectedTime && (
            <p className="text-sm text-gray-500">
              {format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
            </p>
          )}
        </div>
        <div className="text-xl font-bold text-rose-600">
          {service.price && formatCurrency(parseFloat(service.price))}
        </div>
      </div>
    </div>
  );
} 
