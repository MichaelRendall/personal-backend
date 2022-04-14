import mongoose from "mongoose";

interface flagQuizInterface {
  nickname: string;
  score: number;
  time: number;
  filters: { continent: string; colours: string };
}

const Schema = mongoose.Schema;

const flagQuizSchema = new Schema<flagQuizInterface>(
  {
    nickname: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    filters: {
      continent: { type: String, required: true },
      colours: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model<flagQuizInterface>("FlagQuiz", flagQuizSchema);
