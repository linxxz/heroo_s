import { locales, site } from '@/lib/i18n';

export default function sitemap() {
  return locales.map((l) => ({
    url: `${site.url}/${l}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: l === 'en' ? 1 : 0.8,
    alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${site.url}/${x}`])) },
  }));
}
