export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/'
    },
    sitemap: `https://post.watsuyo.dev/sitemap.xml`
  }
}
