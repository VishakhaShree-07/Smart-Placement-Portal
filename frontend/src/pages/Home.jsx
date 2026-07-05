import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="animate-fade-in">
      <section className="hero-section">
        <div className="hero-content">
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
        </div>
        <div className="hero-image-container">
          <img src="/assets/hero_illustration.png" alt="Placement Preparation" className="hero-image" />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section animate-fade-up">
        <div className="stat-card glass-card hover-scale">
          <div className="stat-value">5000+</div>
          <div className="stat-label">Students</div>
        </div>
        <div className="stat-card glass-card hover-scale">
          <div className="stat-value">120+</div>
          <div className="stat-label">Companies</div>
        </div>
        <div className="stat-card glass-card hover-scale">
          <div className="stat-value">15000+</div>
          <div className="stat-label">Quiz Attempts</div>
        </div>
        <div className="stat-card glass-card hover-scale">
          <div className="stat-value">95%</div>
          <div className="stat-label">Placement Success</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-grid animate-fade-up">
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

      {/* Testimonials Section */}
      <section className="testimonials-section animate-slide-in">
        <h2 className="section-title">What Our Students Say</h2>
        <p className="section-subtitle">Join thousands of students who have cracked their dream placements with us.</p>
        
        <div className="testimonials-grid">
          <div className="testimonial-card glass-card hover-scale">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">"Best platform for placement preparation. The mock tests perfectly simulated real company assessments."</p>
            <div className="testimonial-author">- Rahul S., Placed at Amazon</div>
          </div>
          
          <div className="testimonial-card glass-card hover-scale">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">"Improved my aptitude skills significantly. The analytics helped me figure out exactly what to study."</p>
            <div className="testimonial-author">- Priya M., Placed at TCS</div>
          </div>
          
          <div className="testimonial-card glass-card hover-scale">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">"Helped me organize my interview preparation. The company-specific resources are an absolute lifesaver!"</p>
            <div className="testimonial-author">- Aman K., Placed at Flipkart</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
