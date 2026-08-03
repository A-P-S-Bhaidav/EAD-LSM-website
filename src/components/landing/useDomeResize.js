'use client';
import { useEffect } from 'react';
import { clamp } from './dome-utils';

export default function useDomeResize({
  rootRef, viewerRef, frameRef, mainRef, rotationRef, fit, fitBasis, minRadius, maxRadius, padFactor,
  overlayBlurColor, imageBorderRadius, openedImageBorderRadius, grayscale, openedImageWidth, openedImageHeight
}) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width), h = Math.max(1, cr.height);
      const minDim = Math.min(w, h), maxDim = Math.max(w, h), aspect = w / h;
      let basis = fitBasis === 'min' ? minDim : fitBasis === 'max' ? maxDim : fitBasis === 'width' ? w : fitBasis === 'height' ? h : (aspect >= 1.3 ? w : minDim);
      let radius = clamp(Math.min(basis * fit, h * 1.35), minRadius, maxRadius);
      
      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty('--radius', `${Math.round(radius)}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      
      const el = root.querySelector('.sphere');
      if (el) el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;

      const enlarged = viewerRef.current?.querySelector('.enlarge');
      if (enlarged && frameRef.current && mainRef.current) {
        const frameR = frameRef.current.getBoundingClientRect();
        const mainR = mainRef.current.getBoundingClientRect();
        if (openedImageWidth && openedImageHeight) {
          const temp = document.createElement('div');
          temp.style.cssText = `position: absolute; width: ${openedImageWidth}; height: ${openedImageHeight}; visibility: hidden;`;
          document.body.appendChild(temp);
          const tempR = temp.getBoundingClientRect();
          document.body.removeChild(temp);
          enlarged.style.left = `${frameR.left - mainR.left + (frameR.width - tempR.width) / 2}px`;
          enlarged.style.top = `${frameR.top - mainR.top + (frameR.height - tempR.height) / 2}px`;
        } else {
          enlarged.style.left = `${frameR.left - mainR.left}px`;
          enlarged.style.top = `${frameR.top - mainR.top}px`;
          enlarged.style.width = `${frameR.width}px`;
          enlarged.style.height = `${frameR.height}px`;
        }
      }
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius, openedImageBorderRadius, openedImageWidth, openedImageHeight]);
}
