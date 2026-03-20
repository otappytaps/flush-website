import "./CommentContainer.css";
import PostComment from "./PostComment";

function CommentContainer({ post, isCreateCommentOpen }) {
  if (isCreateCommentOpen) return null;

  return (
    <div className="comment-container">
      {post.comments.map((comment) => {
        return (
          <PostComment
            comment={{
              text: comment.text,
              likes: comment.likes,
              dislikes: comment.dislikes,
              date: comment.date,
            }}
          />
        );
      })}
    </div>
  );
}

export default CommentContainer;
