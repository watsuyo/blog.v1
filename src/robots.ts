import { DOMAIN } from 'global'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/'
    },
    sitemap: `${DOMAIN}/sitemap.xml`
  }
}
