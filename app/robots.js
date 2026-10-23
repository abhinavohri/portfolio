import { isPreview, siteUrl } from '@/lib/site';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      [isPreview ? 'disallow' : 'allow']: '/',
    },
    sitemap: `${siteUrl.origin}/sitemap.xml`,
    host: siteUrl.origin,
  };
}
