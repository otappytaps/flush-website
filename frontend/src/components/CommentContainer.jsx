import "./CommentContainer.css";
import PostComment from "./PostComment";

function CommentContainer({ post, refreshPost, isCreateCommentOpen, user }) {
  if (isCreateCommentOpen) return null;

  return (
    <div className="comment-container">
      {post.comments.map((comment, index) => {
        return (
          <PostComment
            key={comment._id || index}
            post={post}
            refreshPost={refreshPost}
            comment={{
              _id: comment._id,
              text: comment.text,
              author: comment.author,
              likes: comment.likes,
              dislikes: comment.dislikes,
              date: comment.date,
            }}
            user={user}
          />
        );
      })}
    </div>
  );
}

export default CommentContainer;
