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

const Post = ({ onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [editingPostID, setEditingPostID] = useState(null);
  const [updatedContent, setUpdatedContent] = useState('');
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); 
  const [postIdToDelete, setPostIdToDelete] = useState(null); 
  const userID = sessionStorage.getItem('userID');

  const capitalize = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/posts');
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        const sortedPosts = data
          .filter((post) => post.postId)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setPosts(sortedPosts);
      } else {
        console.error('API did not return an array:', data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setModalMessage('There was an error fetching the posts. Please try again later.');
      setIsModalVisible(true);
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
        setModalMessage('Post deleted successfully.');
        setIsModalVisible(true);
        if (onDelete) onDelete(postId);
      } else {
        throw new Error('Failed to delete the post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setModalMessage('Failed to delete the post. Please try again.');
      setIsModalVisible(true);
    }
  };

  const handleUpdatePost = async (postId) => {
    const postToEdit = posts.find((post) => post.postId === postId);

    const updatedPost = {
      content: updatedContent,
      type: postToEdit.type,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        const updatedPostData = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.postId === postId ? { ...post, ...updatedPostData } : post
          )
        );
        setModalMessage('Post updated successfully.');
        setIsModalVisible(true);
        if (onUpdate) onUpdate(updatedPostData);
        setEditingPostID(null);
      } else {
        throw new Error('Failed to update the post.');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      setModalMessage('Failed to update the post. Please try again.');
      setIsModalVisible(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/dashboard">
            <img src={logo} alt="FitTrack Logo" />
          </Link>
        </div>
        <ul className="navList">
          <li><Link to="/dashboard" className="navLink">Dashboard</Link></li>
          <li><Link to="/workout-history" className="navLink">History</Link></li>
          <li><Link to="/aboutus" className="navLink">About Us</Link></li>
          <li className="navProfile">
            <button
              className="profile-btn navLink"
              onClick={() => setIsProfileDropdownVisible(!isProfileDropdownVisible)}
            >
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
          <FontAwesomeIcon icon={faPlus} /> Add Post
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
                    <span className="post-username">{post.user?.name || 'Unknown User'}</span>
                    <span className="post-timestamp">
                      {post.timestamp ? new Date(post.timestamp).toLocaleString() : 'No timestamp available'}
                    </span>
                    <span className="post-type">{capitalize(post.type) || 'No type available'}</span>
                  </div>
                </div>
                {post.user?.userID === userID && (
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
                    <button
                      className="delete-button"
                      onClick={() => {
                        setPostIdToDelete(post.postId);
                        setIsDeleteModalVisible(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              {editingPostID === post.postId ? (
                <>
                  <textarea
                    value={updatedContent}
                    onChange={(e) => {
                      const capitalizedContent = capitalize(e.target.value);
                      setUpdatedContent(capitalizedContent);
                    }}
                    className="edit-textarea"
                  />
                  <button onClick={() => handleUpdatePost(post.postId)} className="save-button">
                    Save
                  </button>
                  <button onClick={() => setEditingPostID(null)} className="cancel-button">
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

      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal} className="modal-close-btn">OK</button>
          </div>
        </div>
      )}

      {isDeleteModalVisible && ( 
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete this post?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-buttons">
              <button
                onClick={() => {
                  handleDeletePost(postIdToDelete);
                  setIsDeleteModalVisible(false);
                }}
                className="modal-confirm-btn"
              >
                Yes
              </button>
              <button
                onClick={() => setIsDeleteModalVisible(false)}
                className="modal-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        © 2024 || <a href="#">FitTrack</a>
      </footer>
    </div>
  );
};

export default Post;
