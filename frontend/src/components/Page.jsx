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
<<<<<<< HEAD
        <PostContainer posts={posts} refreshPosts={refreshPosts} />
=======
        <PostContainer posts={posts} />
>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814
      </div>
      <div className="right">
        <div className="post-cluster">
          <button
            className="create-post-btn"
            onClick={() => setIsCreatePopupOpen(true)}
          >
            Create Post
          </button>
<<<<<<< HEAD

=======
          
>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814
          <Popup
            className="create-post-popup"
            open={isCreatePopupOpen}
            onClose={() => setIsCreatePopupOpen(false)}
          >
            <PostInput
              header="Create Post"
<<<<<<< HEAD
              closePopUp={() => setIsCreatePopupOpen(false)}
              refreshPosts={refreshPosts}
=======
              onPostCreated={refreshPosts}
              closePopUp={() => setIsCreatePopupOpen(false)}
>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814
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

<<<<<<< HEAD
export default Page;
=======
export default Page;
>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814
