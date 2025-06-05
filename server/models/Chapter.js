import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  subject: String,
  chapter: String,
  class: String,
  unit: String,
  yearWiseQuestionCount: { type: Object },
  questionSolved: Number,
  status: { type: String, enum: ["Completed", "In Progress", "Not Started"] },
  isWeakChapter: Boolean,
});

export default mongoose.model("Chapter", chapterSchema);
