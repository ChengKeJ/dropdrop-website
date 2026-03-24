const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { getAllPublicRoutes } = require('./site-manifest.cjs');

function getOutputPath(route) {
  if (route === '/') {
    return path.join(__dirname, '../dist/public/index.html');
  }

  if (route === '/404') {
    return path.join(__dirname, '../dist/public/404.html');
  }

  const routeDir = route.replace(/^\//, '');
  return path.join(__dirname, '../dist/public', routeDir, 'index.html');
}

async function prerender() {
  const templatePath = path.join(__dirname, '../dist/public/index.html');
  const template = fs.readFileSync(templatePath, 'utf8');
  const serverEntryPath = pathToFileURL(
    path.join(__dirname, '../dist/server/entry-server.js')
  ).href;
  const { render } = await import(serverEntryPath);

  const routes = getAllPublicRoutes({ include404: true });

  routes.forEach((route) => {
    const result = render(route);
    const html = template
      .replace('<!--app-head-->', result.head)
      .replace('<!--app-html-->', result.appHtml)
      .replace('<!--app-html-attrs-->', result.htmlAttributes ? ` ${result.htmlAttributes}` : '');
    const outputPath = getOutputPath(route);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html);
  });

  console.log(`Prerendered ${routes.length} static routes.`);
}

prerender().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
