import Link from 'next/link';
import { getDictionary } from '../dictionaries';
import Logo, { LogoMark } from '../../components/Logo';
import LangSwitch from '../../components/LangSwitch';
import LoginForm from '../../components/LoginForm';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = await getDictionary(lang);
  return {
    title: d.meta.loginTitle,
    robots: { index: false, follow: false },
    alternates: { canonical: `/${lang}/login` },
  };
}

export default async function LoginPage({ params }) {
  const { lang } = await params;
  const d = await getDictionary(lang);
  const t = d.login;

  return (
    <div className="login-page">
      <div className="hero-glow" aria-hidden="true" />
      <div className="login-arc" aria-hidden="true" />

      <header className="login-top">
        <Logo href={`/${lang}`} />
        <LangSwitch lang={lang} label={d.nav.language} />
      </header>

      <main className="login-main">
        <div className="login-card">
          <LogoMark size={44} />
          <h1 className="display">{t.title}</h1>
          <p className="login-sub">{t.sub}</p>

          <LoginForm t={t} />

          <div className="login-note">
            {t.note}
            <div className="login-help">
              {t.forgot} <a href="#contact">{t.support}</a>
            </div>
          </div>

          <div className="secure">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
            {t.secure}
          </div>
        </div>
      </main>

      <div className="container" style={{ paddingBottom: 28, position: 'relative', zIndex: 2 }}>
        <Link href={`/${lang}`} className="back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          {t.back}
        </Link>
      </div>
    </div>
  );
}
