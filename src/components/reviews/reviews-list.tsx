// components/reviews/reviews-list.tsx
import { StarIcon } from 'lucide-react'
import { format } from 'date-fns'

interface Review {
  id: string
  rating: number
  comment: string
  createdAt: Date
  customer: {
    name: string | null
  }
}

export function ReviewsList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{review.customer.name || 'Anonymous'}</span>
              </div>
              <p className="text-xs text-gray-500">
                {format(new Date(review.createdAt), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>
          <p className="text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}