export const DEFAULT_IMAGES = [
  { src: '/gallery/gallery-1.jpeg', alt: 'Gallery Image 1' },
  { src: '/gallery/gallery-2.jpeg', alt: 'Gallery Image 2' },
  { src: '/gallery/gallery-3.jpeg', alt: 'Gallery Image 3' },
  { src: '/gallery/gallery-4.jpeg', alt: 'Gallery Image 4' },
  { src: '/gallery/gallery-5.jpeg', alt: 'Gallery Image 5' },
  { src: '/gallery/gallery-6.jpeg', alt: 'Gallery Image 6' },
  { src: '/gallery/gallery-8.jpeg', alt: 'Gallery Image 8' },
  { src: '/gallery/gallery-9.jpeg', alt: 'Gallery Image 9' },
  { src: '/gallery/gallery-10.jpeg', alt: 'Gallery Image 10' },
  { src: '/gallery/gallery-11.jpeg', alt: 'Gallery Image 11' },
  { src: '/gallery/gallery-12.jpeg', alt: 'Gallery Image 12' },
  { src: '/gallery/gallery-13.jpeg', alt: 'Gallery Image 13' },
  { src: '/gallery/gallery-14.jpeg', alt: 'Gallery Image 14' },
  { src: '/gallery/gallery-15.jpeg', alt: 'Gallery Image 15' },
  { src: '/gallery/gallery-16.jpeg', alt: 'Gallery Image 16' },
];

export const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35
};

export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
export const normalizeAngle = d => ((d % 360) + 360) % 360;
export const wrapAngleSigned = deg => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};
export const getDataNumber = (el, name, fallback) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

export function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map(c => ({ ...c, src: '', alt: '' }));
  }

  const normalized = pool.map(img => typeof img === 'string' ? { src: img, alt: '' } : { src: img.src || '', alt: img.alt || '' });
  const used = Array.from({ length: totalSlots }, (_, i) => normalized[i % normalized.length]);

  for (let i = 1; i < used.length; i++) {
    if (used[i].src === used[i - 1].src) {
      for (let j = i + 1; j < used.length; j++) {
        if (used[j].src !== used[i].src) {
          const tmp = used[i];
          used[i] = used[j];
          used[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: used[i].src,
    alt: used[i].alt
  }));
}

export function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}
