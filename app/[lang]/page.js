import Link from 'next/link';
import { getDictionary } from './dictionaries';
import { locales } from '@/lib/i18n';
import Header from '../components/Header';
import ServicesChips from '../components/ServicesChips';
import LeadForm from '../components/LeadForm';
import InView, { CountUp } from '../components/InView';

const brandsA = [
  ['Shopify', 'eCommerce'], ['Stripe', 'Payments'], ['WP Engine', 'Hosting'], ['Squarespace', 'Sites'],
  ['HubSpot', 'CRM'], ['Coinbase Commerce', 'Crypto'], ['Kinsta', 'Hosting'], ['Semrush', 'SEO'],
  ['Constant Contact', 'Email'], ['PayPal', 'Payments'],
];
const brandsB = [
  ['Cloudways', 'Hosting'], ['SiteGround', 'Hosting'], ['FreshBooks', 'Accounting'], ['Pipedrive', 'CRM'],
  ['WooCommerce', 'eCommerce'], ['Bluehost', 'Hosting'], ['Mailchimp', 'Email'], ['QuickBooks', 'Accounting'],
  ['HostGator', 'Hosting'], ['Google Analytics', 'Analytics'],
];

// 7×7 decorative QR pattern: b = dark, g = accent, . = empty
const QR = 'bbb.b.bb.bb.bb.b.bb.bbb..b.g.b..bb.bbbb.bb..bbb.b';

