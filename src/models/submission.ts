import mongoose from "mongoose";

const Schema = mongoose.Schema;

const submissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    game: {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);
