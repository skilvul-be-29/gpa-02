import { Comment } from "../models/Comment.js";
import { Thread } from "../models/Thread.js";
import { Types } from "mongoose";
import NotFoundError from "../commons/exceptions/NotFoundError.js";
import AuthorizationError from "../commons/exceptions/AuthorizationError.js";

/** @type {import("express").RequestHandler} */
export async function addComment(req, res, next) {
  try {
    // TODO: replace author below with user id from token payload
    const author = new Types.ObjectId();
    const { threadId } = req.params;

    const thread = await Thread.findById(threadId);
    if (!thread) {
      throw new NotFoundError("thread not found")
    }

    const comment = await Comment.create({
      ...req.body,
      author,
      threadId,
    });
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
}

/** @type {import("express").RequestHandler} */
export async function updateCommentById(req, res, next) {
  try {
    const { threadId, commentId } = req.params;

    const thread = await Thread.findById(threadId);
    if (!thread) {
      throw new NotFoundError("thread not found")
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new NotFoundError("comment not found")
    }

    // TODO: if unauthorized, throw forbidden error
    // extract user id (author) from token payload
    // if (comment.author !== author) {
    //   throw new AuthorizationError("restricted resource")
    // }

    await Comment.updateOne({ _id: commentId}, {
      ...req.body,
    });
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
    const { threadId, commentId } = req.params;

    const thread = await Thread.findById(threadId);
    if (!thread) {
      throw new NotFoundError("thread not found")
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new NotFoundError("comment not found")
    }

    // TODO: if unauthorized, throw forbidden error
    // extract user id (author) from token payload
    // if (thread.author !== author) {
    //   throw new AuthorizationError("restricted resource")
    // }

    await Comment.deleteOne({ _id: commentId });
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
}
