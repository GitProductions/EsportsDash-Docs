import { getPageMap } from 'nextra/page-map';

export const dynamic = "force-static";
export const revalidate = false;

const BASE_URL = "https://docs.esportsdash.com";

export default async function sitemap() {
  // Get Nextra's page map which contains all your MDX routes
  const pageMap = await getPageMap();

  // Function to extract routes recursively
  function extractRoutes(items, parentPath = '') {
    let routes = [];
    
    for (const item of items) {
      // Skip items with 'display: false' in frontmatter
      if (item.frontMatter?.display === false) continue;

      let currentPath = parentPath;
      
      // If it's a page/folder (not a separator or meta file)
      if (item.kind === 'MdxPage' || item.kind === 'Folder') {
        // Add the slug to build the path
        currentPath = `${parentPath}/${item.name}`;
        
        // If it's an index page, use the parent path
        if (item.name === 'index') {
          currentPath = parentPath;
        }
        
        // Clean up the path
        currentPath = currentPath.replace(/^\/+/, ''); // Remove leading slashes
        
        // For pages, add to routes
        if (item.kind === 'MdxPage') {
          routes.push({
            url: `${BASE_URL}/${currentPath}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: currentPath === '' ? 1 : 0.8,
          });
        }
      }
      
      // Process children recursively
      if (item.children?.length) {
        routes = [...routes, ...extractRoutes(item.children, currentPath)];
      }
    }
    
    return routes;
  }

  // Extract all routes from the page map
  const routes = extractRoutes(pageMap);

  // Ensure the root route is included
  if (!routes.some(route => route.url === `${BASE_URL}/`)) {
    routes.push({
      url: `${BASE_URL}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1,
    });
  }

  return routes;
}