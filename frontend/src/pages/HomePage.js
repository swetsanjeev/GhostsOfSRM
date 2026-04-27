import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">
          <span className="badge badge-gold">21CSS301T · Full Stack Development</span>
        </div>
        <h1 className="hero-title">
          Welcome to <br />
          <span className="gold-text">Ghosts of SRM</span>
        </h1>
        <p className="hero-subtitle">
          Student Team Members Management Application — built with React, Node.js, Express &amp; MongoDB.
        </p>

        {/* Manage Team Box */}
        <div className="cta-box">
          <h2 className="cta-title">Manage Team</h2>
          <div className="cta-buttons">
            <Link to="/add" className="btn btn-primary">
              + Add Member
            </Link>
            <Link to="/view" className="btn btn-secondary">
              View Members
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card card fade-in-up">
          <div className="feature-icon">👤</div>
          <h3>Add Members</h3>
          <p>Register new team members with their details, role, and profile photo.</p>
        </div>
        <div className="feature-card card fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="feature-icon">📋</div>
          <h3>View All Members</h3>
          <p>Browse the complete list of team members stored in the database.</p>
        </div>
        <div className="feature-card card fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="feature-icon">🔍</div>
          <h3>Member Details</h3>
          <p>View detailed profile information for any individual team member.</p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="tech-section">
        <h2 className="tech-title">Built With</h2>
        <div className="tech-pills">
          {['React.js', 'Node.js', 'Express', 'MongoDB', 'Axios', 'React Router'].map((t) => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
