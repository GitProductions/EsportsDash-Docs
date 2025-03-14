import { getPageMap } from 'nextra/page-map';

export const dynamic = "force-static";
export const revalidate = false;

const BASE_URL = "https://docs.esportsdash.com";

export default async function sitemap() {
  const pageMap = await getPageMap();
  const routes = [];
  
  routes.push({
    url: `${BASE_URL}/`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 1,
  });

  // Function to extract routes
  function extractRoutes(items) {
    if (!items || !Array.isArray(items)) return;

    for (const item of items) {
      // Process route if it exists
      if (item.route && !item.href && item.name !== "index") {
        // Skip if it's an external link or index page (already added)
        routes.push({
          url: `${BASE_URL}${item.route}`,
          lastModified: item.frontMatter?.timestamp 
            ? new Date(item.frontMatter.timestamp).toISOString() 
            : new Date().toISOString(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }

      // Process children recursively
      if (item.children) {
        extractRoutes(item.children);
      }
    }
  }

  // Extract routes from the page map
  extractRoutes(pageMap);
  
  return routes;
}