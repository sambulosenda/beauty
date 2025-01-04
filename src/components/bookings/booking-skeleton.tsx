import { Skeleton } from "@/components/ui/skeleton"

export function BookingSkeletonLoader() {
  return (
    <div className="space-y-8">
      {/* Steps Skeleton */}
      <div className="flex justify-between relative">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="mt-2 space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
        <Skeleton className="absolute top-5 left-0 h-1 w-full" />
      </div>

      {/* Content Skeleton */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-7 gap-2">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Skeleton */}
      <div className="flex justify-between">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  )
} 
