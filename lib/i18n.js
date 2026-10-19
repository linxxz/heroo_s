export const locales = ['en', 'es', 'pl', 'fr'];
export const defaultLocale = 'en';

export const localeNames = {
  en: 'English',
  es: 'Español',
  pl: 'Polski',
  fr: 'Français',
};

export const hasLocale = (l) => locales.includes(l);

// Site-wide settings — change these to your real values.
export const site = {
  url: 'https://heroo.shop',
  email: 'support@heroo.shop',
  // Telegram username without "@"  → https://t.me/<telegram>
  telegram: 'heroo_support',
  // WhatsApp number in international format, digits only (no +, spaces or dashes) → https://wa.me/<whatsapp>
  whatsapp: '48690252353',
};
