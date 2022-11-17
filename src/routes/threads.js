import { Router } from "express";
import {
  addThread,
  deleteThreadById,
  getThreadById,
  getThreads,
  updateThreadById,
} from "../controllers/thread.js";

export const threads = Router();

threads.post("/", addThread);
threads.get("/", getThreads);
threads.get("/:threadId", getThreadById);
threads.put("/:threadId", updateThreadById);
threads.delete("/:threadId", deleteThreadById);
