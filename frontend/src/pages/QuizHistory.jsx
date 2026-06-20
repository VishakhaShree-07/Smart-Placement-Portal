import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QuizHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/quiz/history', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok && data.status === 'success') {
          setHistory(data.data.history);
        } else {
          setError(data.message || 'Failed to fetch quiz history');
        }
      } catch (err) {
        console.error('Failed to load quiz history:', err);
        setError('Connection error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getCategoryBadgeClass = (category) => {
    switch (category.toLowerCase()) {
      case 'aptitude':
        return 'badge-aptitude';
      case 'reasoning':
        return 'badge-reasoning';
      case 'verbal':
        return 'badge-verbal';
      default:
        return 'badge-default';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your preparation history...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header glass-card">
        <div>
          <span className="dashboard-badge font-bold">PERFORMANCE SUMMARY</span>
          <h1 className="dashboard-title">Quiz History</h1>
          <p className="dashboard-subtitle">Review your past performance and track your preparation progress.</p>
        </div>
        <div>
          <Link to="/quiz" className="btn btn-primary">
            Take New Quiz
          </Link>
        </div>
      </div>

      {error && (
        <div className="error-message glass-card" style={{ padding: '1rem', color: '#ef4444', marginBottom: '2rem' }}>
          {error}
        </div>
      )}

      {!error && history.length === 0 ? (
        <div className="empty-state glass-card text-center" style={{ padding: '4rem 2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>No Quizzes Attempted Yet</h3>
          <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '2rem' }}>
            Start practicing quizzes to analyze your strengths and weaknesses.
          </p>
          <Link to="/quiz" className="btn btn-primary">
            Start Practice Quiz
          </Link>
        </div>
      ) : (
        <div className="table-responsive glass-card">
          <table className="history-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Score</th>
                <th>Accuracy</th>
                <th>Attempt Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((attempt) => {
                const accuracy = attempt.totalQuestions > 0 
                  ? Math.round((attempt.score / attempt.totalQuestions) * 100) 
                  : 0;

                return (
                  <tr key={attempt._id}>
                    <td>
                      <span className={`category-badge ${getCategoryBadgeClass(attempt.category)}`}>
                        {attempt.category}
                      </span>
                    </td>
                    <td className="font-semibold">
                      {attempt.score} <span className="text-muted">/ {attempt.totalQuestions}</span>
                    </td>
                    <td>
                      <div className="accuracy-cell-container">
                        <span className="font-semibold">{accuracy}%</span>
                        <div className="progress-bar-bg mini-bar">
                          <div 
                            className="progress-bar" 
                            style={{ 
                              width: `${accuracy}%`,
                              background: accuracy >= 80 ? '#10b981' : accuracy >= 50 ? '#f59e0b' : '#ef4444'
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="text-muted">{formatDate(attempt.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QuizHistory;
