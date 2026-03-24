let prefetchModulePromise:
  | Promise<typeof import("./clientRoutes")>
  | null = null;

async function loadPrefetchModule() {
  if (!prefetchModulePromise) {
    prefetchModulePromise = import("./clientRoutes");
  }

  return prefetchModulePromise;
}

export function queueRoutePrefetch(pathnameOrHref: string) {
  if (typeof window === "undefined") {
    return;
  }

  void loadPrefetchModule().then(({ prefetchRouteModule }) => {
    prefetchRouteModule(pathnameOrHref);
  });
}
