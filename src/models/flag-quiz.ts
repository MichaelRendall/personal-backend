import mongoose from "mongoose";

interface flagQuizInterface {
  nickname: string;
  score: number;
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
  },
  { timestamps: true }
);

export default mongoose.model<flagQuizInterface>("FlagQuiz", flagQuizSchema);
