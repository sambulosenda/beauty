import { Loader2 } from "lucide-react"

export function LoadingState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center p-6">
      <Loader2 className="h-6 w-6 animate-spin" />
      <span className="ml-2">{message}</span>
    </div>
  )
} 
