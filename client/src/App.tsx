import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { Route, Switch, Router as WouterRouter, useLocation } from "wouter";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { isChinesePath } from "@/lib/i18n";
import { Loader2 } from "lucide-react";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FAQ = lazy(() => import("./pages/FAQ"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA]">
      <Loader2 className="w-8 h-8 animate-spin text-[#4CAF93]" />
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/blog/:slug"} component={BlogPost} />
        <Route path={"/faq"} component={FAQ} />
        <Route path={"/about"} component={About} />
        <Route path={"/privacy"} component={Privacy} />
        <Route path={"/terms"} component={Terms} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  const [location] = useLocation();
  // Determine base path for routing and language context
  // If path starts with /zh, base is /zh. Otherwise default (empty).
  const base = isChinesePath(location) ? "/zh" : "";

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <WouterRouter base={base}>
          <LanguageProvider base={base}>
            <ThemeProvider defaultTheme="light">
              <TooltipProvider>
                <Toaster />
                <AppRoutes />
                <Analytics />
              </TooltipProvider>
            </ThemeProvider>
          </LanguageProvider>
        </WouterRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
