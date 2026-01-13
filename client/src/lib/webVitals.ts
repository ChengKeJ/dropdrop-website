import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals';

/**
 * Web Vitals tracking
 *
 * Tracks Core Web Vitals metrics and sends them to analytics
 * - CLS (Cumulative Layout Shift): < 0.1 is good
 * - FCP (First Contentful Paint): < 1.8s is good
 * - INP (Interaction to Next Paint): < 200ms is good
 * - LCP (Largest Contentful Paint): < 2.5s is good
 * - TTFB (Time to First Byte): < 800ms is good
 */

function sendToAnalytics(metric: Metric) {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('[Web Vitals]', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id
    });
  }

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating
    });
  }

  // You can also send to your own analytics service here
  // Example: fetch('/api/analytics', { method: 'POST', body: JSON.stringify(metric) })
}

export function reportWebVitals() {
  // Only run on client side
  if (typeof window === 'undefined') return;

  // Track all Core Web Vitals
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
