import React, { useState } from 'react';
import axios from 'axios';

const LikeButton = ({ postID, initialCount }) => {
  const [likeCount, setLikeCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked) return; 

    try {
      await axios.put(`http://localhost:8080/posts/${postID}/like`); 
      setLikeCount(likeCount + 1);
      setLiked(true);
    } catch (error) {
      console.error("Error liking post:", error.response || error.message);
      alert("Failed to like the post. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={handleLike} disabled={liked}>
        {liked ? "Liked" : "Like"}
      </button>
      <span>{likeCount}</span>
    </div>
  );
};

export default LikeButton;
