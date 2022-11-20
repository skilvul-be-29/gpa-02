import AuthorizationError from "../commons/exceptions/AuthorizationError.js";
import NotFoundError from "../commons/exceptions/NotFoundError.js";
import { Thread } from "../models/Thread.js";

/** @type {import("express").RequestHandler} */
export async function getComments(req, res, next) {
  try {
    const thread = await Thread.findById(req.params.threadId);
    if (!thread) {
      throw new NotFoundError("Thread not found");
    }

    res.status(200).json(thread.comments);
  } catch (err) {
    next(err);
  }
}

/** @type {import("express").RequestHandler} */
export async function getCommentById(req, res, next) {
  try {
    const thread = await Thread.findById(req.params.threadId);
    if (!thread) {
      throw new NotFoundError("Thread not found");
    }

    const comment = thread.comments.id(req.params.commentId);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
}

/** @type {import("express").RequestHandler} */
export async function addComment(req, res, next) {
  try {
    const { userId } = res.locals.token;
    const { threadId } = req.params;
    const { content } = req.body;

    const thread = await Thread.findById(threadId);
    if (!thread) {
      throw new NotFoundError("thread not found");
    }

    thread.comments.push({
      author: userId,
      content,
    });
    await thread.save();
    res.status(201).json(thread.comments.at(-1));
  } catch (err) {
    next(err);
  }
}

/** @type {import("express").RequestHandler} */
export async function updateCommentById(req, res, next) {
  try {
    const { userId } = res.locals.token;
    const { threadId, commentId } = req.params;
    const { content } = req.body;

    const thread = await Thread.findById(threadId);
    if (!thread) {
      throw new NotFoundError("thread not found");
    }

    const comment = thread.comments.id(commentId);
    if (!comment) {
      throw new NotFoundError("comment not found");
    }

    if (comment.author.toString() !== userId) {
      throw new AuthorizationError("restricted resource");
    }

    comment.content = content;
    await thread.save();
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
}

/** @type {import("express").RequestHandler} */
export async function deleteCommentById(req, res, next) {
  try {
    const { userId } = res.locals.token;
    const { threadId, commentId } = req.params;

    const thread = await Thread.findById(threadId);
    if (!thread) {
      throw new NotFoundError("thread not found");
    }

    const comment = thread.comments.id(commentId);
    if (!comment) {
      throw new NotFoundError("comment not found");
    }

    if (thread.author.toString() !== userId) {
      throw new AuthorizationError("restricted resource");
    }

    comment.remove();
    await thread.save();
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
}
