import { lazy, type ComponentType } from "react";
import { getInternalRoutePath, matchRouteId, type RouteId } from "@/lib/routes";
import type { RouteComponentMap } from "./AppRoutes";

type PageModule = { default: ComponentType<any> };
type RouteLoader = () => Promise<PageModule>;
type RouteLoaderMap = Record<RouteId, RouteLoader>;

function createLazyRoute(loader: RouteLoader) {
  return lazy(loader) as unknown as ComponentType<any>;
}

export const clientRouteLoaders: RouteLoaderMap = {
  home: () => import("../pages/Home"),
  blogIndex: () => import("../pages/Blog"),
  blogPost: () => import("../pages/BlogPost"),
  faq: () => import("../pages/FAQ"),
  about: () => import("../pages/About"),
  privacy: () => import("../pages/Privacy"),
  terms: () => import("../pages/Terms"),
  changelog: () => import("../pages/Changelog"),
  editorialPolicy: () => import("../pages/EditorialPolicy"),
  researchMethodology: () => import("../pages/ResearchMethodology"),
  notFound: () => import("../pages/NotFound"),
};

export const clientRouteComponents: RouteComponentMap = {
  home: createLazyRoute(clientRouteLoaders.home),
  blogIndex: createLazyRoute(clientRouteLoaders.blogIndex),
  blogPost: createLazyRoute(clientRouteLoaders.blogPost),
  faq: createLazyRoute(clientRouteLoaders.faq),
  about: createLazyRoute(clientRouteLoaders.about),
  privacy: createLazyRoute(clientRouteLoaders.privacy),
  terms: createLazyRoute(clientRouteLoaders.terms),
  changelog: createLazyRoute(clientRouteLoaders.changelog),
  editorialPolicy: createLazyRoute(clientRouteLoaders.editorialPolicy),
  researchMethodology: createLazyRoute(clientRouteLoaders.researchMethodology),
  notFound: createLazyRoute(clientRouteLoaders.notFound),
};

export async function preloadRouteModule(pathnameOrHref: string) {
  const pathname = getInternalRoutePath(pathnameOrHref);
  if (!pathname) {
    return;
  }

  const routeId = matchRouteId(pathname);
  await clientRouteLoaders[routeId]();
}

export function prefetchRouteModule(pathnameOrHref: string) {
  void preloadRouteModule(pathnameOrHref);
}
