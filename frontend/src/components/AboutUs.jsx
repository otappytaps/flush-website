import React from "react";
import { useNavigate } from "react-router-dom";
import "./AboutUs.css";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="about-main-container">
      <div className="about-card">
        <button className="about-back-btn" onClick={() => navigate(-1)}>
          ← Get me out of here
        </button>
        
        <div className="about-header">
          <span className="about-logo-icon">🚽</span>
          <h1 className="about-title">Why Flush?</h1>
          <p className="about-subtitle">Because everyone's a philosopher on the porcelain throne.</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>The Vision</h2>
            <p>
              Let’s be honest: your best ideas don't happen at your desk. They happen in the 
              bathroom. Flush is the world's first premier forum dedicated to the thoughts, 
              theorems, and "log" entries created while you're busy doing... business.
            </p>
          </section>

          <section className="about-section">
            <h2>No Clogs, Just Content</h2>
            <p>
              We got tired of social media being a dump. So we built a literal dump. 
              Whether you're looking for deep shower thoughts or just need to vent while 
              you're stationary, Flush is here to make sure your voice is heard before 
              the final swirl.
            </p>
          </section>

          <section className="about-section">
            <h2>Tech Stack & Libraries</h2>
            <div className="libraries-container">
              <div className="library-group">
                <h3>Backend</h3>
                <ul>
                  <li>express</li>
                  <li>mongoose & mongodb</li>
                  <li>jsonwebtoken & bcrypt</li>
                  <li>dotenv & cors</li>
                  <li>express-session</li>
                </ul>
              </div>
              <div className="library-group">
                <h3>Frontend</h3>
                <ul>
                  <li>react-router-dom</li>
                  <li>axios</li>
                  <li>react-hot-toast</li>
                  <li>fortawesome (icons)</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="about-features-grid">
            <div className="feature-item">
              <h3>🌊 Fluid</h3>
              <p>Real-time updates that flow like water.</p>
            </div>
            <div className="feature-item">
              <h3>🧼 Clean Feeds</h3>
              <p>We wash away the bots so only the realest posts remain.</p>
            </div>
            <div className="feature-item">
              <h3>🤝 Transparent</h3>
              <p>Built by the community, for the community.</p>
            </div>
          </div>
        </div>

        <div className="about-footer">
          <p>© 2026 Flush. Please remember to wash your hands after posting.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;