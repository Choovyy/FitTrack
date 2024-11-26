import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Comment = ({ postId, userID }) => {
  console.log("Comment Component Props:", { postId, userID });
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false); // State to toggle comment box
  const commentBoxRef = useRef(null); // Ref for the comment box

  const handleAddComment = async () => {
    const trimmedComment = newComment.trim();

    if (trimmedComment === '') {
      alert('Comment cannot be empty');
      return;
    }

    const commentData = {
      userID,
      postId,
      content: trimmedComment,
      timestamp: new Date().toISOString(),
    };

    console.log("Sending comment data:", commentData);

    try {
      const response = await axios.post('http://localhost:8080/comments', commentData);

      if (response.status === 201) {
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment('');
        setShowCommentBox(false); // Hide the comment box after successful submission
      } else {
        console.error('Failed to add comment:', response);
        alert('Failed to add comment. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        alert(`Error: ${error.response.data.message || 'Something went wrong'}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('Error: No response received from the server');
      } else {
        console.error('Error message:', error.message);
        alert('Error: ' + error.message);
      }
    }
  };

  // Close the comment box if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (commentBoxRef.current && !commentBoxRef.current.contains(event.target)) {
        setShowCommentBox(false); // Hide the comment box
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h3>Comments</h3>
      {/* Button to open the comment box */}
      <button onClick={() => setShowCommentBox(true)}>Comment</button>

      {/* Show the comment box only when `showCommentBox` is true */}
      {showCommentBox && (
        <div ref={commentBoxRef}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      )}

      {/* Display existing comments */}
      <div>
        {comments.map((comment) => (
          <div key={comment.commentId}>
            <p>{comment.content}</p>
            <small>{new Date(comment.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
