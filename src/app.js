import express from "express";
import { users } from "./routes/users.js";

export const app = express();

app.use(express.json());

app.use("/users", users);
