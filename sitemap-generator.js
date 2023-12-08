const fs = require('fs');
const path = require('path');

const SITEMAP_HEADER = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
const SITEMAP_FOOTER = `</urlset>`;

function walk(dir, filelist = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walk(path.join(dir, file), filelist);
        } else if ((file.endsWith('.tsx') || file.endsWith('.mdx')) && !file.startsWith('_') && !file.includes('[')) {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
}

const pages = walk('src/pages')
    .map(page => {
      const content = fs.readFileSync(page, 'utf-8');
      if(content.match(/date: '(.*)'/)){
        const lastmod = content.match(/date: '(.*)'/)[1];
        const route = page
            .replace('src/pages', '')
            .replace('.tsx', '')
            .replace('.mdx', '')
            .replace('/index', '')
            .replace(/^\/+/, '');
        const url = `https://posts.watsuyo.dev${route === '' ? '/' : route}`;
        return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
      }
    });

const sitemap = SITEMAP_HEADER + pages.join('\n') + SITEMAP_FOOTER;

fs.writeFileSync('public/sitemap.xml', sitemap);
