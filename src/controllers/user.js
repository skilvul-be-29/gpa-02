import { User } from "../models/User.js";

/** @type {import("express").RequestHandler} */
export async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}
