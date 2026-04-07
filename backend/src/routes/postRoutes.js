import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  getPostById,
  getPostsByUsername,
  updateLikeToCommentByPostAndCommentId,
  updateDislikeToCommentByPostAndCommentId,
  deleteCommentByPostAndCommentId,
  searchPosts,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/search", searchPosts);

router.delete(
  "/comment/delete/:postId/:commentId",
  deleteCommentByPostAndCommentId,
);

router.put(
  "/comment/like/:postId/:commentId",
  updateLikeToCommentByPostAndCommentId,
);
router.put(
  "/comment/dislike/:postId/:commentId",
  updateDislikeToCommentByPostAndCommentId,
);

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/user/:username", getPostsByUsername);

export default router;
