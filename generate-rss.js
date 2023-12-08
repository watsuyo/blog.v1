const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walk(filepath, filelist);
    } else if (file.endsWith('.mdx')) {
      filelist.push(filepath);
    }
  });
  return filelist;
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function generateSitemap() {
  const pages = walk('src/pages/blog');

  let urlsetXml = '';
  pages.forEach(page => {
    const content = fs.readFileSync(page, 'utf8');
    const frontMatter = matter(content);

    const loc = `https://posts.watsuyo.dev/blog/${page.replace('src/pages/blog/', '').replace('.mdx', '')}`;
    const lastmod = formatDate(new Date(frontMatter.data.date));

    urlsetXml += `
      <url>
        <loc>${loc}</loc>
        <lastmod>${lastmod}</lastmod>
      </url>`;
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urlsetXml}
    </urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemapXml);
}

generateSitemap();
