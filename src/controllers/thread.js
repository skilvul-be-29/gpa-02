import { Thread } from "../models/Thread.js";
import { Types } from "mongoose";
import NotFoundError from "../commons/exceptions/NotFoundError.js";
import AuthorizationError from "../commons/exceptions/AuthorizationError.js";

/** @type {import("express").RequestHandler} */
export async function addThread(req, res, next) {
  try {
    // TODO: replace author below with user id from token payload
    const author = new Types.ObjectId();
    const thread = await Thread.create({
      ...req.body,
      author,
    });
    res.status(200).json(thread);
  } catch (err) {
    next(err);
  }
}


/** @type {import("express").RequestHandler} */
export async function getThreads(req, res, next) {
  try {
    const threads = await Thread.find({}, { comments: 0 });
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
      throw new NotFoundError("thread not found")
    }

    res.status(200).json(thread);
  } catch (err) {
    next(err);
  }
}

/** @type {import("express").RequestHandler} */
export async function updateThreadById(req, res, next) {
  try {
    const { threadId } = req.params;

    const thread = await Thread.findById(threadId);
    if (!thread) {
      throw new NotFoundError("thread not found")
    }

    // TODO: if unauthorized, throw forbidden error
    // extract user id (author) from token payload
    // if (thread.author !== author) {
    //   throw new AuthorizationError("restricted resource")
    // }

    await Thread.updateOne({ _id: threadId}, {
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
export async function deleteThreadById(req, res, next) {
  try {
    const { threadId } = req.params;

    const thread = await Thread.findById(threadId);
    if (!thread) {
      throw new NotFoundError("thread not found")
    }

    // TODO: if unauthorized, throw forbidden error
    // extract user id (author) from token payload
    // if (thread.author !== author) {
    //   throw new AuthorizationError("restricted resource")
    // }

    await Thread.deleteOne({ _id: threadId });
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
}
