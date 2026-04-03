import { hydrateRoot } from "react-dom/client";
import ClientApp from "./ClientApp";
import "./index.css";

import "@fontsource/inter/latin-300.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-600.css";

import { reportWebVitals } from "./lib/webVitals";
import { initGA } from "./lib/analytics";
import { preloadRouteModule } from "./routes/clientRoutes";

function loadTelemetry() {
  void Promise.all([
    import("@vercel/analytics"),
    import("@vercel/speed-insights"),
  ]).then(([analyticsModule, speedInsightsModule]) => {
    analyticsModule.inject();
    speedInsightsModule.injectSpeedInsights();
  });
}

function bootstrapClientObservers() {
  loadTelemetry();

  initGA();

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      reportWebVitals();
    });
    return;
  }

  globalThis.setTimeout(() => {
    reportWebVitals();
  }, 1);
}

async function bootstrap() {
  try {
    await preloadRouteModule(window.location.pathname);
  } finally {
    hydrateRoot(
      document.getElementById("root")!,
      <ClientApp initialPath={window.location.pathname} />
    );
    bootstrapClientObservers();
  }
}

void bootstrap();
