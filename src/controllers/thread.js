import AuthorizationError from "../commons/exceptions/AuthorizationError.js";
import NotFoundError from "../commons/exceptions/NotFoundError.js";
import { Thread } from "../models/Thread.js";

/** @type {import("express").RequestHandler} */
export async function addThread(req, res, next) {
  try {
    const { userId } = res.locals.token;
    const { title, content } = req.body;
    const thread = await Thread.create({
      author: userId,
      title,
      content,
    });
    res.status(201).json(thread);
  } catch (err) {
    next(err);
  }
}

/** @type {import("express").RequestHandler} */
export async function getThreads(req, res, next) {
  try {
    const threads = await Thread.find();
    res.status(200).json(threads);
  } catch (err) {
    next(err);
  }
}

/** @type {import("express").RequestHandler} */
export async function getThreadById(req, res, next) {
  try {
    const { threadId } = req.params;
    const thread = await Thread.findById(threadId);
    if (!thread) {
      throw new NotFoundError("thread not found");
    }
    res.status(200).json(thread);
  } catch (err) {
    next(err);
  }
}

/** @type {import("express").RequestHandler} */
export async function updateThreadById(req, res, next) {
  try {
    const { userId } = res.locals.token;
    const { threadId } = req.params;
    const { title, content } = req.body;
    const thread = await Thread.findById(threadId);
    if (!thread) {
      throw new NotFoundError("thread not found");
    }
    if (thread.author._id.toString() !== userId) {
      throw new AuthorizationError("not authorized");
    }
    await thread.updateOne({ title, content });
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
}

/** @type {import("express").RequestHandler} */
export async function deleteThreadById(req, res, next) {
  try {
    const { userId } = res.locals.token;
    const { threadId } = req.params;
    const thread = await Thread.findById(threadId);
    if (!thread) {
      throw new NotFoundError("thread not found");
    }
    if (thread.author._id.toString() !== userId) {
      throw new AuthorizationError("not authorized");
    }
    await Thread.findByIdAndDelete(threadId);
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
}
