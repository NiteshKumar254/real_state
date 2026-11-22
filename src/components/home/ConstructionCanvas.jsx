import React, { useRef, useEffect } from 'react';

/**
 * ConstructionCanvas
 * Renders the construction frames onto an HTML5 Canvas with High-DPI scaling
 * and "cover" aspect-ratio preservation.
 * 100% crystal-clear rendering with ZERO overlay effects, ZERO tinting, ZERO darkening.
 */
export default function ConstructionCanvas({ getRenderableImage, targetFrameIndex }) {
  const canvasRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isDestroyed = false;

    const render = () => {
      if (isDestroyed || !canvas) return;

      const { img } = getRenderableImage(targetFrameIndex);
      if (!img || !img.complete || img.naturalWidth === 0) {
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for high-perf
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // "Cover" math: maintain aspect ratio and fill display dimensions
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const imgAspect = imgWidth / imgHeight;
      const canvasAspect = displayWidth / displayHeight;

      let drawWidth = displayWidth;
      let drawHeight = displayHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > imgAspect) {
        // Canvas is wider than image
        drawHeight = displayWidth / imgAspect;
        offsetY = (displayHeight - drawHeight) / 2;
      } else {
        // Canvas is taller than image
        drawWidth = displayHeight * imgAspect;
        offsetX = (displayWidth - drawWidth) / 2;
      }

      // Draw frame directly: 100% crystal-clear, raw, natural colors with ZERO overlay effects
      ctx.clearRect(0, 0, displayWidth, displayHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      ctx.restore();
    };

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(render);

    return () => {
      isDestroyed = true;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [getRenderableImage, targetFrameIndex]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      style={{ display: 'block' }}
    />
  );
}
