import { Router } from "express";
import {
  addComment,
  deleteCommentById,
  updateCommentById,
} from "../controllers/comment.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const comments = Router();

comments.use("/:threadId/comments", authMiddleware);
comments.post("/:threadId/comments", addComment);
comments.put("/:threadId/comments/:commentId", updateCommentById);
comments.delete("/:threadId/comments/:commentId", deleteCommentById);
