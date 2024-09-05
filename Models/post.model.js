import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },

    post: { type: String, min: 1, max: 500, required: true },
    created_at: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

export const Post = model("Post", postSchema);
