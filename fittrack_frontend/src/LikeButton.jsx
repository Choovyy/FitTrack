import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const LikeButton = ({ postID, initialCount }) => {
  const [likeCount, setLikeCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const storedLiked = sessionStorage.getItem(`liked-${postID}`);
    if (storedLiked === 'true') {
      setLiked(true);
    }
  }, [postID]);

  const handleLike = async () => {
    try {
      if (liked) {
        await axios.put(`http://localhost:8080/posts/${postID}/unlike`);
        setLikeCount((prevCount) => prevCount - 1);
        sessionStorage.setItem(`liked-${postID}`, 'false');
      } else {
        await axios.put(`http://localhost:8080/posts/${postID}/like`);
        setLikeCount((prevCount) => prevCount + 1);
        sessionStorage.setItem(`liked-${postID}`, 'true');
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error updating like status:', error.response || error.message);
      toast.error('Failed to update like status. Please try again.');
    }
  };

  return (
    <div>
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
      <ToastContainer
        position="top-right"
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default LikeButton;
