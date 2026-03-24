import { getBlogPost } from "@/lib/blog";
import { getCleanPath, getLanguageFromPath } from "@/lib/i18n";
import { BLOG_POST_ROUTE_PATTERN, matchRouteId, normalizePath } from "@/lib/routes";

export function getRouteStatus(path: string): number {
  const normalizedPath = normalizePath(path);
  const cleanPath = getCleanPath(normalizedPath);
  const routeId = matchRouteId(normalizedPath);

  if (routeId === "notFound") {
    return 404;
  }

  if (routeId !== "blogPost") {
    return 200;
  }

  const language = getLanguageFromPath(normalizedPath);
  const isBlogPostPath = BLOG_POST_ROUTE_PATTERN.test(cleanPath);
  const slug = cleanPath.replace("/blog/", "");

  if (isBlogPostPath && slug && getBlogPost(slug, language)) {
    return 200;
  }

  return 404;
}
