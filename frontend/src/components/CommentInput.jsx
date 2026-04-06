import "./CommentInput.css";
import TextInput from "./TextInput";
import Error from "./Error";
import { useState } from "react";

function CommentInput({
  post,
  isCreateCommentOpen,
  toggleIsCreateCommentOpen,
  refreshPost,
  user,
}) {
  const [commentText, setCommentText] = useState("");
  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  async function submitComment() {
    if (commentText === "") {
      setErrorMessage("Fields cannot be empty.");
      setIsErrorDisplayed(true);
      return;
    }

    try {
      const response = await fetch(
        `https://flush-website-backend.onrender.com/api/posts/${post._id}`, //http://localhost:5001
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            comments: [
              ...post.comments,
              {
                text: commentText,
                author: user.username,
                date: new Date().toLocaleString("en-us", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "2-digit",
                }),
              },
            ],
            commentCount: post.commentCount + 1,
          }),
        },
      );

      if (response.ok) {
        toggleIsCreateCommentOpen();
        refreshPost();
      } else {
        setErrorMessage("Failed to create comment.");
        setIsErrorDisplayed(true);
      }
    } catch (error) {
      setErrorMessage("Failed to create comment.");
      setIsErrorDisplayed(true);
      console.log("Failed to update post.", error);
    }
  }
  if (!isCreateCommentOpen) return null;

  return (
    <div className="comment-input">
      {user ? (
        <>
          <TextInput
            label="Comment"
            placeholder="Write a comment..."
            maxLength="500"
            height="100px"
            updateText={setCommentText}
            isErrorDisplayed={isErrorDisplayed}
            closeError={() => setIsErrorDisplayed(false)}
          />
          <Error
            isErrorDisplayed={isErrorDisplayed}
            error={errorMessage}
          ></Error>

          <button className="submit-comment-btn" onClick={submitComment}>
            Submit
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
    </div>
  );
}

export default CommentInput;
