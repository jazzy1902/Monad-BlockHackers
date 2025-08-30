import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { ThemeToggle } from './components/ThemeToggle';
import { ScrollToTop } from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="main">
          <div className="container">
            <div className="hero">
              <div className="hero__content">
                <h2>Welcome to the Future of Energy</h2>
                <p>
                  Track, monitor, and optimize your solar energy consumption with our 
                  cutting-edge portal. Join the sustainable energy revolution today.
                </p>
                <div className="hero__features">
                  <div className="feature-card">
                    <h3>Real-time Monitoring</h3>
                    <p>Track your solar energy production and consumption in real-time with advanced analytics.</p>
                  </div>
                  <div className="feature-card">
                    <h3>Smart Analytics</h3>
                    <p>Get insights into your energy patterns and optimize your consumption for maximum efficiency.</p>
                  </div>
                  <div className="feature-card">
                    <h3>Carbon Footprint</h3>
                    <p>Monitor your environmental impact and see how much CO₂ you're saving with solar energy.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Add some content to make the page scrollable for testing ScrollToTop */}
            <section className="content-section">
              <h2>Solar Energy Benefits</h2>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <h4>Environmental Impact</h4>
                  <p>Reduce your carbon footprint and contribute to a cleaner planet by using renewable solar energy.</p>
                </div>
                <div className="benefit-item">
                  <h4>Cost Savings</h4>
                  <p>Lower your electricity bills significantly and achieve long-term savings with solar power.</p>
                </div>
                <div className="benefit-item">
                  <h4>Energy Independence</h4>
                  <p>Gain control over your energy production and reduce dependence on traditional power grids.</p>
                </div>
                <div className="benefit-item">
                  <h4>Advanced Technology</h4>
                  <p>Leverage blockchain technology for transparent energy trading and smart grid integration.</p>
                </div>
              </div>
            </section>

            <section className="content-section">
              <h2>Get Started Today</h2>
              <p>Ready to transform your energy consumption? Contact our team to learn more about solar solutions.</p>
              <div style={{ height: '800px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', marginTop: 'var(--spacing-xl)' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)' }}>
                  Scroll down to see the scroll-to-top button appear!
                </p>
              </div>
            </section>
          </div>
        </main>
        
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
        
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;
