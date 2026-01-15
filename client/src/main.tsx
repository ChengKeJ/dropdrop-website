import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Font imports
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";

import { reportWebVitals } from "./lib/webVitals";
import { initGA } from "./lib/analytics";

createRoot(document.getElementById("root")!).render(<App />);

// Initialize analytics and performance monitoring
if (typeof window !== 'undefined') {
  // Initialize Google Analytics
  initGA();

  // Report Web Vitals
  reportWebVitals();
}
