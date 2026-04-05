import Post from "../models/Post.js";

export async function getAllPosts(_, res) {
  try {
    const posts = await Post.find().sort({ createAt: -1 }); // latest first
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getAllPosts controller", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    console.error("Error in getPostById controller", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function createPost(req, res) {
  try {
    const { title, content, author, likes, dislikes } = req.body;
    const newPost = new Post({
      title: title,
      content: content,
      author: author,
      likes: likes,
      dislikes: dislikes,
      date: new Date().toLocaleString("en-us", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      }),
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error in createPost controller", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function updatePost(req, res) {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Note updated succesfully" });
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function deletePost(req, res) {
  try {
    const { title, content } = req.body;
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Note deleted succesfully" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export const getPostsByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const posts = await Post.find({ author: username }).sort({ createdAt: -1 });

    if (!posts || posts.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user posts", error: error.message });
  }
};

export const updateLikeToCommentByPostAndCommentId = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { likes } = req.body;
    const post = await Post.findById(postId);
    const comment = post.comments.find(
      (comment) => comment._id.toString() === commentId,
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.likes = likes;
    await post.save();

    res.send({ message: "Comment updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating comment", error: error.message });
  }
};

export const updateDislikeToCommentByPostAndCommentId = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { dislikes } = req.body;
    const post = await Post.findById(postId);
    const comment = post.comments.find(
      (comment) => comment._id.toString() === commentId,
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.dislikes = dislikes;
    await post.save();

    res.send({ message: "Comment updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating comment", error: error.message });
  }
};
