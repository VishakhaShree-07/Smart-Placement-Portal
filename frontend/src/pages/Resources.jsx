import { useState, useEffect } from 'react';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch('/api/resources');
        const data = await res.json();
        setResources(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load resources:', err);
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="gradient-text" style={{ fontSize: '1.5rem' }}>Loading Resources...</div>
      </div>
    );
  }

  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {});

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header glass-card">
        <div>
          <span className="dashboard-badge">PREPARATION</span>
          <h1 className="dashboard-title">
            Placement <span className="gradient-text">Resources</span>
          </h1>
          <p className="dashboard-subtitle">Curated study materials to help you crack your dream job.</p>
        </div>
      </div>

      {Object.keys(groupedResources).length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No Resources Available</h3>
          <p>Check back later for new study materials.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {Object.entries(groupedResources).map(([category, categoryResources]) => (
            <div key={category} className="glass-card" style={{ padding: '2rem' }}>
              <h2 style={{ marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {category}
              </h2>
              <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {categoryResources.map(resource => (
                  <div key={resource._id} className="glass-card" style={{ 
                    padding: '1.5rem', 
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', borderBottom: 'none' }}>{resource.title}</h3>
                    <p style={{ color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>{resource.description}</p>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ textAlign: 'center', padding: '0.5rem' }}>
                      Access Resource ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resources;
