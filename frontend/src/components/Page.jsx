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
  const [postToEdit, setPostToEdit] = useState(null);
  const [filter, setFilter] = useState("latest");

  useEffect(() => {
    refreshPosts();
  }, []);

  const userPosts = posts.filter((post) => post.author === user?.username);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(
        `https://flush-website-backend.onrender.com/api/posts/${postId}`,
        {
          //http://localhost:5001
          method: "DELETE",
        },
      );
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

    if (filter === "updated") {
      const dateB = new Date(b.updatedAt || b.createdAt);
      const dateA = new Date(a.updatedAt || a.createdAt);
      return dateB - dateA;
    }

    return 0;
  });

  const handleSelectPostToEdit = (post) => {
    setPostToEdit(post);
  };

  const handleCloseEditPopup = () => {
    setPostToEdit(null);
  };

  return (
    <div className="page">
      <div className="left">
        <div className="filter-station">
          <h3>Sort Feed</h3>
          <div className="filter-options">
            <button
              className={`filter-btn ${filter === "latest" ? "active" : ""}`}
              onClick={() => setFilter("latest")}
            >
              🌊 Latest
            </button>
            <button
              className={`filter-btn ${filter === "updated" ? "active" : ""}`}
              onClick={() => setFilter("updated")}
            >
              ✨ Recently Updated
            </button>
            <button
              className={`filter-btn ${filter === "popularity" ? "active" : ""}`}
              onClick={() => setFilter("popularity")}
            >
              🔥 Popular
            </button>
          </div>
        </div>
      </div>
      <div className="center">
        <PostContainer
          posts={filteredPosts}
          refreshPosts={refreshPosts}
          user={user}
        />
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
              <Link to="/login" className="login-btn-small">
                Login to Flush
              </Link>
            </div>
          )}

          <Popup
            open={isCreatePopupOpen}
            onClose={() => setIsCreatePopupOpen(false)}
          >
            <PostInput
              header="Create Post"
              user={user}
              closePopUp={() => setIsCreatePopupOpen(false)}
              refreshPosts={refreshPosts}
            />
          </Popup>

          <Popup
            open={isEditPopupOpen}
            onClose={() => setIsEditPopupOpen(false)}
          >
            {postToEdit ? (
              <PostInput
                header="Edit Post"
                user={user}
                existingPost={postToEdit}
                closePopUp={handleCloseEditPopup}
                refreshPosts={refreshPosts}
              />
            ) : (
              <div className="delete-post-list">
                <h3>Select a post to edit</h3>
                {userPosts.length === 0 ? (
                  <p>You have not made a post yet</p>
                ) : (
                  userPosts.map((post) => (
                    <div
                      key={post._id}
                      className="delete-post-item"
                      onClick={() => handleSelectPostToEdit(post)}
                    >
                      <p className="delete-post-title">{post.title}</p>
                      <p className="delete-post-content">{post.content}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </Popup>
          <Popup
            open={isDeletePopupOpen}
            onClose={() => setIsDeletePopupOpen(false)}
          >
            <div className="delete-post-list">
              <h3>Select a post to delete</h3>
              {userPosts.length === 0 ? (
                <p>You have not made a post yet</p>
              ) : (
                userPosts.map((post) => (
                  <div
                    key={post._id}
                    className="delete-post-item"
                    onClick={() => handleDelete(post._id)}
                  >
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
