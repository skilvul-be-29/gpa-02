import { model, Schema } from "mongoose";

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  threadId: {
    type: Schema.Types.ObjectId,
    ref: "Thread",
    required: true,
  },
});

export const Comment = model("Comment", commentSchema);
