import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Comment = ({ postId, userID }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const commentBoxRef = useRef(null);

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true); // Set loading state while fetching comments
        const response = await axios.get(`http://localhost:8080/comments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setErrorMessage('Error fetching comments. Please try again later.');
      } finally {
        setLoading(false); // Hide loading state after fetching
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    const trimmedComment = newComment.trim();

    // Check if the comment is empty
    if (trimmedComment === '') {
      alert('Comment cannot be empty.');
      return;
    }

    // Build the comment data object to send to the backend
    const commentData = {
      content: trimmedComment,
      user: { userID: userID },  // Pass user object with userID (backend expects the entire User object)
      post: { postId: postId },  // Pass post object with postId (backend expects the entire Post object)
    };
    
    try {
      setLoading(true);  // Show loading state
      const response = await axios.post('http://localhost:8080/comments', commentData);

      // If the comment is successfully added
      if (response.status === 201) {
        setComments((prevComments) => [...prevComments, response.data]);  // Update the state with the new comment
        setNewComment('');  // Clear the comment input
        setShowCommentBox(false);  // Hide the comment box after submitting
      } else {
        console.error('Failed to add comment:', response);
        setErrorMessage('Failed to add comment. Please try again.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setErrorMessage('An error occurred while adding the comment. Please try again.');
    } finally {
      setLoading(false);  // Hide loading state
    }
};



  // Close comment box when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (commentBoxRef.current && !commentBoxRef.current.contains(event.target)) {
        setShowCommentBox(false);
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
      <button onClick={() => setShowCommentBox(true)} disabled={loading}>
        Comment
      </button>

      {/* Show the comment box only when `showCommentBox` is true */}
      {showCommentBox && (
        <div ref={commentBoxRef}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            disabled={loading} // Disable input when loading
          />
          <button onClick={handleAddComment} disabled={loading}>
            {loading ? 'Posting...' : 'Add Comment'}
          </button>
        </div>
      )}

      {/* Display existing comments */}
      <div>
        {loading && <p>Loading comments...</p>} {/* Display loading message while fetching */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
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
