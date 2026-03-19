import "./Page.css";
import PostContainer from "./PostContainer";
import Popup from "./Popup";
import { useState } from "react";
import PostInput from "./PostInput";

function Page({ posts, refreshPosts }) {
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  return (
    <div className="page">
      <div className="left"></div>
      <div className="center">
        <PostContainer posts={posts} refreshPosts={refreshPosts} />
      </div>
      <div className="right">
        <div className="post-cluster">
          <button
            className="create-post-btn"
            onClick={() => setIsCreatePopupOpen(true)}
          >
            Create Post
          </button>

          <Popup
            className="create-post-popup"
            open={isCreatePopupOpen}
            onClose={() => setIsCreatePopupOpen(false)}
          >
            <PostInput
              header="Create Post"
              closePopUp={() => setIsCreatePopupOpen(false)}
              refreshPosts={refreshPosts}
            />
          </Popup>

          <button
            className="edit-post-btn"
            onClick={() => setIsEditPopupOpen(true)}
          >
            Edit Post
          </button>

          <Popup
            className="edit-post-popup"
            open={isEditPopupOpen}
            onClose={() => setIsEditPopupOpen(false)}
          >
            Popup for edit post
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default Page;