const Check = ({ color = '#C3EE3A', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
);

function Marquee({ items, reverse }) {
  const row = [...items, ...items];
  return (
    <div className="marquee">
      <div className={`mq-track${reverse ? ' rev' : ''}`}>
        {row.map(([name, cat], i) => (
          <div className="brand" key={i} aria-hidden={i >= items.length ? 'true' : undefined}>
            <span className="brand-i">{name[0]}</span>
            <span className="brand-n">{name}</span>
            <span className="brand-c">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Home({ params }) {
  const { lang } = await params;
  const d = await getDictionary(lang);
  const { hero, browser: b, stats: s, services: sv, portal: p, process: pr, pricing: pc, cta, footer: f } = d;

  return (
    <>
      <Header lang={lang} t={d.nav} contact={d.contact.nav} />

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container" style={{ position: 'relative' }}>
            <span className="badge"><span className="dot live" />{hero.badge}</span>
            <h1 className="display">
              {hero.h1a} <span className="accent">{hero.h1b}</span> {hero.h1c}
            </h1>
            <p className="hero-sub">{hero.sub}</p>
            <div className="hero-ctas">
              <a href="#start" className="btn btn-primary btn-glow">{hero.cta1}</a>
              <a href="#contact" className="btn btn-ghost">{hero.cta2}</a>
            </div>

            <div className="stage">
              <div className="arc" aria-hidden="true" />
              <div className="browser" role="img" aria-label={`${b.success} — ${b.sell} heroo`}>
                <div className="browser-bar" aria-hidden="true">
                  <div className="browser-dots"><span /><span /><span /></div>
                  <div className="browser-url">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C3EE3A" strokeWidth="2.4"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                    yourbrand.com/checkout
                  </div>
                  <div style={{ width: 50 }} />
                </div>
                <div className="browser-body" aria-hidden="true">
                  <div className="browser-col">
                    <div className="eyebrow">{b.summary}</div>
                    <div className="order-item">
                      <div className="thumb">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C3EE3A" strokeWidth="1.8"><path d="M3 7l9-4 9 4-9 4-9-4z" /><path d="M3 7v10l9 4 9-4V7" /><path d="M12 11v10" /></svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500 }}>{b.item}</div>
                        <div style={{ fontSize: 13, color: 'var(--muted-2)', marginTop: 3 }}>{b.itemMeta}</div>
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>$119.00</div>
                    </div>
                    <div className="order-lines">
                      <div><span>{b.subtotal}</span><span>$119.00</span></div>
                      <div><span>{b.shipping}</span><span>$10.00</span></div>
                      <div className="total"><span>{b.total}</span><span>$129.00</span></div>
                    </div>
                    <div className="tags">
                      <span className="tag">Stripe</span><span className="tag">Apple Pay</span>
                      <span className="tag">USDC · BTC · ETH</span><span className="tag">{b.crmSync}</span>
                    </div>
                  </div>
                  <div className="browser-col pay-col">
                    <div className="eyebrow">{b.payment}</div>
                    <div className="seg"><span className="on">{b.card}</span><span>{b.crypto}</span></div>
                    <div className="field-fake"><span>4242 •••• •••• 4242</span><span style={{ color: 'var(--muted-2)' }}>12/28</span></div>
                    <div className="field-fake dim">jane@yourbrand.com</div>
                    <div className="pay-wrap">
                      <div className="paybtn">
                        <span className="lbl">{b.pay}</span>
                        <span className="spnwrap">
                          <svg className="spin" width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="rgba(10,12,9,.25)" strokeWidth="3" /><path d="M21 12a9 9 0 0 0-9-9" stroke="#0A0C09" strokeWidth="3" strokeLinecap="round" /></svg>
                        </span>
                      </div>
                      <svg className="cur" width="26" height="30" viewBox="0 0 26 30"><path d="M3 2l19 13-8.5 1.6L18 26l-4 2-4.4-9.3L3 24z" fill="#FFFFFF" stroke="#0A0C09" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                    </div>
                    <div className="small-note">{b.secured}</div>
                  </div>
                  <div className="ok">
                    <svg className="ring" width="96" height="96" viewBox="0 0 96 96"><circle cx="48" cy="48" r="44" fill="#C3EE3A" /><path className="chk" d="M28 49l13 13 27-28" fill="none" stroke="#0A0C09" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <div className="rise">
                      <div className="ok-title">{b.success}</div>
                      <div className="ok-sell">{b.sell} <span className="accent">heroo</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <section id="integrations" className="marquee-sec" aria-label={d.nav.integrations}>
          <p className="marquee-title">{d.marquee.a} <span className="accent">{d.marquee.b}</span></p>
          <Marquee items={brandsA} />
          <Marquee items={brandsB} reverse />
        </section>

        {/* STATS */}
        <section className="section" style={{ paddingTop: 80 }}>
          <div className="container">
            <h2 className="display h2 center" style={{ maxWidth: 780, margin: '0 auto' }}>
              {s.h2a} <span className="accent">{s.h2b}</span> {s.h2c} <span className="accent">{s.h2d}</span>
            </h2>
            <InView className="cards-3">
              <div className="card card-lime">
                <div className="card-title">{s.saveTitle}</div>
                <div className="big-num">{s.saveValue}</div>
                <p>{s.saveText}</p>
                <div className="bars" aria-hidden="true">
                  {[72, 38, 86, 44, 100, 50].map((h, i) => (
                    <div key={i} className={`bar ${i % 2 ? 'light' : 'dark'}`} style={{ height: `${h}%`, animationDelay: `${0.1 * (i + 1)}s` }} />
                  ))}
                </div>
                <div className="legend">
                  <span><span className="sw" style={{ background: 'var(--lime-dark)' }} />{s.legendA}</span>
                  <span><span className="sw" style={{ background: 'var(--lime-pale)', border: '1px solid var(--lime-dark)' }} />{s.legendB}</span>
                </div>
              </div>

              <div className="card">
                <div className="card-title">{s.happyTitle}</div>
                <div className="big-num accent"><CountUp to={300} suffix="+" /></div>
                <p>{s.happyText}</p>
                <svg className="area-svg" viewBox="0 0 320 150" aria-hidden="true">
                  <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#C3EE3A" stopOpacity=".45" /><stop offset="1" stopColor="#C3EE3A" stopOpacity="0" /></linearGradient></defs>
                  <path className="areaf" d="M0 128 L30 122 L55 126 L80 110 L105 114 L130 96 L155 100 L180 78 L205 84 L230 60 L255 66 L280 38 L300 44 L320 18 L320 150 L0 150Z" fill="url(#ag)" />
                  <path className="ln" d="M0 128 L30 122 L55 126 L80 110 L105 114 L130 96 L155 100 L180 78 L205 84 L230 60 L255 66 L280 38 L300 44 L320 18" fill="none" stroke="#C3EE3A" strokeWidth="2.5" strokeLinejoin="round" />
                  <circle className="pls" cx="316" cy="20" r="6" fill="#C3EE3A" />
                </svg>
              </div>

              <div className="card">
                <div className="card-title">{s.supportTitle}</div>
                <p>{s.supportText}</p>
                <div className="donut">
                  <svg viewBox="0 0 140 140" width="200" height="200" aria-hidden="true">
                    <circle cx="70" cy="70" r="54" fill="none" stroke="#22281C" strokeWidth="16" />
                    <circle cx="70" cy="70" r="54" fill="none" stroke="#C3EE3A" strokeWidth="16" strokeDasharray="300 40" transform="rotate(-90 70 70)" />
                    <g className="orbit"><circle cx="70" cy="16" r="5" fill="#0A0C09" stroke="#F3FFD0" strokeWidth="2" /></g>
                  </svg>
                  <div className="donut-center">
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 600 }}>24/7</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>EN · ES · PL · FR</div>
                  </div>
                </div>
                <div className="legend" style={{ justifyContent: 'center', color: '#B9C1B1' }}>
                  <span><span className="sw" style={{ background: 'var(--lime)', borderRadius: '50%' }} />{s.liveNow}</span>
                  <span><span className="sw" style={{ background: '#2C3326', borderRadius: '50%' }} />{s.nextShift}</span>
                </div>
              </div>
            </InView>

            <div className="tiles">
              {s.tiles.map((tile) => (
                <div className="tile" key={tile.l}><div className="tile-v">{tile.v}</div><div className="tile-l">{tile.l}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section">
          <div className="container split">
            <div>
              <h2 className="display h2">
                <span className="accent">{sv.h2a}</span> {sv.h2b} <span className="accent">{sv.h2c}</span>{sv.h2d}
              </h2>
              <p className="lead" style={{ margin: '22px 0 0', maxWidth: 520 }}>{sv.sub}</p>
              <a href="#start" className="btn btn-primary" style={{ marginTop: 28 }}>{sv.cta}</a>
            </div>
            <div>
              <ServicesChips chips={sv.chips} toolsLabel={sv.tools} />
              <div className="mini-grid">
                <div className="mini">
                  <div className="mini-h"><span style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--lime)' }} />{sv.fitTitle}</div>
                  <p>{sv.fitText}</p>
                </div>
                <div className="mini">
                  <div className="mini-h"><span style={{ width: 22, height: 22, borderRadius: '50%', border: '5px solid var(--lime)' }} />{sv.doneTitle}</div>
                  <p>{sv.doneText}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PORTAL + PHONES */}
        <section id="portal" className="section portal-sec">
          <div className="portal-glow" aria-hidden="true" />
          <div className="container split" style={{ position: 'relative', gap: 56 }}>
            <div>
              <div className="kicker">{p.kicker} <span className="accent">{p.kickerAccent}</span></div>
              <h2 className="display h2" style={{ marginTop: 12 }}>{p.h2a} <span className="accent">{p.h2b}</span></h2>
              <p className="lead" style={{ margin: '20px 0 0' }}>{p.sub}</p>
              <div className="features">
                <div className="feature"><span className="ficon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C3EE3A" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></svg></span>{p.f1}</div>
                <div className="feature"><span className="ficon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C3EE3A" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M9 8h5a2 2 0 0 1 0 4H9h6a2 2 0 0 1 0 4H9M11 6v2M11 16v2M9 8v8" /></svg></span>{p.f2}</div>
                <div className="feature"><span className="ficon"><Check size={18} /></span>{p.f3}</div>
                <div className="feature"><span className="ficon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C3EE3A" strokeWidth="2" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5A8 8 0 1 1 21 12z" /></svg></span>{p.f4}</div>
              </div>
              <Link href={`/${lang}/login`} className="btn btn-outline" style={{ marginTop: 30 }}>{p.cta}</Link>
            </div>

            <div className="phones" aria-hidden="true">
              <div className="phones-inner">
                <div className="circle" style={{ width: 520, height: 520, border: '1px solid #1E2419' }} />
                <div className="circle" style={{ width: 380, height: 380, border: '1px solid #232A1D' }} />

                <div className="phone p1">
                  <div className="screen">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17 }}>heroo</span>
                      <span className="avatar">JD</span>
                    </div>
                    <div className="due">
                      <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em' }}>{p.dueMonth}</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, marginTop: 4 }}>$81.00</div>
                      <div style={{ fontSize: 12, marginTop: 2 }}>{p.servicesNext}</div>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted-2)', marginTop: 4 }}>{p.invoices}</div>
                    <div className="inv">
                      <span className="inv-i">S</span>
                      <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13 }}>Shopify Basic</div><div style={{ fontSize: 11, color: 'var(--muted-2)' }}>$39.00</div></div>
                      <span className="status-swap"><span className="pill pill-pend s1">{p.pending}</span><span className="pill pill-paid s2">{p.paid}</span></span>
                    </div>
                    <div className="inv">
                      <span className="inv-i">W</span>
                      <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13 }}>WP Engine Startup</div><div style={{ fontSize: 11, color: 'var(--muted-2)' }}>$30.00</div></div>
                      <span className="pill pill-paid">{p.paid}</span>
                    </div>
                    <div className="inv">
                      <span className="inv-i">C</span>
                      <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13 }}>Constant Contact</div><div style={{ fontSize: 11, color: 'var(--muted-2)' }}>$12.00</div></div>
                      <span className="pill pill-mute">Nov 1</span>
                    </div>
                    <div className="phone-btn">{p.payAll}</div>
                  </div>
                </div>

                <div className="phone p2">
                  <div className="screen">
                    <div style={{ fontSize: 12, color: 'var(--muted-2)', textAlign: 'center' }}>{p.invoice}</div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600 }}>81.00 <span className="accent">USDC</span></div>
                      <div style={{ fontSize: 12, color: 'var(--muted-2)' }}>{p.feeIncl}</div>
                    </div>
                    <div className="coins"><span className="coin on">USDC</span><span className="coin">BTC</span><span className="coin">ETH</span></div>
                    <div className="qr">
                      {QR.split('').map((c, i) => <span key={i} className={c === 'b' ? 'b' : c === 'g' ? 'g' : ''} />)}
                    </div>
                    <div style={{ padding: '11px 12px', borderRadius: 12, background: 'var(--surface-4)', fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>0x7a3f…c91e · Base network</div>
                    <div className="phone-btn">{p.sent}</div>
                    <div className="toast">
                      <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Check color="#0A0C09" size={14} /></span>
                      <div><div style={{ fontSize: 13, fontWeight: 600 }}>{p.confirmed}</div><div style={{ fontSize: 11, color: 'var(--muted)' }}>{p.isPaid}</div></div>
                    </div>
                  </div>
                </div>

                <div className="float-card flt" style={{ left: 0, bottom: 30 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, color: 'var(--lime)' }}>300+</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{p.sitesLaunched}</div>
                </div>
                <div className="float-card flt2" style={{ right: 0, bottom: 70 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className="dot live" /><span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600 }}>24/7</span></div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{p.managerOnline}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="section">
          <div className="container">
            <div className="center">
              <div className="kicker">{pr.kicker} <span className="accent">{pr.kickerAccent}</span></div>
              <h2 className="display h2" style={{ marginTop: 12 }}>{pr.title}</h2>
            </div>
            <ol className="grid-4" style={{ listStyle: 'none', padding: 0 }}>
              {pr.steps.map((st, i) => (
                <li key={st.t} className={`step${i === pr.steps.length - 1 ? ' lime' : ''}`}>
                  <span className="step-n">0{i + 1}</span>
                  <div className="step-t">{st.t}</div>
                  <p>{st.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="section">
          <div className="container">
            <div className="center">
              <div className="kicker accent">{pc.kicker}</div>
              <h2 className="display h2" style={{ marginTop: 12 }}>{pc.title}</h2>
              <p className="lead" style={{ margin: '16px auto 0', maxWidth: 560 }}>{pc.sub}</p>
            </div>
            <div className="plans">
              {pc.plans.map((plan, i) => (
                <div key={plan.name} className={`plan${i === 1 ? ' hot' : ''}`}>
                  {i === 1 && <span className="plan-badge">{pc.popular}</span>}
                  <div className="plan-name">{plan.name}</div>
                  <div className="plan-price">{plan.price}</div>
                  <div className="plan-desc">{plan.desc}</div>
                  <ul>
                    {plan.features.map((feat) => <li key={feat}><Check />{feat}</li>)}
                  </ul>
                  <a href={i === 2 ? '#contact' : '#start'} className={`btn ${i === 1 ? 'btn-primary' : 'btn-ghost'}`}>{plan.cta}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="start" className="section" style={{ paddingTop: 40 }}>
          <div className="container">
            <div className="cta-box">
              <div className="cta-arc" aria-hidden="true" />
              <h2 className="display" style={{ position: 'relative', fontSize: 'clamp(32px,4.4vw,54px)' }}>
                {cta.h2a} <span className="accent">heroo</span> {cta.h2c}
              </h2>
              <p className="lead" style={{ position: 'relative', margin: '16px auto 0', maxWidth: 520, fontSize: 16 }}>{cta.sub}</p>
              <LeadForm t={cta} />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div style={{ maxWidth: 320 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22, color: 'var(--lime)' }}>heroo</div>
              <p style={{ margin: '10px 0 0', fontSize: 14, color: 'var(--muted)', lineHeight: 1.55 }}>{f.about}</p>
            </div>
            <div className="footer-cols">
              <div className="footer-col"><span>{f.company}</span><a href="#services">{d.nav.services}</a><a href="#process">{d.nav.process}</a><a href="#pricing">{d.nav.pricing}</a></div>
              <div className="footer-col"><span>{f.clients}</span><Link href={`/${lang}/login`}>{d.nav.portal}</Link><a href="#contact">{f.support}</a><Link href={`/${lang}/login`}>{f.payInvoice}</Link></div>
              <div className="footer-col"><span>{f.legal}</span><a href="#top">{f.terms}</a><a href="#top">{f.privacy}</a><a href="#top">{f.disclosure}</a></div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} heroo · heroo.shop</span>
            <span style={{ display: 'flex', gap: 10 }}>
              {locales.map((l) => (
                <Link key={l} href={`/${l}`} hrefLang={l} aria-current={l === lang ? 'true' : undefined}>{l.toUpperCase()}</Link>
              ))}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
