import QuizQuestion from '../models/QuizQuestion.js';
import QuizResult from '../models/QuizResult.js';

export const getQuizQuestions = async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await QuizQuestion.find(filter).select('-correctAnswer');
    return res.status(200).json({
      status: 'success',
      data: {
        questions,
      },
    });
  } catch (error) {
    console.error('Get Questions Error:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch questions',
    });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { category, answers } = req.body;

    if (!category || !answers) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide category and answers',
      });
    }

    const questionIds = Object.keys(answers);
    const questions = await QuizQuestion.find({ _id: { $in: questionIds } });

    let score = 0;
    questions.forEach((q) => {
      const userAnswer = answers[q._id.toString()];
      if (userAnswer && userAnswer.trim() === q.correctAnswer.trim()) {
        score++;
      }
    });

    const result = await QuizResult.create({
      userId: req.user._id,
      score,
      totalQuestions: questions.length,
      category,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Quiz submitted successfully',
      data: {
        result,
      },
    });
  } catch (error) {
    console.error('Submit Quiz Error:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to submit quiz',
    });
  }
};

export const getQuizResults = async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.user._id }).sort({ createdAt: -1 });
    const totalAttempted = results.length;
    const latestResult = results.length > 0 ? results[0] : null;

    return res.status(200).json({
      status: 'success',
      data: {
        results,
        stats: {
          totalAttempted,
          latestScore: latestResult ? latestResult.score : null,
          latestTotalQuestions: latestResult ? latestResult.totalQuestions : null,
        },
      },
    });
  } catch (error) {
    console.error('Get Results Error:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch results',
    });
  }
};
