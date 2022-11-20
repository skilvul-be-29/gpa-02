import { Router } from "express";
import {
  addComment,
  deleteCommentById,
  getCommentById,
  getComments,
  updateCommentById,
} from "../controllers/comment.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const comments = Router();

comments
  .get("/:threadId/comments", getComments)
  .get("/:threadId/comments/:commentId", getCommentById)
  .post("/:threadId/comments", authMiddleware, addComment)
  .put("/:threadId/comments/:commentId", authMiddleware, updateCommentById)
  .delete("/:threadId/comments/:commentId", authMiddleware, deleteCommentById);
