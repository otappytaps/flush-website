import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import defaultPfp from "../assets/default-pfp.png";
import "./ViewProfile.css";

function ViewProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  
  const [profileUser, setProfileUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userRes = await fetch(`http://localhost:5001/api/users/profile/${username}`);
        if (!userRes.ok) throw new Error("Not Found");
        const userData = await userRes.json();
        setProfileUser(userData);

        const postsRes = await fetch(`http://localhost:5001/api/posts/user/${username}`);
        const postsData = await postsRes.json();
        setUserPosts(postsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [username]);

  if (loading) return <div className="vp-main-container"><h1 className="vp-loading">Flushing...</h1></div>;
  
  if (!profileUser) {
    return (
      <div className="vp-main-container">
        <div className="vp-clogged-card">
          <div className="vp-clogged-icon">🪠</div>
          
          <div className="vp-clogged-text">
            <h1 className="vp-clogged-title">Clog Detected!</h1>
            <h2 className="vp-clogged-username">System Error: User @{username} not found.</h2>
            
            <p className="vp-clogged-description">
              We've checked the main trap, the septic tank, and the overflow pipe. 
              The user you are looking for has been completely swirled away or never 
              actually entered the system.
            </p>
            
            <div className="vp-clogged-tips">
              <strong>Tips from the Plumber:</strong>
              <ul>
                <li>Check for typos (did you mean to flush @{username.slice(0, 3)}?).</li>
                <li>They may have been triple-scrubbed (banned).</li>
                <li>The roll may simply be empty.</li>
              </ul>
            </div>
          </div>

          <button className="vp-jushed-back-btn" onClick={() => navigate("/")}>
            Back to the Main Flow
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vp-main-container">
      <div className="vp-card">
        <button className="vp-top-back-btn" onClick={() => navigate(-1)}>Back</button>
        
        <div className="vp-header">
          <img 
            src={profileUser.pfp ? `http://localhost:5001${profileUser.pfp}` : defaultPfp} 
            className="vp-header-pfp" 
            alt="pfp" 
          />
          <div className="vp-user-info">
            <h1 className="vp-username">@{profileUser.username}</h1>
            <h2 className="vp-full-name">{profileUser.firstName} {profileUser.lastName}</h2>
            <p className="vp-bio">{profileUser.about || "No bio provided."}</p>
          </div>
        </div>

        <div className="vp-stats">
          <strong>{userPosts.length}</strong> <span>Posts</span>
        </div>

        <div className="vp-posts-stack">
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div key={post._id} className="vp-post-sheet">
                <div className="vp-post-top">
                  <span className="vp-post-date">{post.date}</span>
                </div>
                <h3 className="vp-post-title">{post.title}</h3>
                <p className="vp-post-content">{post.content}</p>
                <div className="vp-post-footer">
                   <span>🧼 {post.likes}</span>
                   <span>💩 {post.dislikes}</span>
                   <span>💬 {post.commentCount}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="vp-empty">The roll is empty... no posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;