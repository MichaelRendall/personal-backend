import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
});

const gameSchema = new Schema(
  {
    room: {
      type: String,
      required: true,
    },
    users: [usersSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Game", gameSchema);
