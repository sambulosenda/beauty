'use client'

import { ImageUpload } from '@/components/ui/image-upload'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState } from 'react'
import { Trash } from 'lucide-react'

interface BusinessGalleryProps {
  images: string[]
  onUpdate: (images: string[]) => Promise<void>
  isEditing?: boolean
}

export function BusinessGallery({ images, onUpdate, isEditing = false }: BusinessGalleryProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleImageAdd = async (newImage: string) => {
    setIsLoading(true)
    try {
      await onUpdate([...images, newImage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageRemove = async (imageToRemove: string) => {
    setIsLoading(true)
    try {
      await onUpdate(images.filter(image => image !== imageToRemove))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square">
            {isEditing && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 z-10"
                onClick={() => handleImageRemove(image)}
                disabled={isLoading}
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
      {isEditing && (
        <div className="mt-4">
          <ImageUpload
            value=""
            onChange={handleImageAdd}
            disabled={isLoading}
          />
        </div>
      )}
    </div>
  )
} 
