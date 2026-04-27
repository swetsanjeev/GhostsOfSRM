import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import './ViewMembersPage.css';

const BACKEND_URL = 'http://localhost:5000';

const ViewMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await API.get('/members');
        setMembers(res.data.data);
      } catch (err) {
        setError('Failed to fetch members. Make sure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p style={{ color: 'var(--text-secondary)' }}>Fetching team members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="add-member-page fade-in">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="view-members-page fade-in">
      <div className="page-header">
        <h1>Meet Our <span>Amazing Team</span></h1>
        <p>{members.length} member{members.length !== 1 ? 's' : ''} registered</p>
        <div className="divider" />
      </div>

      {members.length === 0 ? (
        <div className="empty-state">
          <h3>No members yet</h3>
          <p>Start by adding your first team member.</p>
          <Link to="/add" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            + Add Member
          </Link>
        </div>
      ) : (
        <div className="members-grid">
          {members.map((member, i) => (
            <div
              key={member._id}
              className="member-card card fade-in-up"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="member-image-wrapper">
                {member.image ? (
                  <img
                    src={`${BACKEND_URL}/uploads/${member.image}`}
                    alt={member.name}
                    className="member-image"
                    onError={(e) => { e.target.src = ''; e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="member-image-placeholder">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <span className="badge badge-gold">{member.role}</span>
                <p className="member-roll">Roll No: {member.rollNumber}</p>
              </div>
              <Link to={`/member/${member._id}`} className="btn btn-secondary view-btn">
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewMembersPage;
