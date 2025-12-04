'use client';

import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import { X, Plus } from 'lucide-react';
import Image from 'next/image';

interface MultiImageUploadProps {
  folder?: string;
  maxImages?: number;
  currentImages?: string[];
  onImagesChange: (urls: string[]) => void;
  label?: string;
  locale?: string;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  folder = 'portfolio',
  maxImages = 5,
  currentImages = [],
  onImagesChange,
  label,
  locale = 'ar',
}) => {
  const [images, setImages] = useState<string[]>(currentImages);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (url: string) => {
    if (url && !images.includes(url)) {
      const newImages = [...images, url];
      setImages(newImages);
      onImagesChange(newImages);
    }
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {maxImages && (
            <span className="text-gray-500 font-normal">
              {' '}
              ({images.length}/{maxImages})
            </span>
          )}
        </label>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Existing Images */}
        {images.map((url, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={url}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover rounded-lg border-2 border-gray-200"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Add New Image */}
        {canAddMore && (
          <div className="aspect-square">
            <ImageUpload
              folder={folder}
              onUploadComplete={handleImageUpload}
              locale={locale}
              aspectRatio="square"
            />
          </div>
        )}
      </div>

      {!canAddMore && (
        <p className="mt-2 text-sm text-gray-500 font-medium">
          {locale === 'ar'
            ? `وصلت إلى الحد الأقصى من الصور (${maxImages})`
            : `Vous avez atteint la limite d'images (${maxImages})`}
        </p>
      )}
    </div>
  );
};

export default MultiImageUpload;
