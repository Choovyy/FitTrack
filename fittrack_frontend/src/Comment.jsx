import React, { useState, useRef, useEffect } from 'react';
import { FaRegComment } from 'react-icons/fa';
import axios from 'axios';
import './Style/Post.css';

const Comment = ({ postId, userID }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const commentBoxRef = useRef(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/comments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setErrorMessage('Error fetching comments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    const trimmedComment = newComment.trim();

    if (trimmedComment === '') {
      alert('Comment cannot be empty.');
      return;
    }

    const commentData = {
      content: trimmedComment,
      user: { userID: userID },
      post: { postId: postId },
    };

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8080/comments', commentData);

      if (response.status === 201) {
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment('');
        setShowCommentBox(false);
      } else {
        console.error('Failed to add comment:', response);
        setErrorMessage('Failed to add comment. Please try again.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setErrorMessage('An error occurred while adding the comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
      {!showCommentBox ? (
        <div
          className="comment-button-container"
          onClick={() => setShowCommentBox(true)}
        >
          <button className="comment-button">
            <FaRegComment size={24} />
            <span className="comment-text">Comment</span>
          </button>
        </div>
      ) : (
        <div ref={commentBoxRef} className="comment-box">
  <textarea
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
    placeholder="Write a comment..."
    className="comment-textarea"
    disabled={loading}
  />
  <button
    onClick={handleAddComment}
    className="add-comment-button"
    disabled={loading}
  >
    {loading ? 'Posting...' : 'Add Comment'}
  </button>
</div>

      )}

      <div>
        {loading && <p>Loading comments...</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
