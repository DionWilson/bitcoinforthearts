'use client';

import Image from 'next/image';
import { useState } from 'react';

interface StoryEntryProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean;
  isFirst?: boolean;
}

export default function StoryEntry({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  reverse = false,
  isFirst = false,
}: StoryEntryProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`flex items-center gap-8 py-8 ${
      !isFirst ? 'border-t border-gray-300' : ''
    } ${reverse ? 'flex-row-reverse' : ''}`}>
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-2 tracking-tight uppercase">{title}</h2>
        <p className="text-sm text-muted uppercase">{subtitle}</p>
      </div>
      <div className="flex-1">
        <div className="relative w-full h-64 bg-surface border border-border rounded-lg overflow-hidden">
          {imageSrc && !imageError ? (
            <Image
              src={imageSrc}
              alt={imageAlt || 'Story image'}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface text-muted">
              <span className="text-sm">Image placeholder</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

