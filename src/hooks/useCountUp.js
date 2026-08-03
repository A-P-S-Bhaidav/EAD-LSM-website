'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Custom hook for count-up animation
 * @param {number} end - Target number to count up to
 * @param {number} duration - Animation duration in milliseconds (default: 2000)
 * @param {boolean} startOnView - Whether to start animation when element is in view (default: true)
 * @returns {Object} - { count, ref } where count is the current animated value and ref is for the element
 */
export function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Only animate once and only if in view (or if startOnView is false)
    if (hasAnimated.current || (startOnView && !isInView)) {
      return;
    }

    hasAnimated.current = true;
    const startTime = Date.now();
    const startValue = 0;

    // Easing function for smooth animation (ease-out cubic)
    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Apply easing
      const easedProgress = easeOutCubic(progress);
      const currentCount = Math.floor(startValue + (end - startValue) * easedProgress);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure we end at exact target
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isInView, startOnView]);

  return { count, ref };
}

/**
 * Parse numeric value from a string (e.g., "30+" -> 30, "30,000+" -> 30000)
 * @param {string} value - The value string to parse
 * @returns {number} - The parsed numeric value
 */
export function parseNumericValue(value) {
  if (typeof value === 'number') return value;
  
  // Remove all non-digit characters except decimal points
  const cleaned = value.replace(/[^\d.]/g, '');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format a count value back to display string (e.g., 30 -> "30+", 30000 -> "30K+")
 * @param {number} count - The numeric count
 * @param {string} originalFormat - The original format string (e.g., "30+", "30K+")
 * @returns {string} - Formatted string
 */
export function formatCountValue(count, originalFormat) {
  const hasPlus = originalFormat.includes('+');
  const hasCr = originalFormat.toLowerCase().includes('cr');
  const hasK = originalFormat.toLowerCase().includes('k');
  const hasCurrency = originalFormat.includes('₹');

  let formatted = count.toString();

  // Add suffix based on original format
  if (hasCr) {
    formatted = count + 'Cr';
  } else if (hasK) {
    // Format thousands
    if (count >= 1000) {
      formatted = (count / 1000).toFixed(0) + 'K';
    } else {
      formatted = count + 'K';
    }
  }

  // Add plus if original had it
  if (hasPlus) {
    formatted = formatted + '+';
  }

  // Add currency symbol if original had it
  if (hasCurrency) {
    formatted = '₹' + formatted;
  }

  return formatted;
}
