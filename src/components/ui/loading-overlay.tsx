interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = "Loading..." }: LoadingOverlayProps) {
  return (
    <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mx-auto mb-4" />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
} 
