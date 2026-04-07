import "./PostComment.css";
import defaultPfp from "../assets/default-pfp.png";
import { useState } from "react";
import Popup from "./Popup";
import TextInput from "./TextInput";
import Error from "./Error";

function PostComment({ post, refreshPost, comment, user }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isLikeBtnHovered, setIsLikeBtnHovered] = useState(false);
  const [isDislikeBtnHovered, setIsDislikeBtnHovered] = useState(false);
  const [authAlert, setAuthAlert] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

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
    backgroundColor: isLiked ? "rgb(117, 230, 217)" : "rgb(198, 198, 198)",
  };

  const dislikeBtnStyleHover = {
    backgroundColor: isDisliked ? "rgb(193, 160, 141)" : "rgb(198, 198, 198)",
  };

  async function updateLikes(value) {
    try {
      const response = await fetch(
        `https://flush-website-backend.onrender.com/api/posts/comment/like/${post._id}/${comment._id}`, //http://localhost:5001
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            likes: comment.likes + value,
          }),
        },
      );

      if (response.ok) {
        refreshPost();
      } else {
        setAuthAlert(
          "The pipes are stuck! Server couldn't scrub the comment. 🛠️",
        );
      }
    } catch (error) {
      setAuthAlert("Internet troubles! Couldn't reach the bathroom. 📶");
      console.log(error);
    }
  }

  async function updateDislikes(value) {
    try {
      const response = await fetch(
        `https://flush-website-backend.onrender.com/api/posts/comment/dislike/${post._id}/${comment._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dislikes: comment.dislikes + value,
          }),
        },
      );

      if (response.ok) {
        refreshPost();
      } else {
        setAuthAlert(
          "The pipes are stuck! Server couldn't scrub the comment. 🛠️",
        );
      }
    } catch (error) {
      setAuthAlert("Internet troubles! Couldn't reach the bathroom. 📶");
      console.log(error);
    }
  }

  function handleLike() {
    if (!user) {
      setAuthAlert("You must be logged in to scrub this post! 🧼");
      return;
    }
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
    if (!user) {
      setAuthAlert("You must be logged in to flush this post! 💩");
      return;
    }
    if (isLiked == false) {
      if (isDisliked) {
        updateDislikes(-1);
      } else {
        updateDislikes(1);
      }
      setIsDisliked(!isDisliked);
    }
  }

  async function deleteComment(commentId) {
    try {
      const response = await fetch(
        `https://flush-website-backend.onrender.com/api/posts/comment/delete/${post._id}/${commentId}`, //http://localhost:5001
        { method: "DELETE" },
      );
      if (response.ok) {
        refreshPost();
      } else {
        setAuthAlert(
          "The pipes are stuck! Server couldn't scrub the comment. 🛠️",
        );
      }
    } catch (error) {
      setAuthAlert("Internet troubles! Couldn't reach the bathroom. 📶");
      console.log(error);
    }
  }

  async function submitEditedComment() {
    if (editedContent === "") {
      setErrorMessage("Fields cannot be empty.");
      setIsErrorDisplayed(true);
      return;
    }

    setIsEditing(false);
    try {
      const response = await fetch(
        `https://flush-website-backend.onrender.com/api/posts/comment/update/${post._id}/${comment._id}`, //http://localhost:5001
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: editedContent }),
        },
      );
      if (response.ok) {
        refreshPost();
      } else {
        setAuthAlert(
          "The pipes are stuck! Server couldn't scrub the comment. 🛠️",
        );
      }
    } catch (error) {
      setAuthAlert("Internet troubles! Couldn't reach the bathroom. 📶");
      console.log(error);
    }
  }

  return (
    <>
      <div className="comment">
        <div className="comment-author-info">
          <img
            className="comment-pfp"
            src={defaultPfp}
            alt="profile-picture"
            onError={(e) => {
              e.target.src = defaultPfp;
            }}
          />
          <h1 className="comment-username">{comment.author || "Anonymous"}</h1>
          <h1 className="post-dot">•</h1>
          <h1 className="post-date">{comment.date}</h1>
        </div>

        {isEditing ? (
          <>
            <TextInput
              label="Comment"
              placeholder="Write a comment..."
              maxLength="500"
              height="100px"
              updateText={setEditedContent}
              isErrorDisplayed={isErrorDisplayed}
              closeError={() => setIsErrorDisplayed(false)}
            />
            <Error
              className="edit-comment-error"
              isErrorDisplayed={isErrorDisplayed}
              error={errorMessage}
            ></Error>

            <button
              className="submit-comment-btn"
              onClick={submitEditedComment}
            >
              Submit
            </button>
          </>
        ) : (
          <p>{comment.text}</p>
        )}
        <div className="comment-interactions">
          <button
            className="comment-like-btn"
            onClick={handleLike}
            style={
              isLikeBtnHovered
                ? { ...likeBtnStyle, ...likeBtnStyleHover }
                : likeBtnStyle
            }
            onMouseEnter={() => setIsLikeBtnHovered(true)}
            onMouseLeave={() => setIsLikeBtnHovered(false)}
          >
            <span className="comment-icon">🧼</span>
          </button>
          <span className="post-like-count">{comment.likes}</span>

          <button
            className="comment-dislike-btn"
            onClick={handleDislike}
            style={
              isDislikeBtnHovered
                ? { ...dislikeBtnStyle, ...dislikeBtnStyleHover }
                : dislikeBtnStyle
            }
            onMouseEnter={() => setIsDislikeBtnHovered(true)}
            onMouseLeave={() => setIsDislikeBtnHovered(false)}
          >
            <span className="comment-icon">💩</span>
          </button>
          <span className="comment-dislike-count">{comment.dislikes}</span>

          {user?.username === comment.author ? (
            <>
              <button
                className="delete-comment-btn"
                onClick={() => deleteComment(comment._id)}
              >
                🗑️
              </button>
              <button
                className="edit-comment-btn"
                onClick={() => setIsEditing(true)}
              >
                ✏️
              </button>
            </>
          ) : null}
        </div>
      </div>
      <Popup open={!!authAlert} onClose={() => setAuthAlert(null)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: "16px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "48px" }}>
            {authAlert?.includes("scrub") ? "🧼" : "💩"}
          </span>
          <p style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>
            {authAlert}
          </p>
          <button
            onClick={() => setAuthAlert(null)}
            style={{
              padding: "10px 24px",
              borderRadius: "20px",
              border: "none",
              background: "#38b6ff",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Got it
          </button>
        </div>
      </Popup>
    </>
  );
}

export default PostComment;
