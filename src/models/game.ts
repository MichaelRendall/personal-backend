import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    room: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Game", gameSchema);
