const fs = require('fs');
const path = require('path');
const { loadGeneratedBlogPosts } = require('./blog-data.cjs');

const BASE_URL = 'https://www.dropdrophabit.com';

const STATIC_ROUTES = [
  '/',
  '/blog',
  '/faq',
  '/about',
  '/privacy',
  '/terms',
  '/changelog',
  '/editorial-policy',
  '/research-methodology',
];

function getBlogSlugs() {
  const slugs = loadGeneratedBlogPosts().map((post) => post.slug);
  return [...new Set(slugs)].sort();
}

function localizeRoute(route, language) {
  if (language === 'zh') {
    return route === '/' ? '/zh' : `/zh${route}`;
  }

  return route;
}

function getAllPublicRoutes(options = {}) {
  const { include404 = false } = options;
  const routes = [];

  STATIC_ROUTES.forEach((route) => {
    routes.push(route);
    routes.push(localizeRoute(route, 'zh'));
  });

  getBlogSlugs().forEach((slug) => {
    routes.push(`/blog/${slug}`);
    routes.push(`/zh/blog/${slug}`);
  });

  if (include404) {
    routes.push('/404');
  }

  return routes;
}

function getCleanRoute(route) {
  if (route.startsWith('/zh/')) {
    return route.slice(3);
  }

  if (route === '/zh') {
    return '/';
  }

  return route;
}

function getAlternateUrls(route) {
  const cleanRoute = getCleanRoute(route);
  const normalizedRoute = cleanRoute === '' ? '/' : cleanRoute;
  const enUrl = `${BASE_URL}${normalizedRoute === '/' ? '/' : normalizedRoute}`;
  const zhUrl = `${BASE_URL}/zh${normalizedRoute === '/' ? '' : normalizedRoute}`;

  return {
    enUrl,
    zhUrl,
  };
}

function getCanonicalUrl(route) {
  return `${BASE_URL}${route === '/' ? '/' : route}`;
}

function getPriorityConfig(route) {
  const cleanRoute = getCleanRoute(route);

  if (cleanRoute === '/') {
    return { priority: '1.0', changefreq: 'daily' };
  }

  if (cleanRoute === '/blog') {
    return { priority: '0.9', changefreq: 'daily' };
  }

  if (cleanRoute.startsWith('/blog/')) {
    return { priority: '0.8', changefreq: 'weekly' };
  }

  if (cleanRoute === '/faq' || cleanRoute === '/about') {
    return { priority: '0.7', changefreq: 'monthly' };
  }

  if (cleanRoute === '/changelog') {
    return { priority: '0.7', changefreq: 'weekly' };
  }

  if (cleanRoute === '/editorial-policy' || cleanRoute === '/research-methodology') {
    return { priority: '0.6', changefreq: 'monthly' };
  }

  if (cleanRoute === '/privacy' || cleanRoute === '/terms') {
    return { priority: '0.5', changefreq: 'yearly' };
  }

  return { priority: '0.6', changefreq: 'monthly' };
}

function writeStaticAsset(relativePath, content) {
  const targetPath = path.join(__dirname, '../dist/public', relativePath);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, content);
}

module.exports = {
  BASE_URL,
  STATIC_ROUTES,
  getAllPublicRoutes,
  getAlternateUrls,
  getBlogSlugs,
  getCanonicalUrl,
  getCleanRoute,
  getPriorityConfig,
  localizeRoute,
  writeStaticAsset,
};
