import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

import { trackPageView } from "@/lib/analytics";

export function AnalyticsPageTracker() {
  const [location] = useLocation();
  const hasTrackedInitialPage = useRef(false);

  useEffect(() => {
    if (!hasTrackedInitialPage.current) {
      hasTrackedInitialPage.current = true;
      return;
    }

    trackPageView(
      `${window.location.pathname}${window.location.search}`,
      document.title
    );
  }, [location]);

  return null;
}
