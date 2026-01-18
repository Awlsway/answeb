import { useState, useEffect } from 'react'
import logo from './assets/logo.svg'
import banner from './assets/modern_tech_banner.png'
import { useWebsiteContent } from './hooks/useSupabaseData'
import LoadingSkeleton from './components/LoadingSkeleton'
import ErrorFallback from './components/ErrorFallback'
import Dashboard from './components/dashboard/Dashboard'
import { translations } from './translations' // Fallback data

export default function App() {
  const [view, setView] = useState('site') // 'site' or 'dashboard'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  // Fetch content from Supabase
  const {
    hero, services, packages, features, timeline, support,
    pricing, maintenance, referral, about, testimonials,
    contact, navigation, footer, loading, error, refetch
  } = useWebsiteContent(language)

  // Fallback to static translations if Supabase data is not available
  const t = translations[language]

  // Save language preference
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'my' : 'en')
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Show loading skeleton while fetching data
  if (loading) {
    return <LoadingSkeleton />
  }

  // Show error fallback if there's an error
  if (error) {
    return <ErrorFallback error={error} language={language} />
  }

  // If in dashboard view, render the dashboard component
  if (view === 'dashboard') {
    return <Dashboard onExit={() => setView('site')} />
  }

  // Use Supabase data if available, otherwise fallback to static translations
  const content = {
    nav: navigation || t.nav,
    hero: hero || t.hero,
    services: services || t.services,
    about: about || t.about,
    contact: contact || t.contact,
    footer: footer || t.footer,
    testimonials: testimonials.length > 0 ? testimonials : null
  }

  // Get features by category
  const includedFeatures = features.filter(f => f.category === 'included')
  const excludedFeatures = features.filter(f => f.category === 'excluded')

  return (
    <div className="page">
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#hero">
            <img src={logo} alt="A&S IT SOLUTION logo" className="logo" />
            <span>{content.hero.title}</span>
          </a>
          <nav className="nav-links">
            <a href="#services">{content.nav.services_text || content.nav.services}</a>
            <a href="#about">{content.nav.about_text || content.nav.about}</a>
            <a href="#testimonials">{content.nav.testimonials_text || content.nav.testimonials}</a>
            <a href="#contact">{content.nav.contact_text || content.nav.contact}</a>
            <button className="btn-lang" onClick={toggleLanguage}>
              {language === 'en' ? 'မြန်မာ' : 'English'}
            </button>
            <button className="btn-theme" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* ... Hero, Services, About, Testimonials, Contact sections remain same ... */}
        <section id="hero" className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1>{content.hero.title}</h1>
              <p className="tagline">{content.hero.tagline}</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#contact">
                  <span>{content.hero.cta_text || content.hero.cta}</span>
                </a>
                <a className="btn ghost" href="#services">
                  {content.hero.services_text || content.hero.services}
                </a>
              </div>
            </div>
            <div className="hero-media">
              <img src={banner} alt="Abstract banner" />
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <div className="section-head">
              <h1>{content.services.title}</h1>
              <p>{content.services.subtitle}</p>
            </div>

            {/* Product Description */}
            <div className="card">
              <h2>{content.services.product_title || content.services.productVal?.title}</h2>
              <ul>
                <li>{content.services.product_desc || content.services.productVal?.desc}</li>
                <li>
                  {content.services.functions_label || content.services.productVal?.functions?.label}
                  <ul>
                    {(content.services.functions || content.services.productVal?.functions?.list || []).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </li>
                <li>{content.services.auth_info || content.services.productVal?.auth}</li>
                <li>{content.services.platform_info || content.services.productVal?.platform}</li>
              </ul>
            </div>

            {/* Packages */}
            <div className="card-grid" style={{ marginTop: 'var(--spacing-xl)' }}>
              <article className="card">
                <h2>{t.services.packages.title}</h2>
                {packages.length > 0 ? (
                  packages.map((pkg, idx) => (
                    <div key={idx}>
                      <h3>{pkg.title}</h3>
                      <ul>
                        <li>{pkg.price}</li>
                        {pkg.limit_info && <li>{pkg.limit_info}</li>}
                        {pkg.note && <li>{pkg.note}</li>}
                        {pkg.devices && <li>{pkg.devices}</li>}
                        {pkg.extra_device_fee && <li>{pkg.extra_device_fee}</li>}
                        {pkg.maintenance && <li>{pkg.maintenance}</li>}
                        {pkg.consultation_label && (
                          <li>
                            {pkg.consultation_label}
                            <ul>
                              {pkg.consultation_online && <li>{pkg.consultation_online}</li>}
                              {pkg.consultation_physical && <li>{pkg.consultation_physical}</li>}
                            </ul>
                          </li>
                        )}
                      </ul>
                    </div>
                  ))
                ) : (
                  <>
                    <h3>{t.services.packages.free.title}</h3>
                    <ul>
                      <li>{t.services.packages.free.price}</li>
                      <li>{t.services.packages.free.limit}</li>
                      <li>{t.services.packages.free.note}</li>
                    </ul>
                    <h3>{t.services.packages.ans1.title}</h3>
                    <ul>
                      <li>{t.services.packages.ans1.price}</li>
                      <li>{t.services.packages.ans1.limit}</li>
                      <li>{t.services.packages.ans1.devices}</li>
                      <li>{t.services.packages.ans1.extra}</li>
                      <li>{t.services.packages.ans1.maintenance}</li>
                      <li>
                        {t.services.packages.ans1.consultation.label}
                        <ul>
                          <li>{t.services.packages.ans1.consultation.online}</li>
                          <li>{t.services.packages.ans1.consultation.physical}</li>
                        </ul>
                      </li>
                    </ul>
                  </>
                )}
              </article>

              {/* Included Features */}
              <article className="card">
                <h2>{t.services.included.title}</h2>
                <ul>
                  {includedFeatures.length > 0 ? (
                    includedFeatures.map((feature, i) => (
                      <li key={i}>{feature.feature_text}</li>
                    ))
                  ) : (
                    t.services.included.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))
                  )}
                </ul>
              </article>

              {/* Excluded Features */}
              <article className="card">
                <h2>{t.services.excluded.title}</h2>
                <ul>
                  {excludedFeatures.length > 0 ? (
                    excludedFeatures.map((feature, i) => (
                      <li key={i}>{feature.feature_text}</li>
                    ))
                  ) : (
                    t.services.excluded.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))
                  )}
                </ul>
              </article>
            </div>

            {/* Timeline, Support, etc. */}
            <div className="card-grid" style={{ marginTop: 'var(--spacing-lg)' }}>
              <article className="card">
                <h2>{timeline?.title || t.services.timeline.title}</h2>
                <ul>
                  <li>{timeline?.timeline_text || t.services.timeline.text}</li>
                </ul>
              </article>

              <article className="card">
                <h2>{support?.title || t.services.support.title}</h2>
                <ul>
                  {(support?.support_items || t.services.support.list).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="card-grid" style={{ marginTop: 'var(--spacing-lg)' }}>
              <article className="card">
                <h2>{pricing?.title || t.services.pricing.title}</h2>
                <ul>
                  {(pricing?.pricing_items || t.services.pricing.list).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="card">
                <h2>{maintenance?.title || t.services.maintenance.title}</h2>
                <p>{maintenance?.subtitle || t.services.maintenance.subtitle}</p>
                <ul>
                  {(maintenance?.maintenance_items || t.services.maintenance.list).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="card">
                <h2>{referral?.title || t.services.referral.title}</h2>
                <ul>
                  <li>{referral?.referral_text || t.services.referral.text}</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="about" className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>{content.about.title}</h2>
            </div>
            <p className="lead">{content.about.about_text || content.about.text}</p>
          </div>
        </section>

        <section id="testimonials" className="section">
          <div className="container">
            <div className="section-head">
              <h2>{t.testimonials.title}</h2>
            </div>
            {content.testimonials && content.testimonials.length > 0 ? (
              <div className="card-grid">
                {content.testimonials.map((testimonial, i) => (
                  <article key={i} className="card">
                    <p>"{testimonial.testimonial_text}"</p>
                    <h3>{testimonial.customer_name}</h3>
                    {testimonial.customer_role && <p className="role">{testimonial.customer_role}</p>}
                  </article>
                ))}
              </div>
            ) : (
              <div className="placeholder">{t.testimonials.placeholder}</div>
            )}
          </div>
        </section>

        <section id="contact" className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>{content.contact.title}</h2>
            </div>
            <div className="contact-card">
              <h3>{content.contact.name || 'Nyein Pyae Sone'}</h3>
              <p className="role">{content.contact.role}</p>
              <div className="contact-lines">
                <span>{content.contact.phone_label || content.contact.phone} {content.contact.phone_value || '+95 9 123 456 789'}</span>
                <span>{content.contact.email_label || content.contact.email} {content.contact.email_value || 'contact@ansitsolution.com'}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>{content.hero.title}</span>
            <button
              onClick={() => setView('dashboard')}
              style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: '0.75rem', textAlign: 'left', cursor: 'pointer', padding: 0 }}
            >
              🔒 Manage
            </button>
          </div>
          <span>{content.footer.footer_text || content.footer.text}</span>
        </div>
      </footer>
    </div>
  )
}
