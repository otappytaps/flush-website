import "./Post.css";
import defaultPfp from "../assets/default-pfp.png";
import { useState } from "react";

function Post({ post }) {
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
        <button className="post-upvote-btn">
          <span className="post-icon">🧼</span>
          <span className="post-count">{post.likes}</span>
        </button>

        <button className="post-downvote-btn">
          <span className="post-icon">💩</span>
          <span className="post-count">{post.dislikes}</span>
        </button>
      </div>
    </div>
  );
}

export default Post;
