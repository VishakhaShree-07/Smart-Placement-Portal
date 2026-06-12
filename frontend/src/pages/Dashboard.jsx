import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

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
