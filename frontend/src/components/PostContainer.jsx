import "./PostContainer.css";
import defaultPfp from "../assets/default-pfp.png";
import Post from "./Post";
import { useEffect } from "react";

function PostContainer({ posts, refreshPosts }) {
  useEffect(() => {
    refreshPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="post-container">
      <div className="post-container-stream">
        <hr></hr>
      </div>
      <div className="posts">
        {posts.map((post) => {
          return (
            <Post
              key={post._id}
              post={{
                _id: post._id,
                author: post.author,
                title: post.title,
                content: post.content,
                date: post.date,
                pfp: post.pfp || defaultPfp,
                likes: post.likes,
                dislikes: post.dislikes,
              }}
              refreshPost={refreshPosts}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PostContainer;
