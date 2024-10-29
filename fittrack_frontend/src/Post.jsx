// src/components/Post.jsx
import React, { useState } from 'react';
import Comment from './Comment';
import LikeButton from './LikeButton';

const Post = ({ post }) => {
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    const newCommentObj = {
      commentID: Date.now(),
      postID: post.postID,
      userID: 1, // Replace with actual user ID
      username: "Current User", // Placeholder, replace with actual username
      commentText: newComment,
      timestamp: new Date().toISOString(), // Fixed to match the "timestamp" key
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
    <div className="post">
      <h3>{post.username}</h3>
      <p>{post.content}</p>
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
        <button onClick={handleAddComment}>Comment</button>
      </div>
    </div>
  );
};

export default Post;
