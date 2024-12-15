'use client'

import { BusinessGallery } from '@/components/business/business-gallery'
import { useState } from 'react'
import { toast } from 'sonner'

interface GalleryClientProps {
  initialGallery: string[]
}

export function GalleryClient({ initialGallery }: GalleryClientProps) {
  const [images, setImages] = useState<string[]>(initialGallery)

  const handleUpdateGallery = async (newImages: string[]): Promise<void> => {
    try {
      const response = await fetch('/api/business/gallery', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ images: newImages })
      })

      if (!response.ok) {
        throw new Error('Failed to update gallery')
      }

      const data = await response.json()
      setImages(data.gallery || newImages)
    } catch (error) {
      console.error('Failed to update gallery:', error)
      toast.error('Failed to save gallery')
      throw error
    }
  }

  return (
    <BusinessGallery 
      images={images} 
      onUpdate={handleUpdateGallery}
      isEditing={true}
    />
  )
} 
