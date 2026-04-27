import React, { useState } from 'react';
import API from '../api';
import './AddMemberPage.css';

const initialForm = {
  name: '',
  rollNumber: '',
  year: '',
  degree: '',
  email: '',
  role: '',
  aboutProject: '',
  hobbies: '',
  certificate: '',
  internship: '',
  aboutYourAim: '',
};

const AddMemberPage = () => {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
    if (!form.year.trim()) newErrors.year = 'Year is required';
    if (!form.degree.trim()) newErrors.degree = 'Degree is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.role.trim()) newErrors.role = 'Role is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));
      if (image) formData.append('image', image);

      await API.post('/members', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setStatus('success');
      setStatusMsg('Member added successfully! 🎉');
      setForm(initialForm);
      setImage(null);
      setImagePreview(null);
      e.target.reset();
    } catch (err) {
      setStatus('error');
      setStatusMsg(
        err.response?.data?.message || 'Failed to add member. Please check your backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-member-page fade-in">
      <div className="page-header">
        <h1>Add Team <span>Member</span></h1>
        <p>Fill in the form below to register a new team member</p>
        <div className="divider" />
      </div>

      <div className="form-container card">
        {status && (
          <div className={`alert alert-${status}`}>
            {statusMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Profile Image Upload */}
          <div className="image-upload-section">
            <div className="image-preview-wrapper">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                <div className="image-placeholder">
                  <span>📷</span>
                  <p>Upload Photo</p>
                </div>
              )}
            </div>
            <label className="upload-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input-hidden"
              />
              <span className="btn btn-outline">Choose Photo</span>
            </label>
            {image && <p className="file-name">{image.name}</p>}
          </div>

          {/* Two-column grid */}
          <div className="form-grid">
            <div className="form-group">
              <label>Name <span className="required">*</span></label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                className={`form-control ${errors.name ? 'error' : ''}`}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label>Roll Number <span className="required">*</span></label>
              <input
                type="text"
                name="rollNumber"
                value={form.rollNumber}
                onChange={handleChange}
                placeholder="e.g. RA2111003010123"
                className={`form-control ${errors.rollNumber ? 'error' : ''}`}
              />
              {errors.rollNumber && <p className="error-text">{errors.rollNumber}</p>}
            </div>

            <div className="form-group">
              <label>Year <span className="required">*</span></label>
              <input
                type="text"
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="e.g. 3rd Year"
                className={`form-control ${errors.year ? 'error' : ''}`}
              />
              {errors.year && <p className="error-text">{errors.year}</p>}
            </div>

            <div className="form-group">
              <label>Degree <span className="required">*</span></label>
              <input
                type="text"
                name="degree"
                value={form.degree}
                onChange={handleChange}
                placeholder="e.g. B.Tech CSE"
                className={`form-control ${errors.degree ? 'error' : ''}`}
              />
              {errors.degree && <p className="error-text">{errors.degree}</p>}
            </div>

            <div className="form-group">
              <label>Email <span className="required">*</span></label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="student@srmist.edu.in"
                className={`form-control ${errors.email ? 'error' : ''}`}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Role <span className="required">*</span></label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                className={`form-control ${errors.role ? 'error' : ''}`}
              />
              {errors.role && <p className="error-text">{errors.role}</p>}
            </div>
          </div>

          {/* Full-width fields */}
          <div className="form-group">
            <label>About Project</label>
            <textarea
              name="aboutProject"
              value={form.aboutProject}
              onChange={handleChange}
              placeholder="Describe your project..."
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>About Your Aim</label>
            <textarea
              name="aboutYourAim"
              value={form.aboutYourAim}
              onChange={handleChange}
              placeholder="Your career aim or goal..."
              className="form-control"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Hobbies</label>
              <input
                type="text"
                name="hobbies"
                value={form.hobbies}
                onChange={handleChange}
                placeholder="e.g. Reading, Gaming, Coding"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Certificate</label>
              <input
                type="text"
                name="certificate"
                value={form.certificate}
                onChange={handleChange}
                placeholder="e.g. AWS, Fullstack"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Internship</label>
              <input
                type="text"
                name="internship"
                value={form.internship}
                onChange={handleChange}
                placeholder="e.g. Cloud Computing at TCS"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Member'}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setForm(initialForm);
                setImage(null);
                setImagePreview(null);
                setErrors({});
                setStatus(null);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberPage;
