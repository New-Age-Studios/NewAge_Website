import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className="container">
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          
          <div className={styles.leftCol}>
            <div className={styles.badge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              Tebex Top Creator ↗
            </div>
            
            <h1 className={styles.title}>
              The most popular vehicle scripts for your FiveM server.
            </h1>
            
            <div className={styles.actions}>
              <a href="#scripts" className="btn btn-primary" style={{padding: '16px 32px', fontSize: '16px', borderRadius: '30px'}}>
                Browse Scripts →
              </a>
              
              <div className={styles.secondaryAction}>
                <div style={{background: 'rgba(255,94,0,0.2)', padding: '8px', borderRadius: '8px'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="M2 10h20"></path>
                  </svg>
                </div>
                <div>
                  Get our full collection for R$140/month.
                  <a href="#" className={styles.learnMore}>Learn more →</a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightCol}>
            <img src="/hero-car.png" alt="Orange Porsche" className={styles.carImage} />
            
            <div className={`${styles.floatingPanel} ${styles.colorPicker}`}>
              <div className={styles.panelTitle}>Vehicle Colour</div>
              <div className={styles.colorGradient}>
                <div className={styles.colorDot}></div>
              </div>
              <div style={{display: 'flex', gap: '4px'}}>
                <div style={{width: '20px', height: '20px', background: '#ff5e00', borderRadius: '50%', border: '2px solid #fff'}}></div>
                <div style={{flex: 1, height: '20px', background: 'linear-gradient(to right, #00f, #0f0, #ff0, #f00)', borderRadius: '10px'}}></div>
              </div>
            </div>

            <div className={`${styles.floatingPanel} ${styles.stancePanel}`}>
              <div className={styles.panelTitle}>Stance</div>
              <div className={styles.sliderTrack}>
                <div className={styles.sliderFill} style={{width: '60%'}}>
                  <div className={styles.sliderThumb}></div>
                </div>
              </div>
            </div>

            <div className={`${styles.floatingPanel} ${styles.sliderPanel}`}>
              <div className={styles.panelTitle}>Acceleration</div>
              <div className={styles.sliderTrack}>
                <div className={styles.sliderFill}>
                  <div className={styles.sliderThumb}></div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className={styles.featuresBar}>
        <div className={styles.feature}>
          <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <div>
            <h3>Instant Delivery</h3>
            <p>Available within minutes in your Cfx.re Keymaster account.</p>
          </div>
        </div>
        <div className={styles.feature}>
          <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <div>
            <h3>Free Updates Forever</h3>
            <p>We promise to never charge you for an update, not even a v2.</p>
          </div>
        </div>
        <div className={styles.feature}>
          <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <div>
            <h3>Secure & Performant</h3>
            <p>Low resource usage, secured events & designed for scale.</p>
          </div>
        </div>
        <div className={styles.feature}>
          <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          <div>
            <h3>Easy Setup</h3>
            <p>Quick and easy setup, with support available 24/7.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
