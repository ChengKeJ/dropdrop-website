import { getCleanPath } from "@/lib/i18n";

export const BLOG_POST_ROUTE_PATTERN = /^\/blog\/[^/]+$/;

export const ROUTE_PATHS = {
  home: "/",
  blogIndex: "/blog",
  blogPost: "/blog/:slug",
  faq: "/faq",
  about: "/about",
  privacy: "/privacy",
  terms: "/terms",
  changelog: "/changelog",
  editorialPolicy: "/editorial-policy",
  researchMethodology: "/research-methodology",
  notFound: "/404",
} as const;

export type RouteId = keyof typeof ROUTE_PATHS;

const STATIC_ROUTE_IDS = new Map<string, RouteId>([
  [ROUTE_PATHS.home, "home"],
  [ROUTE_PATHS.blogIndex, "blogIndex"],
  [ROUTE_PATHS.faq, "faq"],
  [ROUTE_PATHS.about, "about"],
  [ROUTE_PATHS.privacy, "privacy"],
  [ROUTE_PATHS.terms, "terms"],
  [ROUTE_PATHS.changelog, "changelog"],
  [ROUTE_PATHS.editorialPolicy, "editorialPolicy"],
  [ROUTE_PATHS.researchMethodology, "researchMethodology"],
  [ROUTE_PATHS.notFound, "notFound"],
]);

export function normalizePath(path: string): string {
  const pathname = path.split("?")[0] || "/";

  if (pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function matchRouteId(path: string): RouteId {
  const cleanPath = getCleanPath(normalizePath(path));
  const staticRouteId = STATIC_ROUTE_IDS.get(cleanPath);

  if (staticRouteId) {
    return staticRouteId;
  }

  if (BLOG_POST_ROUTE_PATTERN.test(cleanPath)) {
    return "blogPost";
  }

  return "notFound";
}

export function getInternalRoutePath(href: string): string | null {
  if (!href) {
    return null;
  }

  if (/^(mailto:|tel:|javascript:)/i.test(href)) {
    return null;
  }

  if (typeof window === "undefined") {
    return href.startsWith("/") ? href : null;
  }

  const url = new URL(href, window.location.origin);
  if (url.origin !== window.location.origin) {
    return null;
  }

  return `${url.pathname}${url.search}`;
}
