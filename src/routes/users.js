import { Router } from "express";
import { getUsers } from "../controllers/user.js";

export const users = Router();

users.get("/", getUsers);
