import "./PostComment.css";
import defaultPfp from "../assets/default-pfp.png";

function PostComment({ comment }) {
  return (
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

      <p>{comment.text}</p>
      <div className="comment-interactions">
        <button className="comment-like-btn">
          <span className="comment-icon">🧼</span>
        </button>
        <span className="post-like-count">67</span>

        <button className="comment-dislike-btn">
          <span className="comment-icon">💩</span>
        </button>
        <span className="comment-dislike-count">67</span>
      </div>
    </div>
  );
}

export default PostComment;
