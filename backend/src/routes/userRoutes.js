import express from "express";
import { updateUser, getUserProfile, getUserByUsername } from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getUserProfile);
router.put("/:id", updateUser);
router.get("/profile/:username", getUserByUsername);

export default router;