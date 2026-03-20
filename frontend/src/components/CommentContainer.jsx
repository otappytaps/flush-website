import "./CommentContainer.css";
import PostComment from "./PostComment";

function CommentContainer({ post, isCreateCommentOpen }) {
  if (isCreateCommentOpen) return null;

  return (
    <div className="comment-container">
      {post.comments.map((comment, index) => {
        return (
          <PostComment
            key={comment._id || index}
            comment={{
              text: comment.text,
              author: comment.author,
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
