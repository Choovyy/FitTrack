import React, { useState } from 'react';
import axios from 'axios';

const Comment = ({ postID }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleAddComment = async () => {
    const trimmedComment = newComment.trim();

    if (trimmedComment === '') {
      alert('Comment cannot be empty');
      return;
    }

    const commentData = {
      postID,  
      userID: 1,  
      content: trimmedComment, 
      timestamp: new Date().toISOString(),
    };
  
    try {
      const response = await axios.post('http://localhost:8080/comments', commentData);
  
      if (response.status === 201) {
        setComments((prevComments) => [...prevComments, response.data]);  
        setNewComment('');  
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

  return (
    <div>
      <h3>Comments</h3>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={handleAddComment}>Add Comment</button>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}> 
            <p>{comment.content}</p> 
            <small>{new Date(comment.timestamp).toLocaleString()}</small> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
