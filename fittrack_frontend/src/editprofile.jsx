import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Style/EditProfile.css';
import logo from './assets/FitTrack Logo.png';
import TheRoad from './assets/theroad.png';

const EditProfile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userID = sessionStorage.getItem('userID');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userID}`);
        const { name, email, password } = response.data;
        setUser({ name, email });
        setPassword(password);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data. Please try again later.');
        setIsLoading(false);
      }
    };

    if (userID) {
      fetchUserData();
    } else {
      setError('User ID is not available. Please log in again.');
      setIsLoading(false);
    }
  }, [userID]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownVisible((prev) => !prev);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userID');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.put(`http://localhost:8080/api/users/${userID}`, {
        ...user,
        password,
      });
      setIsModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate('/dashboard');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${isNavbarVisible ? 'visible' : 'hidden'}`}>
        <div className="navbar-logo">
          <a href="/dashboard" aria-label="FitTrack Dashboard">
            <img src={logo} alt="FitTrack Logo" />
          </a>
        </div>
        <ul className="navList">
          <li><a href="/dashboard" className="navLink">Dashboard</a></li>
          <li><a href="/workout-history" className="navLink">History</a></li>
          <li><a href="/aboutus" className="navLink">About Us</a></li>
          <li className="navProfile">
            <button
              className="profile-btn navLink"
              onClick={toggleProfileDropdown}
              aria-label="Profile Options"
            >
              <FaUser className="profile-icon" /> Profile
            </button>
            {isProfileDropdownVisible && (
              <div className="profile-dropdown">
                <button
                  className="dropdown-item"
                  onClick={() => navigate('/edit-profile')}
                >
                  Edit Profile
                </button>
                <button
                  className="dropdown-item logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-card">
          <div className="profile-picture">
            <FaUser className="user-icon" />
          </div>
          <div className="profile-info">
            <h3 className="profile-name">{user.name}</h3>
            <div className="profile-credentials">
              <p><FaEnvelope className="email-icon" /> {user.email}</p>
            </div>
            <button className="edit-profile-btn" onClick={() => setIsModalOpen(true)}>Edit Profile</button>
          </div>
        </div>
      </div>

      {/* Motivational Section */}
      <section className="motivational-section">
        <div className="motivational-content">
          <h1 className="motivational-heading">The road to your best self begins here</h1>
          <p className="motivational-subtext">
            Edit your profile, log your goals, and track your way to success. 
            Your journey starts today—stay consistent and achieve greatness.
          </p>
        </div>
        <div className="motivational-image">
          <img src={TheRoad} alt="Motivational workout" />
        </div>
      </section>

      {error && <div className="error-messageEP">{error}</div>}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal} aria-label="Close Modal">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Your Profile</h2>
              <button className="close-button" onClick={closeModal} aria-label="Close">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group-edit-profile">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group-edit-profile">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group-edit-profile">
                <label htmlFor="password">Password:</label>
                <div className="password-container">
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={togglePasswordVisibility}
                    aria-label="Toggle Password Visibility"
                  >
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="modal-buttons-profile">
                <button type="button" className="modal-cancel-button" onClick={closeModal}>Cancel</button>
                <button type="submit" className="modal-save-button">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="modal-overlay" onClick={closeSuccessModal} aria-label="Close Success Modal">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Success</h2>
              <button className="close-button" onClick={closeSuccessModal} aria-label="Close">
                &times;
              </button>
            </div>
            <div className="modal-content">
              <p>Your profile has been updated successfully!</p>
            </div>
            <div className="modal-buttons-profile">
              <button type="button" className="modal-ok-button" onClick={closeSuccessModal}>OK</button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        © 2024 || <a href="#">FitTrack</a>
      </footer>
    </>
  );
};

export default EditProfile;
