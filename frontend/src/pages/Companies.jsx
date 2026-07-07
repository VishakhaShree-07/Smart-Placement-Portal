import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(`${API_URL}/api/company`);
        const data = await res.json();

        setCompanies(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load companies:', err);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div
        className="dashboard-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}
      >
        <div
          className="gradient-text"
          style={{ fontSize: '1.5rem' }}
        >
          Loading Companies...
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header glass-card">
        <div>
          <span className="dashboard-badge">PLACEMENTS</span>

          <h1 className="dashboard-title">
            Available <span className="gradient-text">Companies</span>
          </h1>

          <p className="dashboard-subtitle">
            Explore top companies and their hiring processes.
          </p>
        </div>
      </div>

      {companies.length === 0 ? (
        <div
          className="glass-card"
          style={{
            textAlign: 'center',
            padding: '3rem'
          }}
        >
          <h3>No Companies Available</h3>

          <p>
            Check back later for new placement opportunities.
          </p>
        </div>
      ) : (
        <div className="dashboard-grid">
          {companies.map((company) => (
            <Link
              to={`/companies/${company._id}`}
              key={company._id}
              style={{
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div className="dashboard-card glass-card">

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}
                >
                  {company.logo && (
                    <img
                      src={company.logo}
                      alt={company.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'contain',
                        marginRight: '1rem',
                        background: '#fff',
                        padding: '5px',
                        borderRadius: '8px'
                      }}
                    />
                  )}

                  <h3
                    style={{
                      margin: 0,
                      fontSize: '1.5rem',
                      borderBottom: 'none',
                      paddingBottom: 0
                    }}
                  >
                    {company.name}
                  </h3>
                </div>

                <div className="profile-detail">
                  <span className="label">
                    Package (CTC)
                  </span>

                  <span
                    className="value gradient-text"
                    style={{ fontWeight: 'bold' }}
                  >
                    {company.package}
                  </span>
                </div>

                <div className="profile-detail">
                  <span className="label">
                    Eligibility
                  </span>

                  <span className="value">
                    {company.eligibility}
                  </span>
                </div>

                <div className="profile-detail">
                  <span className="label">
                    Difficulty
                  </span>

                  <span
                    className={`value badge badge-${company.difficulty.toLowerCase()}`}
                    style={{
                      padding: '0.3rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      backgroundColor:
                        company.difficulty === 'Easy'
                          ? 'rgba(76,175,80,0.2)'
                          : company.difficulty === 'Medium'
                          ? 'rgba(255,152,0,0.2)'
                          : 'rgba(244,67,54,0.2)',

                      color:
                        company.difficulty === 'Easy'
                          ? '#4CAF50'
                          : company.difficulty === 'Medium'
                          ? '#FF9800'
                          : '#F44336'
                    }}
                  >
                    {company.difficulty}
                  </span>
                </div>

                <div
                  style={{
                    marginTop: '1.5rem',
                    textAlign: 'right'
                  }}
                >
                  <span
                    className="btn btn-secondary"
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.4rem 0.8rem'
                    }}
                  >
                    View Details →
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Companies;