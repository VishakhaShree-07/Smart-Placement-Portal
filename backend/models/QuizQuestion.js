import mongoose from 'mongoose';

const quizQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: [
        (val) => val.length >= 2,
        'Question must have at least 2 options',
      ],
    },
    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['aptitude', 'reasoning', 'verbal'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const QuizQuestion = mongoose.model('QuizQuestion', quizQuestionSchema);

export default QuizQuestion;
