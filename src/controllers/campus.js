import NotFoundError from "../commons/exceptions/NotFoundError.js";
import { Campus } from "../models/Campus.js";

/** @type {import("express").RequestHandler} */
export async function getCampuses(req, res, next) {
  try {
    const campuses = await Campus.find();
    res.status(200).json(campuses);
  } catch (err) {
    next(err);
  }
}

/** @type{import("express").RequestHandler} */
export async function getCampusesById(req, res, next) {
  try {
    const { id } = req.params;
    const campus = await Campus.findOne({ id });
    if (!campus) {
      throw new NotFoundError("campus not found");
    }
    res.status(200).json(campus);
  } catch (err) {
    next(err);
  }
}
