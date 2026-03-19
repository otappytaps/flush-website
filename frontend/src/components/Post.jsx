import "./Post.css";
import defaultPfp from "../assets/default-pfp.png";
import { useState } from "react";

function Post({ post, refreshPost }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const [isLikeBtnHovered, setIsLikeBtnHovered] = useState(false);
  const [isDislikeBtnHovered, setIsDislikeBtnHovered] = useState(false);

  const likeBtnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "30px",
    width: "30px",
    borderRadius: "15px",
    backgroundColor: isLiked ? "rgb(129, 251, 236)" : "rgb(222, 222, 222)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  };

  const dislikeBtnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "30px",
    width: "30px",
    borderRadius: "15px",
    backgroundColor: isDisliked ? " rgb(215, 177, 157)" : "rgb(222, 222, 222)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  };

  const likeBtnStyleHover = {
    backgroundColor: isLiked ? "rgb(117, 230, 217)" : "#c6c6c6",
  };

  const dislikeBtnStyleHover = {
    backgroundColor: isDisliked ? "rgb(193, 160, 141)" : "#c6c6c6",
  };

  async function updateLikes(value) {
    try {
      const response = await fetch(
        `http://localhost:5001/api/posts/${post._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            likes: post.likes + value,
          }),
        },
      );

      if (response.ok) {
        refreshPost();
      }
    } catch (error) {
      console.error("Failed to update post.", error);
    }
  }

  async function updateDislikes(value) {
    try {
      const response = await fetch(
        `http://localhost:5001/api/posts/${post._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dislikes: post.dislikes + value,
          }),
        },
      );

      if (response.ok) {
        refreshPost();
      }
    } catch (error) {
      console.error("Failed to update post.", error);
    }
  }

  function handleLike() {
    if (isDisliked == false) {
      if (isLiked) {
        updateLikes(-1);
      } else {
        updateLikes(1);
      }
      setIsLiked(!isLiked);
    }
  }

  function handleDislike() {
    if (isLiked == false) {
      if (isDisliked) {
        updateDislikes(-1);
      } else {
        updateDislikes(1);
      }
      setIsDisliked(!isDisliked);
    }
  }

  return (
    <div className="post">
      <div className="post-author-info">
        <img
          className="post-pfp"
          src={post.author || defaultPfp}
          alt="profile-picture"
          onError={(e) => {
            e.target.src = defaultPfp;
          }}
        />
        <a href="">
          <h1 className="post-username">{post.author}</h1>
        </a>
        <h1 className="post-dot">•</h1>
        <h1 className="post-date">{post.date}</h1>
      </div>

      <h3>{post.title}</h3>
      <p>{post.content}</p>

      <div className="post-interactions">
        <button
          className="post-like-btn"
          onClick={handleLike}
          style={
            isLikeBtnHovered
              ? { ...likeBtnStyle, ...likeBtnStyleHover }
              : likeBtnStyle
          }
          onMouseEnter={() => setIsLikeBtnHovered(true)}
          onMouseLeave={() => setIsLikeBtnHovered(false)}
        >
          <span className="post-icon">🧼</span>
        </button>
        <span className="post-like-count">{post.likes}</span>

        <button
          className="post-dislike-btn"
          onClick={handleDislike}
          style={
            isDislikeBtnHovered
              ? { ...dislikeBtnStyle, ...dislikeBtnStyleHover }
              : dislikeBtnStyle
          }
          onMouseEnter={() => setIsDislikeBtnHovered(true)}
          onMouseLeave={() => setIsDislikeBtnHovered(false)}
        >
          <span className="post-icon">💩</span>
        </button>
        <span className="post-dislike-count">{post.dislikes}</span>
      </div>
    </div>
  );
}

export default Post;
