const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs').promises;




// This can be ran from the command line to check all links in the MDX files in a directory
// This tests each one to see if its valid or not to help catch broken links in the documentation

/**
 * Configuration constants
 */
const CONFIG = {
  DIRECTORY: './content',                // Docs Content directory
  DEV_SERVER: 'http://localhost:3000',  // Development Server URL
  TIMEOUT: 15000,                     // Timeout in milliseconds
  USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // More browser-like User-Agent
  DEFAULT_HEADERS: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Referer': 'https://www.google.com/'
  },
  EXCLUDED_DOMAINS: [          // Domains known to block automated requests
    'twitter.com',
    'x.com',
  ],
  SPECIAL_DOMAINS: {           // Domains requiring special handling
    // 'the-guild.dev': {
    //   headers: {
    //     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    //     'Accept-Language': 'en-US,en;q=0.5',
    //     'Cache-Control': 'no-cache',
    //     'Pragma': 'no-cache',
    //     'Referer': 'https://www.google.com/'
    //   }
    // }
  }
};

/**
 * Checks all MDX files in a directory for broken links
 * @param {string} directory - The directory to check
 * @param {Object} options - Configuration options
 * @returns {Promise<Array>} - Results of link checking
 */
async function checkMdxLinks(directory = CONFIG.DIRECTORY, options = {}) {
  const {
    devServerUrl = CONFIG.DEV_SERVER,
    followRedirects = true,
    timeout = CONFIG.TIMEOUT,
    userAgent = CONFIG.USER_AGENT,
    excludedDomains = CONFIG.EXCLUDED_DOMAINS,
    specialDomains = CONFIG.SPECIAL_DOMAINS,
    verbose = false
  } = options;
  
  const results = [];
  const linkCache = new Map(); // Cache for link check results

  /**
   * Recursively finds all MDX files in a directory
   */
  async function findMdxFiles(dir) {
    const files = await fs.readdir(dir);
    const mdxFiles = [];

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        mdxFiles.push(...(await findMdxFiles(filePath)));
      } else if (file.endsWith('.mdx')) {
        mdxFiles.push(filePath);
      }
    }

    return mdxFiles;
  }

  /**
   * Extracts links from an MDX file
   */
  async function extractLinksFromMdx(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n');
      const links = [];
  
      lines.forEach((line, index) => {
        // Skip lines that are MDX comments
        if (line.trim().startsWith('{/*')) return;
        
        // Match Markdown links: [text](url)
        const markdownRegex = /\[.*?\]\(((?:https?:\/\/|\/)[^\s)"']+)\)/g;
        let match;
        
        while ((match = markdownRegex.exec(line)) !== null) {
          links.push({
            url: match[1],
            lineNumber: index + 1,
            lineContent: line.trim()
          });
        }
        
        // Also match HTML links: <a href="url">
        const htmlRegex = /<a\s+(?:[^>]*?\s+)?href="((?:https?:\/\/|\/)[^"]*?)"/g;
        while ((match = htmlRegex.exec(line)) !== null) {
          links.push({
            url: match[1],
            lineNumber: index + 1,
            lineContent: line.trim()
          });
        }
      });
  
      return links;
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
      return [];
    }
  }

  /**
   * Checks if a URL is excluded
   */
  function isExcludedUrl(url) {
    return excludedDomains.some(domain => url.includes(domain));
  }

  /**
   * Gets domain from URL
   */
  function getDomainFromUrl(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch (e) {
      return null;
    }
  }

  /**
   * Checks if a URL is valid
   */
  async function checkUrl(url) {
    // Check cache first
    if (linkCache.has(url)) {
      return linkCache.get(url);
    }

    // Skip excluded domains
    if (isExcludedUrl(url)) {
      const result = {
        url,
        status: 'skipped (excluded domain)',
        isValid: true, // Consider excluded domains as valid to avoid failures
        excluded: true
      };
      linkCache.set(url, result);
      return result;
    }

    try {
      // Handle internal links differently
      if (url.startsWith('/')) {
        const result = await checkInternalUrl(url);
        linkCache.set(url, result);
        return result;
      }
  
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
  
      // Use default headers instead of just User-Agent
      let headers = { ...CONFIG.DEFAULT_HEADERS };
      
      // Still allow special domain overrides if needed
      const domain = getDomainFromUrl(url);
      if (domain && specialDomains[domain]) {
        headers = { ...headers, ...specialDomains[domain].headers };
        if (verbose) {
          console.log(`Overriding default headers for domain: ${domain}`);
        }
      }
      
      try {
        // Try GET request first as it's more reliable
        const response = await fetch(url, {
          method: 'GET',
          redirect: followRedirects ? 'follow' : 'manual',
          headers,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        // Handle redirects specially
        const isRedirect = response.status >= 300 && response.status < 400;
        
        const result = {
          url,
          status: response.status,
          isValid: response.ok || isRedirect,
          redirect: isRedirect ? response.headers.get('location') : null
        };
        
        linkCache.set(url, result);
        return result;
      } catch (fetchError) {
        // Some sites block GET requests, try HEAD as fallback
        try {
          const response = await fetch(url, {
            method: 'HEAD',
            redirect: followRedirects ? 'follow' : 'manual',
            headers,
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          const isRedirect = response.status >= 300 && response.status < 400;
          
          const result = {
            url,
            status: response.status,
            isValid: response.ok || isRedirect,
            redirect: isRedirect ? response.headers.get('location') : null
          };
          
          linkCache.set(url, result);
          return result;
        } catch (headError) {
          throw fetchError; // Throw the original error if both methods fail
        }
      }
    } catch (error) {
      const result = {
        url,
        status: error.name === 'AbortError' ? 'timeout' : 'network error',
        isValid: false,
        error: error.message
      };
      
      linkCache.set(url, result);
      return result;
    }
  }
  
  /**
   * Checks if an internal URL is valid
   */
  async function checkInternalUrl(url) {
    try {
      // For internal links, check against dev server
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        const response = await fetch(`${devServerUrl}${url}`, {
          method: 'HEAD',
          headers: { 'User-Agent': userAgent },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        return {
          url,
          status: response.status,
          isValid: response.ok,
          internal: true
        };
      } catch (error) {
        // Fallback to file system check if dev server is not running
        const contentPath = path.dirname(directory);
        const localPath = path.join(contentPath, url.replace(/^\//, ''));
        
        // Check if file exists with or without .mdx extension
        for (const checkPath of [localPath, `${localPath}.mdx`, `${localPath}/index.mdx`]) {
          try {
            await fs.access(checkPath);
            return {
              url,
              status: 'ok (file exists)',
              isValid: true,
              internal: true,
              resolvedPath: checkPath
            };
          } catch {
            // Continue to next path to check
          }
        }
        
        return {
          url,
          status: 'file not found (dev server not running)',
          isValid: false,
          internal: true
        };
      }
    } catch (error) {
      return {
        url,
        status: 'error checking internal link',
        isValid: false,
        internal: true,
        error: error.message
      };
    }
  }

  /**
   * Delay between requests to avoid rate limiting
   */
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Processes links in batches to avoid overwhelming servers
   */
  async function processLinksInBatches(links, batchSize = 5, delayMs = 1000) {
    const results = [];
    for (let i = 0; i < links.length; i += batchSize) {
      const batch = links.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(async ({ url, lineNumber, lineContent }) => {
        return {
          ...(await checkUrl(url)),
          lineNumber,
          lineContent
        };
      }));
      results.push(...batchResults);
      if (i + batchSize < links.length) {
        await delay(delayMs);
      }
    }
    return results;
  }

  // Main execution
  console.log(`🔍 Checking MDX links in ${directory}...`);
  const mdxFiles = await findMdxFiles(directory);
  console.log(`Found ${mdxFiles.length} MDX files to check.`);
  
  for (const file of mdxFiles) {
    const urls = await extractLinksFromMdx(file);
    
    if (urls.length === 0) continue;
    
    if (verbose) {
      console.log(`Checking ${urls.length} links in ${path.relative(directory, file)}...`);
    }
    
    const linkChecks = await processLinksInBatches(urls);

    results.push({
      file: path.relative(directory, file),
      links: linkChecks.map(check => ({
        ...check,
        location: file
      }))
    });
  }

  return results;
}

// CLI execution
if (require.main === module) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const options = {
    devServerUrl: process.env.DEV_SERVER_URL || CONFIG.DEV_SERVER,
    followRedirects: true,
    timeout: process.env.LINK_CHECK_TIMEOUT ? parseInt(process.env.LINK_CHECK_TIMEOUT) : CONFIG.TIMEOUT,
    excludedDomains: CONFIG.EXCLUDED_DOMAINS,
    specialDomains: CONFIG.SPECIAL_DOMAINS,
    verbose: args.includes('--verbose')
  };
  
  // Simple argument parsing
  if (args.includes('--no-follow-redirects')) {
    options.followRedirects = false;
  }
  
  if (args.includes('--include-excluded')) {
    options.excludedDomains = [];
  }
  
  // Get directory from arguments or use default
  let directory = CONFIG.DIRECTORY;
  const dirIndex = args.findIndex(arg => !arg.startsWith('--'));
  if (dirIndex !== -1) {
    directory = args[dirIndex];
  }

  console.log('🔍 Checking MDX links...');
  console.log(`Directory: ${path.resolve(directory)}`);
  console.log(`Dev Server: ${options.devServerUrl}`);
  console.log(`Follow Redirects: ${options.followRedirects}`);
  console.log(`Timeout: ${options.timeout}ms`);
  console.log(`Excluded Domains: ${options.excludedDomains.join(', ') || 'None'}`);
  
  checkMdxLinks(directory, options)
    .then((results) => {
      console.log('\n📊 Link Checking Results:');

      let totalLinks = 0;
      let brokenLinks = 0;
      let redirectLinks = 0;
      let excludedLinks = 0;

      results.forEach(({ file, links }) => {
        totalLinks += links.length;
        
        const invalidLinks = links.filter(link => !link.isValid);
        const redirectedLinks = links.filter(link => link.redirect);
        const excludedLinkCount = links.filter(link => link.excluded).length;
        
        brokenLinks += invalidLinks.length;
        redirectLinks += redirectedLinks.length;
        excludedLinks += excludedLinkCount;

        if (invalidLinks.length > 0) {
          console.log(`\n📄 ${file}`);
          invalidLinks.forEach(({ url, status, lineNumber }) => {
            const fullPath = path.join(process.cwd(), directory, file);
            console.log(`  ❌ ${url} (${status})`);
            console.log(`     ${fullPath}:${lineNumber}:1`);
          });
        }
        
        if (redirectedLinks.length > 0 && options.followRedirects) {
          console.log(`\n📄 ${file} (redirects)`);
          redirectedLinks.forEach(({ url, redirect, lineNumber }) => {
            const fullPath = path.join(process.cwd(), file);
            console.log(`  ↪️ ${url} → ${redirect}`);
            console.log(`     ${fullPath}:${lineNumber}:1`);
          });
        }
      });

      console.log(`\n📝 Summary:`);
      console.log(`Total Links: ${totalLinks}`);
      console.log(`Broken Links: ${brokenLinks}`);
      console.log(`Redirected Links: ${redirectLinks}`);
      console.log(`Excluded Links: ${excludedLinks}`);
      console.log(`Working Links: ${totalLinks - brokenLinks}`);
      
      // Provide hints for common issues
      if (brokenLinks > 0) {
        console.log('\n💡 Troubleshooting Tips:');
        console.log('- Some websites block automated requests. Try manually visiting broken links.');
        console.log('- Consider adding problematic domains to the EXCLUDED_DOMAINS list.');
        console.log('- Try increasing the timeout for slow websites.');
        console.log('- Run with --verbose flag for more detailed output.');
      }
      
      // Exit with error code if there are broken links
      if (brokenLinks > 0) {
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Error running link checker:', error);
      process.exit(1);
    });
}

module.exports = { checkMdxLinks };