import { Router } from "express";
import {
  addThread,
  deleteThreadById,
  getThreadById,
  getThreads,
  updateThreadById,
} from "../controllers/thread.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const threads = Router();

threads.get("/", getThreads);
threads.get("/:threadId", getThreadById);
threads.post("/", authMiddleware, addThread);
threads.put("/:threadId", authMiddleware, updateThreadById);
threads.delete("/:threadId", authMiddleware, deleteThreadById);
