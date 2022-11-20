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
export async function getCampusById(req, res, next) {
  try {
    const { campusId } = req.params;
    const campus = await Campus.findById(campusId);
    if (!campus) {
      throw new NotFoundError("campus not found");
    }
    res.status(200).json(campus);
  } catch (err) {
    next(err);
  }
}
