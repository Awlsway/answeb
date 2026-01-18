export default function LoadingSkeleton() {
    return (
        <div className="page">
            {/* Nav Skeleton */}
            <header className="nav">
                <div className="container nav-inner">
                    <div className="skeleton skeleton-brand"></div>
                    <div className="skeleton-nav-links">
                        <div className="skeleton skeleton-link"></div>
                        <div className="skeleton skeleton-link"></div>
                        <div className="skeleton skeleton-link"></div>
                        <div className="skeleton skeleton-link"></div>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Skeleton */}
                <section className="hero">
                    <div className="container hero-grid">
                        <div className="hero-copy">
                            <div className="skeleton skeleton-eyebrow"></div>
                            <div className="skeleton skeleton-title"></div>
                            <div className="skeleton skeleton-tagline"></div>
                            <div className="hero-actions">
                                <div className="skeleton skeleton-btn"></div>
                                <div className="skeleton skeleton-btn"></div>
                            </div>
                        </div>
                        <div className="hero-media">
                            <div className="skeleton skeleton-image"></div>
                        </div>
                    </div>
                </section>

                {/* Services Skeleton */}
                <section className="section">
                    <div className="container">
                        <div className="section-head">
                            <div className="skeleton skeleton-heading"></div>
                            <div className="skeleton skeleton-text"></div>
                        </div>
                        <div className="card-grid">
                            <div className="card">
                                <div className="skeleton skeleton-card-title"></div>
                                <div className="skeleton skeleton-text"></div>
                                <div className="skeleton skeleton-text"></div>
                            </div>
                            <div className="card">
                                <div className="skeleton skeleton-card-title"></div>
                                <div className="skeleton skeleton-text"></div>
                                <div className="skeleton skeleton-text"></div>
                            </div>
                            <div className="card">
                                <div className="skeleton skeleton-card-title"></div>
                                <div className="skeleton skeleton-text"></div>
                                <div className="skeleton skeleton-text"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
