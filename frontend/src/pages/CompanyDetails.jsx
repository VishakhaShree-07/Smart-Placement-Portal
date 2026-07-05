import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`/api/company/${id}`);
        if (!res.ok) throw new Error('Company not found');
        const data = await res.json();
        setCompany(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="gradient-text" style={{ fontSize: '1.5rem' }}>Loading Company Details...</div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="dashboard-container animate-fade-in">
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>{error || 'Company Not Found'}</h3>
          <Link to="/companies" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Back to Companies</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container animate-fade-in">
      <Link to="/companies" style={{ display: 'inline-block', marginBottom: '1.5rem', color: '#a0a0a0', textDecoration: 'none' }}>
        &larr; Back to Companies
      </Link>
      
      <div className="dashboard-header glass-card" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {company.logo && (
          <img src={company.logo} alt={company.name} style={{ width: '100px', height: '100px', objectFit: 'contain', background: '#fff', padding: '10px', borderRadius: '12px' }} />
        )}
        <div>
          <span className="dashboard-badge">{company.difficulty} Difficulty</span>
          <h1 className="dashboard-title gradient-text">{company.name}</h1>
          <p className="dashboard-subtitle">CTC: {company.package} | Eligibility: {company.eligibility}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card glass-card" style={{ gridColumn: 'span 2' }}>
          <h3>Hiring Process ({company.interviewRounds} Rounds)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {company.hiringProcess.map((round, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ 
                  width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight: '1rem', flexShrink: 0 
                }}>
                  {index + 1}
                </div>
                <span>{round}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card glass-card">
          <h3>Skills Required</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: '1rem' }}>
            {company.skillsRequired.map((skill, index) => (
              <span key={index} style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                padding: '0.5rem 1rem', 
                borderRadius: '20px', 
                fontSize: '0.9rem',
                border: '1px solid rgba(255,255,255,0.1)' 
              }}>
                {skill}
              </span>
            ))}
          </div>
          
          <div style={{ marginTop: '3rem' }}>
            <Link to="/resources" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
              View Prep Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
