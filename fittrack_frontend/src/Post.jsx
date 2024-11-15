import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import LikeButton from './LikeButton';
import axios from 'axios';

const Post = ({ onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = (postID) => {
    axios.delete(`http://localhost:8080/api/posts/${postID}`)
      .then(() => {
        alert("Post deleted successfully.");
        fetchPosts();
        if (onDelete) onDelete(postID);
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  const handleUpdatePost = (postID) => {
    const updatedPost = { ...selectedPost, content };
    axios.put(`http://localhost:8080/api/posts/${postID}`, updatedPost)
      .then(response => {
        alert("Post updated successfully.");
        setIsEditing(false);
        setSelectedPost(null);
        fetchPosts();
        if (onUpdate) onUpdate(response.data);
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  const handleAddComment = (postID) => {
    if (newComment.trim() === "") return;

    const newCommentObj = {
      commentID: Date.now(),
      postID: postID,
      userID: 1,
      username: "Current User",
      commentText: newComment,
      timestamp: new Date().toISOString(),
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
    <div className="post">
      <nav className="navbar">
        <ul className="navList">
          <li className="navDashboard">
            <Link to="/home" className="navLink">Dashboard</Link>
          </li>
          <li className="navHistory">
            <Link to="/workout-history" className="navLink">History</Link>
          </li>
          <li className="navAboutUs">
            <Link to="/aboutus" className="navLink">About Us</Link>
          </li>
        </ul>
      </nav>

      {posts.length === 0 ? (
        <div>No posts available</div>
      ) : (
        posts.map((post) => (
          <div key={post.postID}>
            <h3>{post.username}</h3>
            {isEditing && selectedPost?.postID === post.postID ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            ) : (
              <p>{post.content}</p>
            )}
            <span>{new Date(post.timestamp).toLocaleString()}</span>
            <div>
              <LikeButton postID={post.postID} initialCount={post.likeCount} />
            </div>
            <div>
              <h4>Comments</h4>
              {comments.map((comment) => (
                <Comment key={comment.commentID} comment={comment} />
              ))}
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={() => handleAddComment(post.postID)}>Comment</button>
            </div>

            {isEditing && selectedPost?.postID === post.postID ? (
              <button onClick={() => handleUpdatePost(post.postID)}>Save</button>
            ) : (
              <button onClick={() => { 
                setIsEditing(true); 
                setSelectedPost(post); 
                setContent(post.content); 
              }}>Edit</button>
            )}
            <button onClick={() => handleDeletePost(post.postID)}>Delete</button>
            <button onClick={() => navigate('/add-post')}>New Post</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Post;
