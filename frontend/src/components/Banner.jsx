import React, { useState, useEffect } from "react";
import "./Banner.css";
import flushLogo from "../assets/flush-logo.png";
import searchIcon from "../assets/search-icon.png";
import CommentSection from "./CommentSection";

function Banner({ user, refreshAllPosts }) {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [results, setResults] = useState([]);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setIsLiked(false);
    setIsDisliked(false);
  }, [selectedPost?._id]);

  const refreshSelectedPost = async () => {
    if (!selectedPost) return;
    try {
      const res = await fetch(
        `https://flush-website-backend.onrender.com/api/posts/${selectedPost._id}`, //http://localhost:5001
      );
      const data = await res.json();
      setSelectedPost(data);
      if (refreshAllPosts) refreshAllPosts();
    } catch (err) {
      console.error("Refresh failed:", err);
    }
  };

  async function updateInteraction(type, value) {
    try {
      const body =
        type === "like"
          ? { likes: (selectedPost.likes || 0) + value }
          : { dislikes: (selectedPost.dislikes || 0) + value };

      const response = await fetch(
        `https://flush-website-backend.onrender.com/api/posts/${selectedPost._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );

      if (response.ok) refreshSelectedPost();
    } catch (error) {
      console.error("Interaction failed", error);
    }
  }

  const handleLike = () => {
    if (!isDisliked) {
      if (isLiked) updateInteraction("like", -1);
      else updateInteraction("like", 1);
      setIsLiked(!isLiked);
    }
  };

  const handleDislike = () => {
    if (!isLiked) {
      if (isDisliked) updateInteraction("dislike", -1);
      else updateInteraction("dislike", 1);
      setIsDisliked(!isDisliked);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const res = await fetch(
        `https://flush-website-backend.onrender.com/api/posts/search?q=${query}&type=${searchType}`,
      );
      const data = await res.json();
      setResults(data);
      setIsListModalOpen(true);
      setQuery("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="banner">
      <img className="banner-logo" src={flushLogo} alt="Flush" />

      <form className="searchbar" onSubmit={handleSearch}>
        <div className="search-select-wrapper">
          <select
            className="search-type-select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="content">Content</option>
            <option value="author">Author</option>
          </select>
        </div>
        <input
          className="searchbar-input"
          type="text"
          placeholder={`Search by ${searchType}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="searchbar-button">
          <img className="searchbar-icon" src={searchIcon} alt="Search" />
        </button>
      </form>

      {isListModalOpen && (
        <div
          className="search-modal-overlay"
          onClick={() => setIsListModalOpen(false)}
        >
          <div
            className="search-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Results</h2>
              <button
                className="close-modal"
                onClick={() => setIsListModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {results.length > 0 ? (
                results.map((post) => (
                  <div
                    key={post._id}
                    className="modal-post-card clickable"
                    onClick={() => {
                      setSelectedPost(post);
                      setIsListModalOpen(false);
                    }}
                  >
                    <h3>{post.title}</h3>
                    <p className="modal-post-author">By @{post.author}</p>
                  </div>
                ))
              ) : (
                <div className="modal-empty">No results found.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedPost && (
        <div
          className="search-modal-overlay"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="search-modal-content detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{selectedPost.title}</h2>
              <button
                className="close-modal"
                onClick={() => setSelectedPost(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="detail-author">
                Post by <strong>@{selectedPost.author}</strong>
              </p>
              <div className="detail-content">{selectedPost.content}</div>

              <div className="post-interactions">
                <div className="interaction-item">
                  <button
                    className={`post-like-btn ${isLiked ? "active" : ""}`}
                    onClick={handleLike}
                  >
                    <span className="post-icon">🧼</span>
                  </button>
                  <span className="b-post-like-count">
                    {selectedPost.likes || 0}
                  </span>
                </div>

                <div className="interaction-item">
                  <button
                    className={`post-dislike-btn ${isDisliked ? "active" : ""}`}
                    onClick={handleDislike}
                  >
                    <span className="post-icon">💩</span>
                  </button>
                  <span className="b-post-dislike-count">
                    {selectedPost.dislikes || 0}
                  </span>
                </div>
              </div>

              <hr className="pd-divider" />

              <CommentSection
                post={selectedPost}
                refreshPost={refreshSelectedPost}
                user={user}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;
