export function StatsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-24 rounded-lg bg-gray-100 animate-pulse" />
      ))}
    </div>
  )
} 
