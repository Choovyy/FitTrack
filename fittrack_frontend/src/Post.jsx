import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import LikeButton from './LikeButton';
import './Style/Post.css';
import logo from "./assets/FitTrack Logo.png";

const Post = ({ onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingPostID, setEditingPostID] = useState(null);
  const [updatedContent, setUpdatedContent] = useState('');

  // Fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/posts');
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error('API did not return an array:', data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('There was an error fetching the posts. Please try again later.');
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Delete a post
  const handleDeletePost = async (postID) => {
    try {
      const response = await fetch(`http://localhost:8080/posts/${postID}`, { method: 'DELETE' });
      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.postID !== postID));
        alert('Post deleted successfully.');
        if (onDelete) onDelete(postID);
      } else {
        throw new Error('Failed to delete the post.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete the post. Please try again.');
    }
  };

  // Update a post
  const handleUpdatePost = async (postID) => {
    const updatedPost = { content: updatedContent };
    try {
      const response = await fetch(`http://localhost:8080/posts/${postID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });
      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.postID === postID ? { ...post, content: updatedContent } : post
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

  return (
    <div className="post-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="FitTrack Logo" />
        </div>
        <ul className="navList">
          <li className="navDashboard">
            <Link to="/dashboard" className="navLink">Dashboard</Link>
          </li>
          <li className="navHistory">
            <Link to="/workout-history" className="navLink">History</Link>
          </li>
          <li className="navAboutUs">
            <Link to="/aboutus" className="navLink">About Us</Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="footer">
        © 2024 || <a href="#">FitTrack</a>
      </div>

      {/* Post List */}
      {posts.length === 0 ? (
        <div className="no-posts">No posts available</div>
      ) : (
        posts.map((post) => (
          <div key={post.postID} className="post-box">
            <h3 className="post-username">{post.userID}</h3>

            {/* Edit Post */}
            {editingPostID === post.postID ? (
              <>
                <textarea
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                  rows="4"
                  className="edit-textarea"
                />
                <button className="save-button" onClick={() => handleUpdatePost(post.postID)}>
                  Save Changes
                </button>
              </>
            ) : (
              <p className="post-content">{post.content}</p>
            )}

            <span className="post-timestamp">
              {new Date(post.timestamp).toLocaleString()}
            </span>

            <div className="like-section">
              <LikeButton postID={post.postID} initialCount={post.likeCount} />
            </div>

            <div className="comment-section">
              <h4>Comments</h4>
              <Comment postID={post.postID} />
            </div>

            <div className="action-buttons">
              <button className="delete-button" onClick={() => handleDeletePost(post.postID)}>
                Delete
              </button>
              {!editingPostID && (
                <button
                  className="edit-button"
                  onClick={() => {
                    setEditingPostID(post.postID);
                    setUpdatedContent(post.content);
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))
      )}

      {/* Add Post Button */}
      <div className="floating-button">
        <button onClick={() => navigate('/add-post')}>Add Post</button>
      </div>
    </div>
  );
};

export default Post;
