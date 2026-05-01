import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    toolUsed: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
