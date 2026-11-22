/**
 * Image helpers with fallback handlers
 */

export const FALLBACK_HERO_IMAGE = '/assets/images/hero/house-after.jpg';
export const FALLBACK_LAND_IMAGE = '/assets/images/hero/land-before.jpg';

export function handleImageError(e, fallback = FALLBACK_HERO_IMAGE) {
  if (e.target.src !== fallback) {
    e.target.onerror = null;
    e.target.src = fallback;
  }
}
