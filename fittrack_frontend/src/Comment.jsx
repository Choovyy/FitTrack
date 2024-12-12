import React, { useState, useRef, useEffect } from 'react';
import { FaRegComment } from 'react-icons/fa';
import './Style/Comment.css';
import axios from 'axios';
import './Style/Post.css';

const Comment = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 
  const commentBoxRef = useRef(null);
  const commentListRef = useRef(null);
  const userID = sessionStorage.getItem('userID');

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
      setModalMessage('Comment cannot be empty.');
      setIsModalVisible(true); 
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

        setTimeout(() => {
          if (commentListRef.current) {
            commentListRef.current.scrollTop = commentListRef.current.scrollHeight;
          }
        }, 100);
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

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleCommentChange = (e) => {
    const value = e.target.value;
    const transformedValue = capitalizeFirstLetter(value);
    setNewComment(transformedValue);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {!showCommentBox && (
        <div
          className="comment-button-container"
          onClick={() => setShowCommentBox(true)}
        >
          <button className="comment-button">
            <FaRegComment size={24} />
            <span className="comment-text">Comment</span>
          </button>
        </div>
      )}

      {showCommentBox && (
        <div ref={commentBoxRef} className="comment-box">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
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

      <div ref={commentListRef} className="comment-list steady-comment-list">
        {loading && <p>Loading comments...</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {comments.map((comment) => (
          <div key={comment.commentId} className="comment-item">
            <div className="comment-header">
              <strong>{comment.user?.name || 'Anonymous'}</strong>
              <small>{new Date(comment.timestamp).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</small>
            </div>
            <p className="comment-content">{comment.content}</p>
          </div>
        ))}
      </div>

      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <p>{modalMessage}</p>
            <button
              onClick={closeModal}
              style={{
                backgroundColor: '#4CAF50', 
                color: 'white',             
                padding: '10px 20px',        
                border: 'none',             
                borderRadius: '5px',         
                cursor: 'pointer',           
                fontSize: '16px',           
                transition: 'background-color 0.3s ease', 
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}  
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}  
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
