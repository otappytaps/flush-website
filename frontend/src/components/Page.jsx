import "./Page.css";
import PostContainer from "./PostContainer";
import Popup from "./Popup";
import { useEffect, useState } from "react";
import PostInput from "./PostInput";
import { Link } from "react-router-dom";

function Page({ posts, refreshPosts, user }) {
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [filter, setFilter] = useState("latest");
  
  useEffect(() => {
    refreshPosts();
  }, []);

  const userPosts = posts.filter((post) => post.author === user?.username);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/posts/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        refreshPosts();
      }
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const filteredPosts = [...posts].sort((a, b) => {
    if (filter === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (filter === "popularity") {
      return (b.likes || 0) - (a.likes || 0);
    }
    return 0;
  });

  return (
    <div className="page">
      <div className="left">
        <div className="filter-station">
          <h3>Sort Feed</h3>
          <div className="filter-options">
            <button 
              className={`filter-btn ${filter === 'latest' ? 'active' : ''}`}
              onClick={() => setFilter('latest')}
            >
              🌊 Latest
            </button>
            <button 
              className={`filter-btn ${filter === 'popularity' ? 'active' : ''}`}
              onClick={() => setFilter('popularity')}
            >
              🔥 Popular
            </button>
          </div>
        </div>
      </div>
      <div className="center">
        <PostContainer posts={filteredPosts} refreshPosts={refreshPosts} user={user} />
      </div>
      <div className="right">
        <div className="post-cluster">
          {user ? (
            <>
              <button
                className="create-post-btn"
                onClick={() => setIsCreatePopupOpen(true)}
              >
                Create Post
              </button>

              <button
                className="edit-post-btn"
                onClick={() => setIsEditPopupOpen(true)}
              >
                Edit Post
              </button>

              <button
                className="delete-post-btn"
                onClick={() => setIsDeletePopupOpen(true)}
              >
                Delete Post
              </button>
            </>
          ) : (
            <div className="login-promo">
              <p>Want to share your thoughts?</p>
              <Link to="/login" className="login-btn-small">Login to Flush</Link>
            </div>
          )}

          <Popup open={isCreatePopupOpen} onClose={() => setIsCreatePopupOpen(false)}>
            <PostInput 
              header="Create Post" 
              user={user}
              closePopUp={() => setIsCreatePopupOpen(false)} 
              refreshPosts={refreshPosts} 
            />
          </Popup>

          <Popup open={isDeletePopupOpen} onClose={() => setIsDeletePopupOpen(false)}>
            <div className="delete-post-list">
              <h3>Select a post to delete</h3>
              {userPosts.length === 0 ? (
                <p>You have not made a post yet</p>
              ) : (
                userPosts.map((post) => (
                  <div
                    key={post._id}
                    className="delete-post-item"
                    onClick={() => handleDelete(post._id)}>
                      
                    <p className="delete-post-title">{post.title}</p>
                    <p className="delete-post-content">{post.content}</p>
                  </div>
                ))
              )}
            </div>

          </Popup>
        </div>
      </div>
    </div>
  );
}

export default Page;
