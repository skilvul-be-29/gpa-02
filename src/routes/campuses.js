import { Router } from "express";
import { getCampusById, getCampuses } from "../controllers/campus.js";

export const campuses = Router();

campuses.get("/", getCampuses);

campuses.get("/:campusId", getCampusById);
