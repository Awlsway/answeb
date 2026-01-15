import logo from './assets/logo.png'
import banner from './assets/banner.png'

// Replace src/assets/logo.svg and src/assets/banner.svg with your images (logo.png/banner.jpg) and update imports if needed.

const services = [
  'Help to solve Digital Problem',
  'Help to use Digital Product',
  'Help to do business effective and efficient',
]

export default function App() {
  return (
    <div className="page">
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#hero">
            <img src={logo} alt="A&S IT SOLUTION logo" className="logo" />
            <span>A&S IT SOLUTION</span>
          </a>
          <nav className="nav-links">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Modern minimal IT partner</p>
              <h1>A&S IT SOLUTION</h1>
              <p className="tagline">A love story in everyline of code</p>
              <div className="hero-actions">
                <a className="btn" href="#contact">Start a project</a>
                <a className="btn ghost" href="#services">View services</a>
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
              <h2>Services</h2>
              <p>Practical support for real-world digital challenges.</p>
            </div>
            <div className="card-grid">
              {services.map((service) => (
                <article key={service} className="card">
                  <h3>{service}</h3>
                  <p>
                    We keep it clear, focused, and tailored so every solution feels effortless.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>About</h2>
            </div>
            <p className="lead">
              A small start up business aim to help people who have too much to do and don't have time to solve small problems.
            </p>
          </div>
        </section>

        <section id="testimonials" className="section">
          <div className="container">
            <div className="section-head">
              <h2>Testimonials</h2>
            </div>
            <div className="placeholder">Testimonials coming soon</div>
          </div>
        </section>

        <section id="contact" className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>Contact</h2>
            </div>
            <div className="contact-card">
              <h3>Nyein Pyae Sone</h3>
              <p className="role">Manager</p>
              <div className="contact-lines">
                <span>Phone:</span>
                <span>Email:</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>A&S IT SOLUTION</span>
          <span>Modern minimal digital support.</span>
        </div>
      </footer>
    </div>
  )
}
