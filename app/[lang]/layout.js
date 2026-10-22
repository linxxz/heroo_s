import { notFound } from 'next/navigation';
import { locales, hasLocale, site } from '@/lib/i18n';
import { getDictionary } from './dictionaries';
import ContactModal from '../components/ContactModal';
import '../globals.css';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = await getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: d.meta.title,
    description: d.meta.description,
    icons: { icon: '/favicon.svg' },
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      url: `/${lang}`,
      siteName: 'heroo',
      type: 'website',
    },
  };
}

export const viewport = {
  themeColor: '#0A0C09',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary(lang);
  return (
    <html lang={lang}>
      <head>
        <meta name='impact-site-verification' value='73a6a09f-6072-43aa-8f8c-019fbd43faa9'></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        {children}
        <ContactModal t={d.contact} />
      </body>
    </html>
  );
}
