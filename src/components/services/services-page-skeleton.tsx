export function ServicesPageSkeleton() {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-64 mb-6"></div>
        <div className="flex gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded-full w-20"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-64"></div>
          ))}
        </div>
      </div>
    )
  }
  
  