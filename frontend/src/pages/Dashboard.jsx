import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { user } = useAuth();

  const [analytics, setAnalytics] = useState({
    totalQuizzes: 0,
    bestScore: 0,
    averageScore: 0,
    latestScore: 0,
    categoryWisePerformance: {
      aptitude: { attempts: 0, accuracy: 0 },
      reasoning: { attempts: 0, accuracy: 0 },
      verbal: { attempts: 0, accuracy: 0 }
    }
  });

  const [companiesCount, setCompaniesCount] = useState(0);
  const [resourcesCount, setResourcesCount] = useState(0);

  useEffect(() => {

    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch(
          `${API_URL}/api/quiz/analytics`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (res.ok && data.status === 'success') {
          setAnalytics(data.data);
        }

      } catch (err) {
        console.error('Failed to load quiz analytics:', err);
      }
    };

    const fetchCounts = async () => {
      try {

        const [compRes, resRes] =
          await Promise.all([

            fetch(`${API_URL}/api/company`),

            fetch(`${API_URL}/api/resources`)

          ]);

        const compData = await compRes.json();
        const resData = await resRes.json();

        setCompaniesCount(compData.length || 0);
        setResourcesCount(resData.length || 0);

      } catch (err) {
        console.error('Failed to load counts:', err);
      }
    };

    fetchAnalytics();
    fetchCounts();

  }, []);

  return (

    <div className="dashboard-container animate-fade-in">

      <div className="dashboard-header glass-card">

        <div>

          <span className="dashboard-badge">
            STUDENT PORTAL
          </span>

          <h1 className="dashboard-title">

            Welcome back,

            <span className="gradient-text">

              {user?.name}

            </span>

          </h1>

          <p className="dashboard-subtitle">

            Manage your preparation path and track recruitment milestones.

          </p>

        </div>

      </div>

      <div className="analytics-summary-grid">

        <div className="analytics-card glass-card">

          <div className="analytics-icon">

            📊

          </div>

          <div className="analytics-content">

            <span className="analytics-label">

              Total Quizzes Attempted

            </span>

            <h2 className="analytics-value">

              {analytics.totalQuizzes}

            </h2>

          </div>

        </div>

        <div className="analytics-card glass-card">

          <div className="analytics-icon">

            🏆

          </div>

          <div className="analytics-content">

            <span className="analytics-label">

              Best Score

            </span>

            <h2 className="analytics-value">

              {analytics.totalQuizzes > 0

                ? `${analytics.bestScore}%`

                : 'N/A'}

            </h2>

          </div>

        </div>

        <div className="analytics-card glass-card">

          <div className="analytics-icon">

            📈

          </div>

          <div className="analytics-content">

            <span className="analytics-label">

              Average Score

            </span>

            <h2 className="analytics-value">

              {analytics.totalQuizzes > 0

                ? `${analytics.averageScore}%`

                : 'N/A'}

            </h2>

          </div>

        </div>

        <div className="analytics-card glass-card">

          <div className="analytics-icon">

            ⏱️

          </div>

          <div className="analytics-content">

            <span className="analytics-label">

              Latest Score

            </span>

            <h2 className="analytics-value">

              {analytics.totalQuizzes > 0

                ? `${analytics.latestScore}%`

                : 'N/A'}

            </h2>

          </div>

        </div>

        <div className="analytics-card glass-card">

          <div className="analytics-icon">

            🏢

          </div>

          <div className="analytics-content">

            <span className="analytics-label">

              Companies Available

            </span>

            <h2 className="analytics-value">

              {companiesCount}

            </h2>

          </div>

        </div>

        <div className="analytics-card glass-card">

          <div className="analytics-icon">

            📚

          </div>

          <div className="analytics-content">

            <span className="analytics-label">

              Resources Available

            </span>

            <h2 className="analytics-value">

              {resourcesCount}

            </h2>

          </div>

        </div>

      </div>

      {/* Baaki UI same rahega */}

      {/* Candidate Profile */}
      {/* Topic Performance */}
      {/* Preparation Progress */}

    </div>

  );

};

export default Dashboard;