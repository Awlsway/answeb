import { useState } from 'react'
import logo from './assets/logo.png'
import banner from './assets/banner.png'
import { translations } from './translations'

// Replace src/assets/logo.svg and src/assets/banner.svg with your images (logo.png/banner.jpg) and update imports if needed.

export default function App() {
  const [language, setLanguage] = useState('en')
  const t = translations[language]

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'my' : 'en')
  }

  return (
    <div className="page">
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#hero">
            <img src={logo} alt="A&S IT SOLUTION logo" className="logo" />
            <span>{t.hero.title}</span>
          </a>
          <nav className="nav-links">
            <a href="#services">{t.nav.services}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#testimonials">{t.nav.testimonials}</a>
            <a href="#contact">{t.nav.contact}</a>
            <button className="btn-lang" onClick={toggleLanguage} style={{ marginLeft: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
              {language === 'en' ? 'Myanmar' : 'English'}
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>{t.hero.title}</h1>
              <p className="tagline">{t.hero.tagline}</p>
              <div className="hero-actions">
                <a className="btn" href="#contact">{t.hero.cta}</a>
                <a className="btn ghost" href="#services">{t.hero.services}</a>
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
              <h1>{t.services.title}</h1>
              <p>{t.services.subtitle}</p>
            </div>

            <div className="card">
              <h2>{t.services.productVal.title}</h2>
              <ul>
                <li>{t.services.productVal.desc}</li>
                <li>
                  {t.services.productVal.functions.label}
                  <ul>
                    {t.services.productVal.functions.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </li>
                <li>{t.services.productVal.auth}</li>
                <li>{t.services.productVal.platform}</li>
              </ul>
            </div>

            <div className="card-grid">
              <article className="card">
                <h2>{t.services.packages.title}</h2>
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
              </article>

              <article className="card">
                <h2>{t.services.included.title}</h2>
                <ul>
                  {t.services.included.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="card">
                <h2>{t.services.excluded.title}</h2>
                <ul>
                  {t.services.excluded.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="card-grid">
              <article className="card">
                <h2>{t.services.timeline.title}</h2>
                <ul>
                  <li>{t.services.timeline.text}</li>
                </ul>
              </article>

              <article className="card">
                <h2>{t.services.support.title}</h2>
                <ul>
                  {t.services.support.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="card-grid">
              <article className="card">
                <h2>{t.services.pricing.title}</h2>
                <ul>
                  {t.services.pricing.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="card">
                <h2>{t.services.maintenance.title}</h2>
                <p>{t.services.maintenance.subtitle}</p>
                <ul>
                  {t.services.maintenance.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="card">
                <h2>{t.services.referral.title}</h2>
                <ul>
                  <li>{t.services.referral.text}</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="about" className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>{t.about.title}</h2>
            </div>
            <p className="lead">{t.about.text}</p>
          </div>
        </section>

        <section id="testimonials" className="section">
          <div className="container">
            <div className="section-head">
              <h2>{t.testimonials.title}</h2>
            </div>
            <div className="placeholder">{t.testimonials.placeholder}</div>
          </div>
        </section>

        <section id="contact" className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>{t.contact.title}</h2>
            </div>
            <div className="contact-card">
              <h3>Nyein Pyae Sone</h3>
              <p className="role">{t.contact.role}</p>
              <div className="contact-lines">
                <span>{t.contact.phone}</span>
                <span>{t.contact.email}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>{t.hero.title}</span>
          <span>{t.footer.text}</span>
        </div>
      </footer>
    </div>
  )
}
