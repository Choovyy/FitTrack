// src/components/LikeButton.jsx
import React, { useState } from 'react';

const LikeButton = ({ postID, initialCount }) => {
  const [likeCount, setLikeCount] = useState(initialCount);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
    // Future: Add API call to update like count in the backend
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button>
      <span>{likeCount}</span>
    </div>
  );
};

export default LikeButton;
