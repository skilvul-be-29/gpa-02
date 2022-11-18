import express from "express";
import ClientError from "./commons/exceptions/ClientError.js";
import { auth } from "./routes/auth.js";
import { comments } from "./routes/comments.js";
import { threads } from "./routes/threads.js";
import { users } from "./routes/users.js";

export const app = express();

app.use(express.json());

app.use("/auth", auth);
app.use("/users", users);
app.use("/threads", threads);
app.use("/threads", comments);

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.log(err);
  return res.status(500).json({
    message: "internal server error",
  });
});
