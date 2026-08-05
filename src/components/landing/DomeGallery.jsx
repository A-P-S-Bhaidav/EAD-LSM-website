'use client';
import { useMemo, useRef, useCallback, useEffect } from 'react';
import { DEFAULT_IMAGES, DEFAULTS, buildItems } from './dome-utils';
import useDomeResize from './useDomeResize';
import useDomeInertia from './useDomeInertia';
import useDomeEnlarge from './useDomeEnlarge';
import './DomeGallery.css';

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#120F17',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = '250px',
  openedImageHeight = '350px',
  imageBorderRadius = '30px',
  openedImageBorderRadius = '30px',
  grayscale = true
}) {
  const rootRef = useRef(null);
  const mainRef = useRef(null);
  const sphereRef = useRef(null);
  const frameRef = useRef(null);
  const viewerRef = useRef(null);
  const scrimRef = useRef(null);
  const focusedElRef = useRef(null);
  const originalTilePositionRef = useRef(null);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const { rotationRef, draggingRef, movedRef, lastDragEndAt, applyTransform } = useDomeInertia({
    sphereRef, mainRef, focusedElRef, dragDampening, maxVerticalRotationDeg, dragSensitivity
  });

  useDomeResize({
    rootRef, viewerRef, frameRef, mainRef, rotationRef, fit, fitBasis, minRadius, maxRadius, padFactor,
    overlayBlurColor, imageBorderRadius, openedImageBorderRadius, grayscale, openedImageWidth, openedImageHeight
  });

  const { openItemFromElement, openingRef } = useDomeEnlarge({
    rootRef, viewerRef, frameRef, mainRef, scrimRef, focusedElRef, originalTilePositionRef,
    rotationRef, segments, enlargeTransitionMs, openedImageWidth, openedImageHeight
  });

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
    return () => {
      document.body.classList.remove('dg-scroll-lock');
    };
  }, [applyTransform, rotationRef]);

  const onTileClick = useCallback(e => {
    if (draggingRef.current || movedRef.current || performance.now() - lastDragEndAt.current < 80 || openingRef.current) return;
    openItemFromElement(e.currentTarget);
  }, [draggingRef, movedRef, lastDragEndAt, openingRef, openItemFromElement]);

  const onTilePointerUp = useCallback(e => {
    if (e.pointerType !== 'touch' || draggingRef.current || movedRef.current || performance.now() - lastDragEndAt.current < 80 || openingRef.current) return;
    openItemFromElement(e.currentTarget);
  }, [draggingRef, movedRef, lastDragEndAt, openingRef, openItemFromElement]);

  return (
    <div
      ref={rootRef}
      className="sphere-root"
      style={{
        ['--segments-x']: segments,
        ['--segments-y']: segments,
        ['--overlay-blur-color']: overlayBlurColor,
        ['--tile-radius']: imageBorderRadius,
        ['--enlarge-radius']: openedImageBorderRadius,
        ['--image-filter']: grayscale ? 'grayscale(1)' : 'none'
      }}
    >
      <main ref={mainRef} className="sphere-main">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => (
              <div
                key={`${it.x},${it.y},${i}`}
                className="item"
                data-src={it.src}
                data-offset-x={it.x}
                data-offset-y={it.y}
                data-size-x={it.sizeX}
                data-size-y={it.sizeY}
                style={{
                  ['--offset-x']: it.x,
                  ['--offset-y']: it.y,
                  ['--item-size-x']: it.sizeX,
                  ['--item-size-y']: it.sizeY
                }}
              >
                <div
                  className="item__image"
                  role="button"
                  tabIndex={0}
                  aria-label={it.alt || 'Open image'}
                  onClick={onTileClick}
                  onPointerUp={onTilePointerUp}
                  suppressHydrationWarning
                >
                  <img src={it.src} draggable={false} alt={it.alt} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />

        <div className="viewer" ref={viewerRef}>
          <div ref={scrimRef} className="scrim" />
          <div ref={frameRef} className="frame" />
        </div>
      </main>
    </div>
  );
}
