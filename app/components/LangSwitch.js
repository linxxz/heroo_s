'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales } from '@/lib/i18n';

export default function LangSwitch({ lang, label }) {
  const pathname = usePathname() || `/${lang}`;
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');

  const remember = (code) => {
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <div className="lang-switch" role="group" aria-label={label}>
      {locales.map((code) => (
        <Link
          key={code}
          href={`/${code}${rest}`}
          hrefLang={code}
          aria-current={code === lang ? 'true' : undefined}
          onClick={() => remember(code)}
          scroll={false}
        >
          {code}
        </Link>
      ))}
    </div>
  );
}
