import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">🎓 Smart<span>Placement</span></div>
          <p className="footer-desc">Your ultimate platform for cracking top tech interviews and accelerating your career growth.</p>
        </div>
        
        <div className="footer-links-group">
          <h4 className="footer-title">Quick Links</h4>
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/companies" className="footer-link">Companies</Link>
          <Link to="/resources" className="footer-link">Resources</Link>
          <Link to="/quiz" className="footer-link">Practice Quiz</Link>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-title">Contact</h4>
          <a href="mailto:support@smartplacement.com" className="footer-link">support@smartplacement.com</a>
          <p className="footer-text">1-800-PLACEMENT</p>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-title">Social</h4>
          <a href="#" className="footer-link">GitHub</a>
          <a href="#" className="footer-link">LinkedIn</a>
          <a href="#" className="footer-link">Twitter</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Smart Placement Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
