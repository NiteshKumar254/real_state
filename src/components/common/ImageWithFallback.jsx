import React from 'react';
import { handleImageError } from '../../utils/imageHelpers';

export default function ImageWithFallback({
  src,
  alt = "",
  className = "",
  fallback = "/assets/images/hero/house-after.jpg",
  ...props
}) {
  return (
    <img
      src={src || fallback}
      alt={alt}
      onError={(e) => handleImageError(e, fallback)}
      className={className}
      loading="lazy"
      {...props}
    />
  );
}
