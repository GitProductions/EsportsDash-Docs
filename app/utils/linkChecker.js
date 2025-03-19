const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs').promises;

async function checkMdxLinks(directory = './content') {
  const results = [];

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

  async function extractLinksFromMdx(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      // Match both external (http/https) and internal links with line numbers
      const lines = content.split('\n');
      const links = [];

      lines.forEach((line, index) => {
        const urlRegex = /\[.*?\]\(((?:https?:\/\/|\/)[^\s)]+)\)/g;
        let match;
        while ((match = urlRegex.exec(line)) !== null) {
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





  async function checkUrl(url) {
    try {
      // Handle internal links differently
      if (url.startsWith('/')) {
        // For internal links, check against dev server
        const devServerUrl = 'http://localhost:3000';
        try {
          const response = await fetch(`${devServerUrl}${url}`, {
            method: 'HEAD',
            headers: {
              'User-Agent': 'EsportsDash-Docs Link Checker'
            }
          });

          return {
            url,
            status: response.status,
            isValid: response.ok
          };
        } catch (error) {
          // Fallback to file system check if dev server is not running
          const localPath = path.join(process.cwd(), 'content', url.replace(/^\//, ''));
          const mdxPath = localPath + '.mdx';
          try {
            await fs.access(mdxPath);
            return {
              url,
              status: 'ok (file exists)',
              isValid: true
            };
          } catch {
            return {
              url,
              status: 'file not found (dev server not running)',
              isValid: false
            };
          }
        }
      }

      // External links handling remains the same
      const response = await fetch(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'EsportsDash-Docs Link Checker'
        }
      });

      return {
        url,
        status: response.status,
        isValid: response.ok
      };
    } catch (error) {
      return {
        url,
        status: 'network error',
        isValid: false
      };
    }
  }

  const mdxFiles = await findMdxFiles(directory);

  for (const file of mdxFiles) {
    const urls = await extractLinksFromMdx(file);

    // Update the main loop to handle the new link format
    const linkChecks = await Promise.all(
      urls.map(async ({ url, lineNumber, lineContent }) => ({
        ...(await checkUrl(url)),
        location: file,
        lineNumber,
        lineContent
      }))
    );


    results.push({
      file: path.relative(directory, file),
      links: linkChecks
    });
  }

  return results;
}

// CLI execution

// Update the CLI execution part
if (require.main === module) {
  const docsDir = path.join(process.cwd(), 'content');

  checkMdxLinks(docsDir)
    .then((results) => {
      console.log('\nLink Checking Results:');

      let totalLinks = 0;
      let brokenLinks = 0;

      results.forEach(({ file, links }) => {
        if (links.length === 0) return;

        const invalidLinks = links.filter(link => !link.isValid);
        if (invalidLinks.length > 0) {
          console.log(`\n📄 ${file}`);
          invalidLinks.forEach(({ url, status, lineNumber }) => {
            totalLinks++;
            brokenLinks++;
            // Format: file:line:column
            const fullPath = path.join(process.cwd(), 'content', file);
            console.log(`  ❌ ${url} (${status})`);
            console.log(`     ${fullPath}:${lineNumber}:1`);
          });
        }
      });

      console.log(`\nSummary:`);
      console.log(`Total Links: ${totalLinks}`);
      console.log(`Broken Links: ${brokenLinks}`);
    })
    .catch(console.error);
}

module.exports = { checkMdxLinks };