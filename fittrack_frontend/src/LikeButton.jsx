import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import React, { useState } from 'react';
import axios from 'axios';

const LikeButton = ({ postID, initialCount }) => {
  const [likeCount, setLikeCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) {
        await axios.put(`http://localhost:8080/posts/${postID}/unlike`);
        setLikeCount(likeCount - 1);
      } else {
        await axios.put(`http://localhost:8080/posts/${postID}/like`);
        setLikeCount(likeCount + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error updating like status:', error.response || error.message);
      alert('Failed to update like status. Please try again.');
    }
  };

  return (
    <div
      className={`like-button-container ${liked ? 'liked' : ''}`}
      onClick={handleLike}
    >
      <button className="like-button">
        {liked ? <AiFillLike size={24} color="#000000" /> : <AiOutlineLike size={24} />}
        <span className="like-text">Like</span>
      </button>
      <span className="like-count">{likeCount}</span>
    </div>
  );
};

export default LikeButton;
