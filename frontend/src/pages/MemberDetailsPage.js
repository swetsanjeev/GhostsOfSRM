import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import './MemberDetailsPage.css';

const BACKEND_URL = 'http://localhost:5000';

const DetailRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  );
};

const MemberDetailsPage = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await API.get(`/members/${id}`);
        setMember(res.data.data);
      } catch (err) {
        setError('Member not found or server error.');
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p style={{ color: 'var(--text-secondary)' }}>Loading member details...</p>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', paddingTop: '2rem' }}>
        <div className="alert alert-error">{error || 'Member not found'}</div>
        <Link to="/view" className="btn btn-outline">← Back to Members</Link>
      </div>
    );
  }

  const hobbiesArr = member.hobbies
    ? member.hobbies.split(',').map((h) => h.trim()).filter(Boolean)
    : [];

  return (
    <div className="details-page fade-in">
      <Link to="/view" className="back-link">← Back to Members</Link>

      <div className="details-container">
        {/* Left: Profile Card */}
        <div className="profile-card card">
          <div className="profile-image-wrapper">
            {member.image ? (
              <img
                src={`${BACKEND_URL}/uploads/${member.image}`}
                alt={member.name}
                className="profile-image"
              />
            ) : (
              <div className="profile-image-placeholder">
                {member.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h1 className="profile-name">{member.name}</h1>
          <span className="badge badge-gold" style={{ fontSize: '0.85rem', padding: '0.3rem 1rem' }}>
            {member.role}
          </span>
          <p className="profile-degree">{member.degree} · {member.year}</p>

          {hobbiesArr.length > 0 && (
            <div className="hobbies-section">
              <p className="hobbies-title">Hobbies</p>
              <div className="hobby-tags">
                {hobbiesArr.map((h) => (
                  <span key={h} className="hobby-tag">{h}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="details-info card">
          <h2 className="details-section-title">Full Details</h2>

          <div className="details-grid">
            <DetailRow label="Full Name" value={member.name} />
            <DetailRow label="Roll Number" value={member.rollNumber} />
            <DetailRow label="Year" value={member.year} />
            <DetailRow label="Degree" value={member.degree} />
            <DetailRow label="Email" value={member.email} />
            <DetailRow label="Role" value={member.role} />
            <DetailRow label="Certificate" value={member.certificate} />
            <DetailRow label="Internship" value={member.internship} />
          </div>

          {member.aboutProject && (
            <div className="detail-block">
              <p className="detail-block-label">About Project</p>
              <p className="detail-block-text">{member.aboutProject}</p>
            </div>
          )}

          {member.aboutYourAim && (
            <div className="detail-block">
              <p className="detail-block-label">About Your Aim</p>
              <p className="detail-block-text">{member.aboutYourAim}</p>
            </div>
          )}

          <div className="details-actions">
            <Link to="/view" className="btn btn-outline">← All Members</Link>
            <Link to="/add" className="btn btn-primary">+ Add Another</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPage;
