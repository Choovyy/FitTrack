import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AddPost = ({ userID = 1 }) => {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('general');  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (content.trim().length < 5) {
      alert("Post content should be at least 5 characters long.");
      return;
    }
  
    const newPost = {
      user: {
        userID: userID, // Include the userID to fetch the user on the backend
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

  return (
    <div className="add-post">
      <nav className="navbar">
        <ul className="navList">
          <li className="navDashboard">
            <Link to="/dashboard" className="navLink">Dashboard</Link>
          </li>
          <li className="navLogworkout">
            <Link to="/log-workout" className="navLink">Log Workout</Link>
          </li>
        </ul>
      </nav>
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
