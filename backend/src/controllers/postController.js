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
    const { title, content, likes, dislikes } = req.body;
    const newPost = new Post({
      title: title,
      content: content,
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
    console.log(title, content);
  } catch (error) {
    console.error("Error in createPost controller", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function updatePost(req, res) {
  try {
    const { title, content, likes, dislikes } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, likes, dislikes },
      {
        new: true,
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
