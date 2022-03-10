import mongoose from "mongoose";

interface userInterface {
  name: string;
  uuid: string;
  isHost: boolean;
}

interface gameInterface {
  room: string;
  active: boolean;
  users: {
    name: string;
    uuid: string;
    isHost?: boolean;
  }[];
}

const Schema = mongoose.Schema;

const usersSchema = new Schema<userInterface>({
  name: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
  isHost: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const gameSchema = new Schema<gameInterface>(
  {
    room: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
    users: [usersSchema],
  },
  { timestamps: true }
);

export default mongoose.model<gameInterface>("Game", gameSchema);
