import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AddPost = () => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userID: 1,
      username: "Current User",
      content,
      likeCount: 0,
    };

    try {
      await axios.post("http://localhost:8080/api/posts", newPost);
      alert("Post created successfully!");
      navigate('/post');
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    }
  };

  return (
    <div className="add-post">
      <nav className="navbar">
        <ul className="navList">
          <li className="navDashboard">
            <Link to="/home" className="navLink">Dashboard</Link>
          </li>
          <li className="navLogworkout">
            <Link to="/log-workout" className="navLink">Log Workout</Link>
          </li>
          <li className="navAddPost">
            <Link to="/add-post" className="navLink">Add Post</Link>
          </li>
        </ul>
      </nav>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
