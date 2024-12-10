import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  freePreview: Boolean,
  public_id: String,
});

const CreateNew_Course = new mongoose.Schema({
  instructorName: { 
    type: String
   },
  instructorId: {
    type: String,
  },
  date: {
    type: Date,
  },
  title: {
    type: String,
    required: true || ["enter the title "],
  },
  category: {
    type: String,
  },
  level: {
    type: String,
  },
  primaryLanguage: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
  },
  pricing: {
    type: Number,
  },
  objectives: {
    type: String,
  },
  welcomeMessage: {
    type: String,
  },
  image: {
    type: String,
  },
  students: [
    {
      studentId: String,
      studentName: String,
      studentEmail: String,
      paidaAmount  : String
    },
  ],
  curriculum: [LectureSchema],
  isPublished: Boolean,
});

const Create_Course =
  mongoose.model.Create_Course || mongoose.model("Course", CreateNew_Course);

export default Create_Course;
