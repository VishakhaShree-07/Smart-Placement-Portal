import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="animate-fade-in">
      <section className="hero-section">
        <div className="hero-tag">Crack Your Dream Placement</div>
        <h1 className="hero-title">
          Smart Placement <span className="gradient-text">Preparation Portal</span>
        </h1>
        <p className="hero-subtitle">
          Your all-in-one platform to master coding interviews, build professional resumes, 
          practice interactive mock tests, and get hired by top-tier tech companies.
        </p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-primary">Get Started Free</Link>
          <Link to="/login" className="btn btn-secondary">Login to Portal</Link>
        </div>
      </section>

      <section className="features-grid">
        <div className="feature-card glass-card">
          <div className="feature-icon">💻</div>
          <h3 className="feature-title">Coding Assessment</h3>
          <p className="feature-desc">
            Practice real-world coding questions covering major data structures and algorithms with our interactive judge.
          </p>
        </div>

        <div className="feature-card glass-card">
          <div className="feature-icon">📄</div>
          <h3 className="feature-title">AI Resume Builder</h3>
          <p className="feature-desc">
            Build ATS-friendly, professional resumes using automated feedback and customizable, premium templates.
          </p>
        </div>

        <div className="feature-card glass-card">
          <div className="feature-icon">🤝</div>
          <h3 className="feature-title">Mock Interviews</h3>
          <p className="feature-desc">
            Simulate realistic interview situations with behavioral quizzes, flashcards, and step-by-step guidance.
          </p>
        </div>

        <div className="feature-card glass-card">
          <div className="feature-icon">📈</div>
          <h3 className="feature-title">Analytics Tracker</h3>
          <p className="feature-desc">
            Track your performance, monitor weak areas, and check your progress across topics with our visual charts.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
