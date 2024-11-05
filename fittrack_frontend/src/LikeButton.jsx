import React, { useState } from 'react';

const LikeButton = ({ postID, initialCount }) => {
  const [likeCount, setLikeCount] = useState(initialCount);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button>
      <span>{likeCount}</span>
    </div>
  );
};

export default LikeButton;
