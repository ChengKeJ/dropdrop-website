import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { isChinesePath } from "@/lib/i18n";

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

type LocationHook = (() => [string, (path: string, ...args: any[]) => any]) & {
  searchHook?: () => string;
};

export interface AppShellProps {
  children: ReactNode;
  initialPath?: string;
  locationHook?: LocationHook;
  helmetContext?: Record<string, unknown>;
}

export default function AppShell({
  children,
  initialPath = "/",
  locationHook,
  helmetContext,
}: AppShellProps) {
  const base = isChinesePath(initialPath) ? "/zh" : "";
  const routerProps = locationHook ? { hook: locationHook } : {};

  return (
    <ErrorBoundary>
      <HelmetProvider context={helmetContext}>
        <WouterRouter base={base} {...routerProps}>
          <LanguageProvider base={base}>
            <ThemeProvider defaultTheme="light">
              <TooltipProvider>
                <Toaster />
                {children}
              </TooltipProvider>
            </ThemeProvider>
          </LanguageProvider>
        </WouterRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
