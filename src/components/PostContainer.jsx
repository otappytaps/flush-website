import "./PostContainer.css";

function PostContainer({ posts }) {
  return (
    <div className="post-container">
      <div className="stream">
        <hr></hr>
      </div>
      <div className="posts">
        {posts.map((post) => {
          return (
            <div className="post">
              <div className="author-info">
                <img className="pfp" src={post.pfp} />
                <a href="">
                  <h1 className="username">{post.author}</h1>
                </a>
                <h1 className="dot">•</h1>
                <h1 className="date">{post.date}</h1>
              </div>

              <h3>{post.title}</h3>
              <p>{post.content}</p>

              <div className="post-interactions">
                <button className="upvote-btn">
                  <span className="icon">🧼</span>
                  <span className="count">{post.likes}</span>
                </button>

                <button className="downvote-btn">
                  <span className="icon">💩</span>
                  <span className="count">{post.dislikes}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PostContainer;
