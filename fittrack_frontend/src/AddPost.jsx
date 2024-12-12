import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import logo from './assets/FitTrack Logo.png';
import { FaUser, FaTimes } from 'react-icons/fa';
import './Style/AddPost.css';
import axios from 'axios';
import './App.css';
 
const AddPost = () => {
  const userID = sessionStorage.getItem('userID');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('general');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userID}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
 
    fetchUser();
  }, [userID]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (content.trim().length < 5) {
      setModalMessage('Post content should be at least 5 characters long.');
      setIsModalVisible(true);
      return;
    }
 
    const newPost = {
      user: { userID },
      content,
      type: postType,
    };
 
    try {
      await axios.post('http://localhost:8080/posts', newPost, {
        headers: { 'Content-Type': 'application/json' },
      });
      setModalMessage('Post created! Check your timeline.');
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error creating post:', error);
      setModalMessage('Failed to create post.');
      setIsModalVisible(true);
    }
  };
 
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };
 
  const toggleProfileDropdown = () => {
    setIsProfileDropdownVisible(!isProfileDropdownVisible);
  };
 
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
 
  const handleContentChange = (e) => {
    const input = e.target.value;
    setContent(capitalizeFirstLetter(input));
  };
 
  const closeModal = () => {
    setIsModalVisible(false);
    if (modalMessage === 'Post created! Check your timeline.') {
      navigate('/post');
    }
  };
 
  return (
    <div className="add-post">
      <nav className={`navbar ${isNavbarVisible ? 'visible' : 'hidden'}`}>
        <div className="navbar-logo">
          <Link to="/dashboard">
            <img src={logo} alt="FitTrack Logo" />
          </Link>
        </div>
        <ul className="navList">
          <li>
            <Link to="/dashboard" className="navLink">Dashboard</Link>
          </li>
          <li>
            <Link to="/workout-history" className="navLink">History</Link>
          </li>
          <li>
            <Link to="/aboutus" className="navLink">About Us</Link>
          </li>
          <li className="navProfile">
            <button className="profile-btn navLink" onClick={toggleProfileDropdown}>
              <FaUser className="profile-icon" /> Profile
            </button>
            {isProfileDropdownVisible && (
              <div className="profile-dropdown">
                <button className="dropdown-item" onClick={() => navigate('/edit-profile')}>
                  Edit Profile
                </button>
                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
 
      <div className="create-post-box">
        <h2 className="create-post-title">Create Post</h2>
        <div className="post-header">
          <FaUser className="user-iconn" />
          <span className="post-usernamee">{user?.name || 'Unknown User'}</span>
          <select
            id="postType"
            className="post-type-dropdown"
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
          >
            <option value="general">General</option>
            <option value="workout">Workout</option>
            <option value="nutrition">Nutrition</option>
          </select>
        </div>
 
        <textarea
          className="post-content-input"
          placeholder="What to flex?"
          value={content}
          onChange={handleContentChange}
          required
        />
 
        <div className="post-actions">
          <button className="post-submit-btn" onClick={handleSubmit}>
            Post
          </button>
          <button
        className="cancel-btn"
        onClick={() => navigate('/post')}
      >
        <FaTimes />
      </button>
        </div>
      </div>
 
      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal} className="modal-close-btn">OK</button>
          </div>
        </div>
      )}
 
      <div className="footer">
        © 2024 || <a href="#">FitTrack</a>
      </div>
    </div>
  );
};
 
export default AddPost;
 