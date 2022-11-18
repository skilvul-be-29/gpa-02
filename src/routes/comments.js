import { Router } from "express";
import {
  addComment,
  deleteCommentById,
  updateCommentById,
} from "../controllers/comment.js";

export const comments = Router();

comments.post("/:threadId/comments", addComment);
comments.put("/:threadId/comments/:commentId", updateCommentById);
comments.delete("/:threadId/comments/:commentId", deleteCommentById);
