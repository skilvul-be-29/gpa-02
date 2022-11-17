import { Router } from "express";
import { getCampuses, getCampusesById } from "../controllers/campus.js";

export const campuses = Router();

campuses.get("/", getCampuses);

campuses.get("/:campusid", getCampusesById);
