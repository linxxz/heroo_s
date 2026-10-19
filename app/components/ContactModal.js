'use client';

import { useCallback, useEffect, useRef } from 'react';
import { site } from '@/lib/i18n';

/**
 * Contact popup. Any link to "#contact" anywhere on the site opens it
 * (works from server components too — no extra props needed).
 */
export default function ContactModal({ t }) {
  const ref = useRef(null);

  const open = useCallback(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);

  const clearHash = () => {
    if (window.location.hash === '#contact') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  useEffect(() => {
    const check = () => { if (window.location.hash === '#contact') open(); };
    // Catch clicks on #contact links even when the hash is already #contact
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href$="#contact"]');
      if (!a) return;
      e.preventDefault();
      open();
    };
    check();
    window.addEventListener('hashchange', check);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('hashchange', check);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  const close = () => ref.current?.close();

  const tg = `https://t.me/${site.telegram}`;
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t.waText)}`;

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="contact-title"
      onClose={clearHash}
      onClick={(e) => { if (e.target === ref.current) close(); }}
    >
      <div className="modal-card">
        <button type="button" className="modal-x" onClick={close} aria-label={t.close}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        <span className="badge"><span className="dot live" />{t.online}</span>
        <h2 id="contact-title" className="display">{t.title}</h2>
        <p className="modal-sub">{t.sub}</p>

        <div className="modal-links">
          <a href={tg} target="_blank" rel="noopener noreferrer" className="contact-link tg">
            <span className="contact-ic">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true"><path d="M21 4L3 11l6 2.5M21 4l-4 16-8-6.5M21 4L9 13.5v5l3-3.2" /></svg>
            </span>
            <span className="contact-txt">
              <span className="contact-name">Telegram</span>
              <span className="contact-hint">{t.telegramHint} · @{site.telegram}</span>
            </span>
            <svg className="contact-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
          </a>

          <a href={wa} target="_blank" rel="noopener noreferrer" className="contact-link wa">
            <span className="contact-ic">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 12a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.1-4.3A8.5 8.5 0 1 1 20.5 12z" /><path d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l1-1.6-2-1-1 1a4 4 0 0 1-2.9-2.9l1-1-1-2L9 8.5z" /></svg>
            </span>
            <span className="contact-txt">
              <span className="contact-name">WhatsApp</span>
              <span className="contact-hint">{t.whatsappHint}</span>
            </span>
            <svg className="contact-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
          </a>
        </div>

        <p className="modal-foot">{t.email} <a href={`mailto:${site.email}`}>{site.email}</a></p>
      </div>
    </dialog>
  );
}
