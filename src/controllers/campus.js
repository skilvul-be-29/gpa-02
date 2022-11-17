import { Campus } from "../models/Campus.js";
import { NotFoundError } 

/** @type {import("express").RequestHandler} */
export async function getCampuses(req, res, next) {
  try {
    const campuses = await Campus.find();
    res.status(200).json(campuses);
  } catch (err) {
    next(err);
  }
}

export async function getCampusesById(req, res, next) {

  try{

    const { username } = req.params;
    const campus = await Campus.findOne({ username });
    if(!campus) {
      throw new NotFoundError("campus not found");
    }
    res.status(200).json(campus);
  } catch (err) {
    next(err);
  }
}