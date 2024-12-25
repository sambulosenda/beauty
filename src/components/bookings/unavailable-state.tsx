import { Alert, AlertDescription } from "../ui/alert";

export function UnavailableState() {
  return (
    <Alert variant="destructive">
      <AlertDescription>
        This service is currently unavailable for booking. Please try again later.
      </AlertDescription>
    </Alert>
  )
} 
