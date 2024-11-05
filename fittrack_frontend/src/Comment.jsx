import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p><strong>{comment.username}</strong>: {comment.commentText}</p>
      <span>{new Date(comment.timestamp).toLocaleString()}</span>
    </div>
  );
};

export default Comment;
