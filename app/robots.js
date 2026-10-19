import { site } from '@/lib/i18n';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/*/login'] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
