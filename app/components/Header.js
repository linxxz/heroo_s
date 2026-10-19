'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import LangSwitch from './LangSwitch';

export default function Header({ lang, t, contact }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const links = [
    ['#services', t.services],
    ['#integrations', t.integrations],
    ['#process', t.process],
    ['#pricing', t.pricing],
    ['#portal', t.portal],
    ['#contact', contact],
  ];

  return (
    <header className="header">
      <div className="container header-inner">
        <Logo href={`/${lang}`} />
        <nav className="nav" aria-label="Main">
          {links.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <LangSwitch lang={lang} label={t.language} />
          <Link href={`/${lang}/login`} className="btn btn-ghost btn-sm hide-md">{t.login}</Link>
          <a href="#start" className="btn btn-primary btn-sm hide-md">
            {t.start}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <button
            type="button"
            className="burger"
            aria-label={t.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={`mobile-menu${open ? ' open' : ''}`}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={close}>{label}</a>
        ))}
        <Link href={`/${lang}/login`} onClick={close}>{t.login}</Link>
        <LangSwitch lang={lang} label={t.language} />
        <a href="#start" className="btn btn-primary" onClick={close}>{t.start}</a>
      </div>
    </header>
  );
}
