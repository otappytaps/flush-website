import "./CommentSection.css";
import CommentContainer from "./CommentContainer";
import CommentInput from "./CommentInput";
import { useState } from "react";

function CommentSection({ post, refreshPost }) {
  const [isCreateCommentOpen, setIsCreateCommentOpen] = useState(false);

  const [
    isCreateCommentAndBackBtnHovered,
    setIsCreateCommentAndBackBtnHovered,
  ] = useState(false);

  function toggleIsCreateCommentOpen() {
    setIsCreateCommentOpen(!isCreateCommentOpen);
  }

  const createCommentBtnStyle = {
    backgroundColor: "#006eff",
    color: "white",
    padding: "10px 0px",
    width: "200px",
    border: "none",
    borderRadius: "20px",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  };

  const backBtnStyle = {
    backgroundColor: "#ffffff",
    padding: "10px 0px",
    width: "200px",
    border: "1px solid black",
    borderRadius: "20px",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  };

  const createCommentAndBackBtnHoverStyle = {
    transform: "scale(1.05)",
  };

  return (
    <div className="comment-section-container">
      <h2 className="comment-section-header">Comments</h2>
      <button
        className="create-comment-and-back-btn"
        onClick={() => setIsCreateCommentOpen(!isCreateCommentOpen)}
        style={
          isCreateCommentOpen
            ? isCreateCommentAndBackBtnHovered
              ? { ...backBtnStyle, ...createCommentAndBackBtnHoverStyle }
              : backBtnStyle
            : isCreateCommentAndBackBtnHovered
              ? {
                  ...createCommentBtnStyle,
                  ...createCommentAndBackBtnHoverStyle,
                }
              : createCommentBtnStyle
        }
        onMouseEnter={() => setIsCreateCommentAndBackBtnHovered(true)}
        onMouseLeave={() => setIsCreateCommentAndBackBtnHovered(false)}
      >
        {isCreateCommentOpen ? "Back" : "Create Comment"}
      </button>
      <CommentInput
        post={post}
        isCreateCommentOpen={isCreateCommentOpen}
        toggleIsCreateCommentOpen={toggleIsCreateCommentOpen}
        refreshPost={refreshPost}
      />
      <CommentContainer post={post} isCreateCommentOpen={isCreateCommentOpen} />
    </div>
  );
}

export default CommentSection;
