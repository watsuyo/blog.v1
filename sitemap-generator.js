const { Domain } = require('domain');
const fs = require('fs');
const globby = require('globby');

(async () => {
  const pages = await globby([
    'src/pages/**/*.tsx',         // TypeScriptのReactコンポーネントを対象
    'src/pages/**/*.mdx',         // MDXファイルを対象
    '!src/pages/_*.tsx',          // _で始まるファイルを除外（Next.jsの特別なページ）
    '!src/pages/**/[[]*[]].tsx',  // 動的ルートを除外
    '!src/pages/sitemap.xml.tsx'  // サイトマップ自体を除外
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(page => {
          const path = page
            .replace('src/pages', '')
            .replace('.tsx', '')
            .replace('.mdx', '')
            .replace('/index', ''); // index.tsxはルートとして扱う
          const route = path === '' ? '' : path;
          return `
            <url>
              <loc>${`https://posts.watsuyo.dev/${route}`}</loc>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  fs.writeFileSync('public/sitemap.xml', sitemap);
})();
