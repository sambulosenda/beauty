"use client";

import { BusinessGallery } from "@/components/business/business-gallery";
import React from "react";

interface BusinessGalleryClientProps {
  images: string[];
}

export function BusinessGalleryClient({ images }: BusinessGalleryClientProps) {
  return (
    <BusinessGallery
      images={images}
      onUpdate={async () => {}}
      isEditing={false}
    />
  );
}
