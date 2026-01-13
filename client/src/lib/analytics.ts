/**
 * Google Analytics 4 Integration
 *
 * To use this, add your GA4 measurement ID to the environment
 * or replace 'G-XXXXXXXXXX' below with your actual ID
 */

// Replace this with your actual GA4 measurement ID
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

/**
 * Initialize Google Analytics
 * Call this once when the app loads
 */
export function initGA() {
  if (typeof window === 'undefined') return;
  if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('[Analytics] GA4 Measurement ID not configured. Set VITE_GA_MEASUREMENT_ID environment variable.');
    return;
  }

  // Load gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });

  console.log('[Analytics] Google Analytics initialized');
}

/**
 * Track a custom event
 */
export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', eventName, parameters);

  if (import.meta.env.DEV) {
    console.log('[Analytics] Event:', eventName, parameters);
  }
}

/**
 * Track a page view
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
  });

  if (import.meta.env.DEV) {
    console.log('[Analytics] Page view:', path, title);
  }
}

/**
 * Track download button clicks
 */
export function trackDownload(platform: 'ios' | 'android') {
  trackEvent('download_click', {
    platform,
    page: window.location.pathname
  });
}

/**
 * Track language changes
 */
export function trackLanguageChange(from: string, to: string) {
  trackEvent('language_change', {
    from_language: from,
    to_language: to,
    page: window.location.pathname
  });
}

/**
 * Track navigation clicks
 */
export function trackNavigation(destination: string) {
  trackEvent('navigation_click', {
    destination,
    from_page: window.location.pathname
  });
}

/**
 * Track CTA button clicks
 */
export function trackCTA(ctaName: string, location: string) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location,
    page: window.location.pathname
  });
}

/**
 * Track social share
 */
export function trackSocialShare(platform: string, url: string) {
  trackEvent('share', {
    method: platform,
    content_url: url
  });
}
