import "./Page.css";
import PostContainer from "./PostContainer";
import Popup from "./Popup";
import { useEffect, useState } from "react";
import PostInput from "./PostInput";
import { Link } from "react-router-dom";

function Page({ posts, refreshPosts, user }) {
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <div className="page">
      <div className="left"></div>
      <div className="center">
        <PostContainer posts={posts} refreshPosts={refreshPosts} user={user} />
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

          <Popup open={isEditPopupOpen} onClose={() => setIsEditPopupOpen(false)}>
            Popup for edit post
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default Page;
