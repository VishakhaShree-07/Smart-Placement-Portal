import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const fetchQuestions = async (cat) => {
    setLoading(true);
    setError(null);
    setCategory(cat);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/quiz/questions?category=${cat}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        if (data.data.questions.length === 0) {
          setError('No questions found in this category.');
        } else {
          setQuestions(data.data.questions);
          setCurrentIdx(0);
          setAnswers({});
          setSelectedOption('');
          setResult(null);
        }
      } else {
        setError(data.message || 'Failed to load questions.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAnswers((prev) => ({
      ...prev,
      [questions[currentIdx]._id]: option
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      const nextQId = questions[currentIdx + 1]._id;
      setSelectedOption(answers[nextQId] || '');
    }
  };

  const handlePrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      const prevQId = questions[currentIdx - 1]._id;
      setSelectedOption(answers[prevQId] || '');
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          category,
          answers
        })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setResult(data.data.result);
      } else {
        setError(data.message || 'Failed to submit quiz.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getFeedbackMessage = (pct) => {
    if (pct === 100) return 'Perfect Score! You are fully prepared for top-tier tech placements.';
    if (pct >= 70) return 'Excellent work! You have a solid grasp of these concepts.';
    if (pct >= 40) return 'Good effort! Keep practicing to improve your accuracy and speed.';
    return 'Don\'t worry! Review the placement modules and try again to improve.';
  };

  if (loading) {
    return (
      <div className="loading-container animate-fade-in">
        <div className="spinner"></div>
        <p>Fetching placement questions...</p>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="loading-container animate-fade-in">
        <div className="spinner"></div>
        <p>Evaluating your answers...</p>
      </div>
    );
  }

  if (result) {
    const pct = Math.round((result.score / result.totalQuestions) * 100);
    return (
      <div className="auth-container animate-fade-in" style={{ padding: '3rem 1rem' }}>
        <div className="auth-card glass-card" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div className="auth-header">
            <span className="dashboard-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              COMPLETED
            </span>
            <h2 className="auth-title" style={{ marginTop: '0.75rem' }}>Quiz <span className="gradient-text">Result</span></h2>
            <p className="auth-subtitle" style={{ textTransform: 'capitalize' }}>
              Category: {result.category}
            </p>
          </div>

          <div style={{ margin: '2.5rem 0' }}>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'hsl(var(--accent))', lineHeight: 1 }}>
              {result.score} / {result.totalQuestions}
            </div>
            <div style={{ fontSize: '1.1rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.5rem', fontWeight: 500 }}>
              Accuracy: {pct}%
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '1rem', color: '#ffffff', padding: '0 1rem' }}>
              {getFeedbackMessage(pct)}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => setCategory(null)}>
              Try Another Quiz
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (category && questions.length > 0) {
    const q = questions[currentIdx];
    const progressPct = ((currentIdx + 1) / questions.length) * 100;

    return (
      <div className="auth-container animate-fade-in" style={{ padding: '3rem 1rem' }}>
        <div className="auth-card glass-card" style={{ maxWidth: '700px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span className="dashboard-badge" style={{ textTransform: 'uppercase' }}>
              {category}
            </span>
            <span style={{ fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))', fontWeight: 500 }}>
              Question {currentIdx + 1} of {questions.length}
            </span>
          </div>

          <div className="progress-bar-bg" style={{ height: '4px', marginBottom: '2.5rem' }}>
            <div className="progress-bar" style={{ width: `${progressPct}%` }}></div>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div style={{ minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#ffffff', marginBottom: '2rem', lineHeight: 1.4 }}>
              {q.question}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1, marginBottom: '2rem' }}>
              {q.options.map((option, index) => {
                const isSelected = selectedOption === option;
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className="form-input"
                    style={{
                      textAlign: 'left',
                      padding: '1.1rem 1.5rem',
                      cursor: 'pointer',
                      border: isSelected ? '1px solid hsl(var(--primary-hover))' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isSelected ? 'rgba(168, 85, 247, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                      boxShadow: isSelected ? '0 0 0 2px hsla(263, 70%, 50%, 0.25)' : 'none',
                      transition: 'all 0.2s ease-in-out',
                      borderRadius: 'calc(var(--radius) - 2px)',
                      color: isSelected ? '#ffffff' : 'hsl(var(--muted))'
                    }}
                  >
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: isSelected ? 'hsl(var(--primary))' : 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      marginRight: '1rem',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1.5rem' }}>
              <button
                className="btn btn-secondary"
                onClick={handlePrevious}
                disabled={currentIdx === 0}
                style={{ flexGrow: 1 }}
              >
                Previous
              </button>

              {currentIdx === questions.length - 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={!selectedOption}
                  style={{ flexGrow: 1 }}
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={!selectedOption}
                  style={{ flexGrow: 1 }}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header glass-card" style={{ marginBottom: '3rem' }}>
        <div>
          <span className="dashboard-badge">PRACTICE MODULE</span>
          <h1 className="dashboard-title">Aptitude & Reasoning <span className="gradient-text">Quizzes</span></h1>
          <p className="dashboard-subtitle">Test your knowledge to clear initial screening rounds.</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-error" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <div className="dashboard-grid">
        <div className="dashboard-card glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="feature-icon">📊</div>
            <h3 style={{ fontSize: '1.3rem', margin: '0.5rem 0 1rem' }}>Quantitative Aptitude</h3>
            <p className="feature-desc" style={{ marginBottom: '2rem' }}>
              Practice core arithmetic, algebra, speed & distance, time & work, and quantitative analysis.
            </p>
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => fetchQuestions('aptitude')}>
            Start Quiz
          </button>
        </div>

        <div className="dashboard-card glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="feature-icon">🧠</div>
            <h3 style={{ fontSize: '1.3rem', margin: '0.5rem 0 1rem' }}>Logical Reasoning</h3>
            <p className="feature-desc" style={{ marginBottom: '2rem' }}>
              Master pattern recognition, number sequences, seating arrangements, and blood relations.
            </p>
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => fetchQuestions('reasoning')}>
            Start Quiz
          </button>
        </div>

        <div className="dashboard-card glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="feature-icon">💬</div>
            <h3 style={{ fontSize: '1.3rem', margin: '0.5rem 0 1rem' }}>Verbal Ability</h3>
            <p className="feature-desc" style={{ marginBottom: '2rem' }}>
              Improve vocabulary, synonyms/antonyms, grammar correction, and sentence completions.
            </p>
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => fetchQuestions('verbal')}>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
