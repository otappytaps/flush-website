import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  getPostById,
  getPostsByUsername,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/user/:username", getPostsByUsername);

export default router;
