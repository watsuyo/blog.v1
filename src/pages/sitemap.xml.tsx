import { DOMAIN } from 'global';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

// ウェブサイトのURLと、サイト内のすべてのページのパスのリスト
const pages = [
  '/',
  '/blog',
];

export default async function generateSitemap() {
  const links = pages.map(page => {
    return {
      url: page,
      changefreq: 'always',
      priority: 0.9,
    };
  });

  const stream = new SitemapStream({ hostname: DOMAIN });
  const xmlStream = new Readable().wrap(stream);

  links.forEach(link => stream.write(link));
  stream.end();

  const sitemapXml = await streamToPromise(xmlStream).then(data => data.toString());

  return sitemapXml;
}
