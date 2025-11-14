export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/','/private-new/'],
    },
    sitemap: 'https://acme.com/sitemap.xml',
  }
}