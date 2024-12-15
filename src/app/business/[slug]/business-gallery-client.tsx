'use client'

import { BusinessGallery } from '@/components/business/business-gallery'

interface BusinessGalleryClientProps {
  images: string[]
}

export function BusinessGalleryClient({ images }: BusinessGalleryClientProps) {
  return (
    <BusinessGallery 
      images={images} 
      onUpdate={async () => {}}
      isEditing={false}
    />
  )
} 
