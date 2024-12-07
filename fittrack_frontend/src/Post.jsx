import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import logo from './assets/FitTrack Logo.png';
import { FaUser } from 'react-icons/fa';
import LikeButton from './LikeButton';
import Comment from './Comment';
import './Style/Post.css';
import './App.css';

const Post = ({ onDelete, onUpdate, userID }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [editingPostID, setEditingPostID] = useState(null);
  const [updatedContent, setUpdatedContent] = useState('');
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/posts');
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setPosts(data.filter((post) => post.postId)); 
      } else {
        console.error('API did not return an array:', data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('There was an error fetching the posts. Please try again later.');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}`, { method: 'DELETE' });
      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
        alert('Post deleted successfully.');
        if (onDelete) onDelete(postId);
      } else {
        throw new Error('Failed to delete the post.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete the post. Please try again.');
    }
  };

  const handleUpdatePost = async (postId) => {
    const updatedPost = { content: updatedContent };
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });
      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.postId === postId ? { ...post, content: updatedContent } : post
          )
        );
        alert('Post updated successfully.');
        if (onUpdate) onUpdate(updatedPost);
        setEditingPostID(null);
      } else {
        throw new Error('Failed to update the post.');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update the post. Please try again.');
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
    <div>
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

      <div className="add-post-container">
        <Link to="/add-post" className="add-post-button">
          <FontAwesomeIcon icon={faPlus} />  Add Post
        </Link>
      </div>

      <div className="post-container">
        {posts.length === 0 ? (
          <div className="no-posts">No posts available</div>
        ) : (
          posts.map((post) => (
            <div key={post.postId} className="post-box">
              <div className="post-header">
                <div className="profile-picture">
                  <FaUser className="user-icon" />
                  <div className="post-info">
                    <span className="post-username">{post.user?.userID || 'Unknown User'}</span>
                    <span className="post-timestamp">
                      {post.timestamp ? new Date(post.timestamp).toLocaleString() : 'No timestamp available'}
                    </span>
                    <span className="post-type">{post.type || 'No type available'}</span>
                  </div>
                </div>
                <div className="action-buttons">
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditingPostID(post.postId);
                      setUpdatedContent(post.content || '');
                    }}
                  >
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDeletePost(post.postId)}>
                    Delete
                  </button>
                </div>
              </div>
              {editingPostID === post.postId ? (
                <>
                  <textarea
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                    className="edit-textarea"
                  />
                  <button
                    onClick={() => handleUpdatePost(post.postId)}
                    className="save-button"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPostID(null)} 
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <div className="post-content">{post.content || 'No content available'}</div>
              )}
              <div className="like-comment-container">
                <LikeButton postID={post.postId} initialCount={post.likeCount || 0} />
                <Comment postId={post.postId} userID={userID} />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="footer">
        © 2024 || <a href="#">FitTrack</a>
      </div>
    </div>
  );
};

export default Post;
