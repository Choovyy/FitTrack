import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import './App.css';
import logo from "./assets/FitTrack Logo.png";

const AddPost = ({ userID = 1 }) => {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('general');  
  const navigate = useNavigate();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (content.trim().length < 5) {
      alert("Post content should be at least 5 characters long.");
      return;
    }
  
    const newPost = {
      user: {
        userID: userID, 
      },
      content,
      type: postType,
    };
  
    try {
      await axios.post("http://localhost:8080/posts", newPost, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Post created successfully!");
      navigate('/post');
    } catch (error) {
      console.error("Error creating post:", error.response ? error.response.data : error.message);
      alert("Failed to create post.");
    }
    
  };  
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownVisible(!isProfileDropdownVisible);
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
      <div className="footer">
            © 2024 || <a href="#">FitTrack</a>
            </div>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What to flex?"
          required
        />
        <div>
          <label htmlFor="postType">Post Type</label>
          <select
            id="postType"
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
          >
            <option value="general">General</option>
            <option value="workout">Workout</option>
            <option value="nutrition">Nutrition</option>
          </select>
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
