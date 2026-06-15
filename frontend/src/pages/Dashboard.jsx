import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAttempted: 0,
    latestScore: null,
    latestTotalQuestions: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/quiz/results', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok && data.status === 'success') {
          setStats(data.data.stats);
        }
      } catch (err) {
        console.error('Failed to load quiz statistics:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header glass-card">
        <div>
          <span className="dashboard-badge">STUDENT PORTAL</span>
          <h1 className="dashboard-title">
            Welcome back, <span className="gradient-text">{user?.name}</span>
          </h1>
          <p className="dashboard-subtitle">Manage your preparation path and track recruitment milestones.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card glass-card">
          <h3>Candidate Profile</h3>
          <div className="profile-detail">
            <span className="label">Registered Name</span>
            <span className="value">{user?.name}</span>
          </div>
          <div className="profile-detail">
            <span className="label">Email Address</span>
            <span className="value">{user?.email}</span>
          </div>
          <div className="profile-detail">
            <span className="label">System Role</span>
            <span className="value" style={{ textTransform: 'capitalize' }}>
              {user?.role}
            </span>
          </div>
        </div>

        <div className="dashboard-card glass-card">
          <h3>Aptitude Practice Stats</h3>
          <div className="profile-detail">
            <span className="label">Quizzes Attempted</span>
            <span className="value">{stats.totalAttempted}</span>
          </div>
          <div className="profile-detail">
            <span className="label">Latest Quiz Score</span>
            <span className="value">
              {stats.latestScore !== null
                ? `${stats.latestScore} / ${stats.latestTotalQuestions}`
                : 'No quizzes attempted'}
            </span>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/quiz" className="btn btn-primary" style={{ width: '100%', fontSize: '0.9rem', padding: '0.6rem 1rem' }}>
              Start Practice Quiz
            </Link>
          </div>
        </div>

        <div className="dashboard-card glass-card">
          <h3>Preparation Progress</h3>
          <div className="progress-item">
            <div className="progress-info">
              <span>Data Structures & Algorithms</span>
              <span>12 / 100 Solved</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar" style={{ width: '12%' }}></div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-info">
              <span>ATS Resume Alignment</span>
              <span>85% Match</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-info">
              <span>Behavioral Mock Interviews</span>
              <span>2 Completed</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
