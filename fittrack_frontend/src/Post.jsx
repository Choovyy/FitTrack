import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import LikeButton from './LikeButton';
import './Style/Post.css';
import logo from "./assets/FitTrack Logo.png";

const Post = ({ onDelete, onUpdate, userID }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [editingPostID, setEditingPostID] = useState(null);
  const [updatedContent, setUpdatedContent] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/posts');
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        const validPosts = data.filter((post) => post.postId); // Ensure each post has a postId
        setPosts(validPosts);
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

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/dashboard">
            <img src={logo} alt="FitTrack Logo" />
          </Link>
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

      {/* Add Post Button Section */}
      <div className="add-post-container">
        <button
          className="add-post-button"
          onClick={() => navigate('/add-post')}
        >
          Add Post
        </button>
      </div>

      {/* Post Container */}
      <div className="post-container">
        {posts.length === 0 ? (
          <div className="no-posts">No posts available</div>
        ) : (
          posts.map((post) => (
            <div key={post.postId} className="post-box">
              <h3 className="post-username">{post.user?.userID || 'Unknown User'}</h3>
              {editingPostID === post.postId ? (
                <>
                  <textarea
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                    rows="4"
                    className="edit-textarea"
                  />
                  <button className="save-button" onClick={() => handleUpdatePost(post.postId)}>
                    Save Changes
                  </button>
                </>
              ) : (
                <p className="post-content">{post.content || 'No content available'}</p>
              )}
              <span className="post-timestamp">
                {post.timestamp ? new Date(post.timestamp).toLocaleString() : 'No timestamp available'}
              </span>
              <div className="like-section">
                <LikeButton postID={post.postId} initialCount={post.likeCount || 0} />
              </div>
              <div className="comment-section">
                <h4>Comments</h4>
                <Comment postId={post.postId} userID={userID} />
              </div>
              <div className="action-buttons">
                <button className="delete-button" onClick={() => handleDeletePost(post.postId)}>
                  Delete
                </button>
                {!editingPostID && (
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditingPostID(post.postId);
                      setUpdatedContent(post.content || '');
                    }}
                  >
                    Edit
                  </button>
                )}
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
