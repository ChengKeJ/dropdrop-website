export type Language = "en" | "zh";

export const DEFAULT_LANGUAGE: Language = "en";
export const SUPPORTED_LANGUAGES: Language[] = ["en", "zh"];

/**
 * Check if the current path implies Chinese language
 */
export function isChinesePath(path: string): boolean {
  return path.startsWith("/zh");
}

/**
 * Get the language from a given path
 */
export function getLanguageFromPath(path: string): Language {
  return isChinesePath(path) ? "zh" : "en";
}

/**
 * Remove the language prefix from a path (get the canonical path)
 * e.g. /zh/about -> /about
 * e.g. /about -> /about
 */
export function getCleanPath(path: string): string {
  if (isChinesePath(path)) {
    return path.substring(3) || "/";
  }
  return path || "/";
}

/**
 * Generate a path for a specific language
 * e.g. (/about, zh) -> /zh/about
 * e.g. (/about, en) -> /about
 */
export function getLocalizedPath(path: string, targetLang: Language): string {
  const cleanPath = getCleanPath(path);

  if (targetLang === "zh") {
    // Prevent double slashes if cleanPath is just '/'
    return `/zh${cleanPath === "/" ? "" : cleanPath}`;
  }

  return cleanPath;
}
