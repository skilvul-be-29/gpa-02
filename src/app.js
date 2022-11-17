import express from "express";
import { users } from "./routes/users.js";
import { threads } from "./routes/threads.js";
import ClientError from "./commons/exceptions/ClientError.js";

export const app = express();

app.use(express.json());

app.use("/users", users);
app.use("/threads", threads)

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
