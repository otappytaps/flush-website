import "./PostContainer.css";
import defaultPfp from "../assets/default-pfp.png";
<<<<<<< HEAD
import Post from "./Post";
import { useEffect } from "react";

function PostContainer({ posts, refreshPosts }) {
  useEffect(() => {
    refreshPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="post-container">
      <div className="post-container-stream">
=======

function PostContainer({ posts }) {
  return (
    <div className="post-container">
      <div className="stream">
>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814
        <hr></hr>
      </div>
      <div className="posts">
        {posts.map((post) => {
          return (
<<<<<<< HEAD
            <Post
              key={post._id}
              post={{
                author: post.author,
                title: post.title,
                content: post.content,
                date: post.date,
                pfp: post.pfp || defaultPfp,
                likes: post.likes,
                dislikes: post.dislikes,
              }}
            />
=======
            <div className="post">
              <div className="author-info">
                <img 
                  className="pfp" 
                  src={post.pfp || defaultPfp} 
                  alt="profile" 
                  onError={(e) => { e.target.src = defaultPfp; }} 
                />
                <a href="">
                  <h1 className="username">{post.author}</h1>
                </a>
                <h1 className="dot">•</h1>
                <h1 className="date">{post.date}</h1>
              </div>

              <h3>{post.title}</h3>
              <p>{post.content}</p>

              <div className="post-interactions">
                <button className="upvote-btn">
                  <span className="icon">🧼</span>
                  <span className="count">{post.likes}</span>
                </button>

                <button className="downvote-btn">
                  <span className="icon">💩</span>
                  <span className="count">{post.dislikes}</span>
                </button>
              </div>
            </div>
>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814
          );
        })}
      </div>
    </div>
  );
}

export default PostContainer;
