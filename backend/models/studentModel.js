import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: String, required: true },

    progress: {
      mulearn: { type: Number, default: 0 },
      codechef: { type: Number, default: 0 },
      leetcode: { type: Number, default: 0 },
      github: { type: Number, default: 0 },

      // ✅ Stores multiple updates with timestamps
      history: [
        {
          comment: { type: String },
          date: { type: Date, default: Date.now }
        }
      ]
    },

    courses: [
      {
        title: String,
        platform: String,
        status: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
