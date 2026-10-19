'use client';

import { useState } from 'react';
import { site } from '@/lib/i18n';

/**
 * Opens the visitor's mail app with a pre-filled request to site.email.
 * Swap this for a form service / CRM webhook when you have one.
 */
export default function LeadForm({ t }) {
  const [email, setEmail] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(`Contact: ${email}\n\n`);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(t.subject)}&body=${body}`;
  };

  return (
    <form className="cta-form" onSubmit={submit}>
      <label htmlFor="lead-email" className="sr-only">{t.label}</label>
      <input
        id="lead-email"
        className="input"
        type="email"
        required
        autoComplete="email"
        placeholder={t.placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">{t.button}</button>
    </form>
  );
}
