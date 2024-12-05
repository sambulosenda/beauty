// components/reviews/review-form.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { StarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReviewFormProps {
  bookingId: string
  onSuccess?: () => void
}

export function ReviewForm({ bookingId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId,
          rating,
          comment,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit review')
      }

      setRating(0)
      setComment('')
      onSuccess?.()
    } catch (err) {
      setError('Failed to submit review. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className="focus:outline-none"
            >
              <StarIcon
                className={cn(
                  'w-6 h-6',
                  value <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Comment</label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          className="min-h-[100px]"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <Button
        type="submit"
        disabled={isLoading || rating === 0}
        className="w-full"
      >
        {isLoading ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  )
}