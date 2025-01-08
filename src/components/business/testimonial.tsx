import { Star } from "lucide-react"
import Image from "next/image"
import React from "react"

interface TestimonialProps {
  quote: string
  author: string
  role: string
  image: string
  rating: number
}

export function Testimonial({ quote, author, role, image, rating }: TestimonialProps) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#8AB861]/50 transition-all duration-300">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star 
            key={i}
            className="w-5 h-5 fill-yellow-400 text-yellow-400" 
          />
        ))}
      </div>
      <blockquote className="text-gray-700 mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-4">
        <Image
          src={image}
          alt={author}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <div className="font-semibold text-gray-900">{author}</div>
          <div className="text-gray-600 text-sm">{role}</div>
        </div>
      </div>
    </div>
  )
} 
