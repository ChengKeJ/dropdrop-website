import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
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
