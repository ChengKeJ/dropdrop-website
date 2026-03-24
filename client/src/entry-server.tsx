import { renderToString } from "react-dom/server";
import ServerApp from "./ServerApp";
import { getRouteStatus } from "./lib/routeStatus";
import { getCleanPath } from "./lib/i18n";

interface RenderResult {
  appHtml: string;
  head: string;
  htmlAttributes: string;
  status: number;
}

function buildHreflangLinks(pathname: string, status: number) {
  if (status !== 200) {
    return "";
  }

  const cleanPath = getCleanPath(pathname);
  if (cleanPath === "/404") {
    return "";
  }

  const origin = "https://www.dropdrophabit.com";
  const normalizedPath = cleanPath === "/" ? "/" : cleanPath;
  const enUrl = `${origin}${normalizedPath === "/" ? "/" : normalizedPath}`;
  const zhUrl = `${origin}/zh${normalizedPath === "/" ? "" : normalizedPath}`;

  return [
    `<link rel="alternate" hreflang="en" href="${enUrl}"/>`,
    `<link rel="alternate" hreflang="zh" href="${zhUrl}"/>`,
    `<link rel="alternate" hreflang="x-default" href="${enUrl}"/>`,
  ].join("");
}

export function render(url: string): RenderResult {
  const requestUrl = new URL(url, "https://www.dropdrophabit.com");
  const pathname = requestUrl.pathname;
  const helmetContext: Record<string, any> = {};
  const location = `${pathname}${requestUrl.search}`;
  const staticLocationHook = (() => [location, () => undefined] as const) as any;
  staticLocationHook.searchHook = () => requestUrl.search.slice(1);

  const appHtml = renderToString(
    <ServerApp
      initialPath={pathname}
      locationHook={staticLocationHook}
      helmetContext={helmetContext}
    />
  );

  const helmet = helmetContext.helmet;
  const status = getRouteStatus(pathname);

  return {
    appHtml,
    head: [
      helmet?.title?.toString() ?? "",
      helmet?.priority?.toString?.() ?? "",
      helmet?.meta?.toString() ?? "",
      helmet?.link?.toString() ?? "",
      helmet?.script?.toString() ?? "",
      buildHreflangLinks(pathname, status),
    ].join(""),
    htmlAttributes: helmet?.htmlAttributes?.toString() ?? "",
    status,
  };
}
