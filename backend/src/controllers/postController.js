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
    const { title, content } = req.body;
    
    const isActualEdit = title !== undefined || content !== undefined;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        returnDocument: "after",
        runValidators: true,
        timestamps: isActualEdit,
      }
    );

    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });

    res.status(200).json(updatedPost); 
  } catch (error) {
    console.error("Error in updatePost controller", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function deletePost(req, res) {
  try {
    // const { title, content } = req.body;
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

export const searchPosts = async (req, res) => {
  try {
    const { q, type } = req.query; 

    if (!q) return res.status(400).json({ message: "Search query required" });

    let queryCondition = {};

    if (type && ["title", "content", "author"].includes(type)) {
      queryCondition = { [type]: { $regex: q, $options: "i" } };
    } else {
      queryCondition = {
        $or: [
          { title: { $regex: q, $options: "i" } },
          { content: { $regex: q, $options: "i" } },
          { author: { $regex: q, $options: "i" } }
        ]
      };
    }

    const posts = await Post.find(queryCondition).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};