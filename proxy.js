import { NextResponse } from 'next/server';
import { locales, defaultLocale } from './lib/i18n';

function getLocale(request) {
  const saved = request.cookies.get('NEXT_LOCALE')?.value;
  if (saved && locales.includes(saved)) return saved;

  const header = request.headers.get('accept-language') || '';
  const prefs = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { lang: tag.toLowerCase().split('-')[0], q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const p of prefs) if (locales.includes(p.lang)) return p.lang;
  return defaultLocale;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  request.nextUrl.pathname = `/${getLocale(request)}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (favicon, robots, sitemap…)
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
