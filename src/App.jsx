import logo from './assets/logo.png'
import banner from './assets/banner.png'

// Replace src/assets/logo.svg and src/assets/banner.svg with your images (logo.png/banner.jpg) and update imports if needed.

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
              <h1>Clinic Software (Offline-first) — Service Specification</h1>
              <p>Service details for Myanmar (Monywa) clinics and pharmacies.</p>
            </div>

            <div className="card">
              <h2>Product</h2>
              <ul>
                <li>Offline Flutter app for clinics/pharmacies.</li>
                <li>
                  Functions:
                  <ul>
                    <li>Register patient</li>
                    <li>Record patient visit</li>
                    <li>Record prescription to patient</li>
                    <li>Record clinic income</li>
                    <li>Record medicine stock in and stock out</li>
                  </ul>
                </li>
                <li>Authentication: No login / no user accounts</li>
                <li>Runs on: Android and Windows</li>
              </ul>
            </div>

            <div className="card-grid">
              <article className="card">
                <h2>Packages</h2>
                <h3>Free Plan</h3>
                <ul>
                  <li>Price: Free</li>
                  <li>Limit: Up to 30 registered patients</li>
                  <li>Note: No function limitation (only patient limit)</li>
                </ul>
                <h3>ANS-1 Plan</h3>
                <ul>
                  <li>Price: 300,000 MMK</li>
                  <li>Limit: No limitation</li>
                  <li>Included devices: 1 Windows + 1 Android</li>
                  <li>Extra device fee: 100,000 MMK per additional device</li>
                  <li>Includes: 1 free annual data maintenance</li>
                  <li>
                    Consultation:
                    <ul>
                      <li>Free online consultation: 10 minutes</li>
                      <li>Physical consultation visit (Monywa): 30,000 MMK per visit</li>
                    </ul>
                  </li>
                </ul>
              </article>

              <article className="card">
                <h2>What’s included</h2>
                <ul>
                  <li>Patient registration</li>
                  <li>Patient visit recording</li>
                  <li>Prescription recording to patient</li>
                  <li>Clinic income recording</li>
                  <li>Medicine stock in / stock out</li>
                  <li>Installation on agreed device(s)</li>
                  <li>
                    Initial configuration:
                    <ul>
                      <li>Clinic name</li>
                      <li>Basic categories (if supported)</li>
                    </ul>
                  </li>
                </ul>
              </article>

              <article className="card">
                <h2>What’s excluded</h2>
                <ul>
                  <li>Authentication / login / user accounts</li>
                  <li>Custom modules beyond the listed functions</li>
                  <li>Hardware supply (devices, printers, barcode scanners)</li>
                  <li>Data restoration / Backup from old data (Available as paid service)</li>
                </ul>
              </article>
            </div>

            <div className="card-grid">
              <article className="card">
                <h2>Delivery timeline</h2>
                <ul>
                  <li>Demo → Scope confirmation → Installation → Initial setup → Training → Support</li>
                </ul>
              </article>

              <article className="card">
                <h2>Support rules</h2>
                <ul>
                  <li>Channels: Phone, Email</li>
                  <li>Support hours: Mon–Sat, 9am–5pm</li>
                  <li>Response time: within 24 hours</li>
                  <li>Training for new staff: Available as paid service</li>
                  <li>Payment: Accept any payment method</li>
                </ul>
              </article>
            </div>

            <div className="card-grid">
              <article className="card">
                <h2>Pricing</h2>
                <ul>
                  <li>Included devices (ANS-1): 1 Windows + 1 Android</li>
                  <li>Extra device fee: 100,000 MMK per additional device</li>
                  <li>Physical visit fee: 30,000 MMK per visit</li>
                </ul>
              </article>

              <article className="card">
                <h2>Data Maintenance</h2>
                <p>(ANS-1 includes 1 free annual)</p>
                <ul>
                  <li>App update/refresh</li>
                  <li>Clean unnecessary files</li>
                  <li>Archive old records</li>
                  <li>Backup check</li>
                </ul>
              </article>

              <article className="card">
                <h2>Referral commission</h2>
                <ul>
                  <li>10% commission for referral customer</li>
                </ul>
              </article>
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
