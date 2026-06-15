import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['aptitude', 'reasoning', 'verbal'],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

export default QuizResult;
