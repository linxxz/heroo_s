'use client';

import { useRef, useState } from 'react';

export default function LoginForm({ t }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shakeKey, setShakeKey] = useState(0);
  const loginRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!login.trim() || !password) {
      setError(t.required);
      setShakeKey((k) => k + 1);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: login.trim(), password }),
      });
      if (!res.ok) throw new Error('invalid');
      // Real redirect to the dashboard goes here once the portal exists.
    } catch {
      setError(t.error);
      setPassword('');
      setShakeKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={submit} noValidate>
      {error && (
        <div key={shakeKey} className="form-error shake" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v6M12 16.5v.5" /></svg>
          {error}
        </div>
      )}

      <div>
        <label className="label" htmlFor="login">{t.login}</label>
        <input
          ref={loginRef}
          id="login"
          name="username"
          className={`input${error ? ' invalid' : ''}`}
          style={{ width: '100%' }}
          autoComplete="username"
          autoCapitalize="none"
          spellCheck="false"
          placeholder={t.loginPh}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          aria-invalid={!!error}
        />
      </div>

      <div>
        <label className="label" htmlFor="password">{t.password}</label>
        <div className="input-wrap">
          <input
            id="password"
            name="password"
            type={show ? 'text' : 'password'}
            className={`input${error ? ' invalid' : ''}`}
            autoComplete="current-password"
            placeholder={t.passwordPh}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!error}
          />
          <button type="button" className="eye" onClick={() => setShow((s) => !s)} aria-label={show ? t.hide : t.show} aria-pressed={show}>
            {show ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 3l18 18" /><path d="M10.6 6.1A10 10 0 0 1 12 6c5 0 9 6 9 6a17 17 0 0 1-3.2 3.7M6.2 7.6A17 17 0 0 0 3 12s4 6 9 6a9 9 0 0 0 4-1" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 12s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6z" /><circle cx="12" cy="12" r="3" /></svg>
            )}
          </button>
        </div>
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 6 }} disabled={loading} aria-busy={loading}>
        {loading ? (
          <>
            <svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="rgba(10,12,9,.25)" strokeWidth="3" /><path d="M21 12a9 9 0 0 0-9-9" stroke="#0A0C09" strokeWidth="3" strokeLinecap="round" /></svg>
            {t.checking}
          </>
        ) : t.submit}
      </button>
    </form>
  );
}
