'use client';

import React, { useState, useRef } from 'react';
import Button from './Button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  folder?: string;
  onUploadComplete: (url: string) => void;
  currentImage?: string;
  label?: string;
  locale?: string;
  maxSize?: number; // in MB
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'any';
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  folder = 'general',
  onUploadComplete,
  currentImage,
  label,
  locale = 'ar',
  maxSize = 5,
  aspectRatio = 'any',
}) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError(
        locale === 'ar'
          ? 'يرجى اختيار ملف صورة'
          : 'Veuillez sélectionner un fichier image'
      );
      return;
    }

    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(
        locale === 'ar'
          ? `حجم الملف كبير جداً. الحد الأقصى ${maxSize}MB`
          : `Fichier trop volumineux. Maximum ${maxSize}MB`
      );
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      onUploadComplete(data.url);
    } catch (err: any) {
      setError(err.message || (locale === 'ar' ? 'فشل الرفع' : 'Échec du téléchargement'));
      setPreview(currentImage || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onUploadComplete('');
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'portrait':
        return 'aspect-[3/4]';
      case 'landscape':
        return 'aspect-[16/9]';
      default:
        return '';
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {label}
        </label>
      )}

      {preview ? (
        <div className="relative">
          <div
            className={`relative w-full rounded-lg overflow-hidden border-2 border-gray-200 ${getAspectRatioClass()}`}
          >
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all ${getAspectRatioClass()}`}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 font-medium">
                  {locale === 'ar' ? 'جاري الرفع...' : 'Téléchargement...'}
                </p>
              </>
            ) : (
              <>
                <div className="p-4 bg-gray-100 rounded-full">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-700 font-semibold mb-1">
                    {locale === 'ar'
                      ? 'انقر لرفع صورة'
                      : 'Cliquez pour télécharger'}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    {locale === 'ar'
                      ? `PNG, JPG, WebP (حتى ${maxSize}MB)`
                      : `PNG, JPG, WebP (jusqu'à ${maxSize}MB)`}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;
