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

export const getQuizHistory = async (req, res) => {
  try {
    const history = await QuizResult.find({ userId: req.user._id })
      .select('category score totalQuestions createdAt')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: 'success',
      data: {
        history,
      },
    });
  } catch (error) {
    console.error('Get Quiz History Error:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch quiz history',
    });
  }
};

export const getQuizAnalytics = async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.user._id }).sort({ createdAt: -1 });

    const totalQuizzes = results.length;

    let bestScore = 0;
    let averageScore = 0;
    let latestScore = 0;

    const categoryMap = {};

    if (totalQuizzes > 0) {
      let totalPercentage = 0;
      let maxPercentage = 0;

      results.forEach((r) => {
        const accuracy = r.totalQuestions > 0 ? (r.score / r.totalQuestions) * 100 : 0;
        totalPercentage += accuracy;
        if (accuracy > maxPercentage) {
          maxPercentage = accuracy;
        }

        if (!categoryMap[r.category]) {
          categoryMap[r.category] = {
            totalScore: 0,
            totalQuestions: 0,
            attempts: 0,
          };
        }
        categoryMap[r.category].totalScore += r.score;
        categoryMap[r.category].totalQuestions += r.totalQuestions;
        categoryMap[r.category].attempts += 1;
      });

      bestScore = Math.round(maxPercentage);
      averageScore = Math.round(totalPercentage / totalQuizzes);

      const latest = results[0];
      latestScore = latest.totalQuestions > 0 ? Math.round((latest.score / latest.totalQuestions) * 100) : 0;
    }

    const categoryWisePerformance = {};
    const categories = ['aptitude', 'reasoning', 'verbal'];
    categories.forEach((cat) => {
      if (categoryMap[cat] && categoryMap[cat].totalQuestions > 0) {
        categoryWisePerformance[cat] = {
          attempts: categoryMap[cat].attempts,
          accuracy: Math.round((categoryMap[cat].totalScore / categoryMap[cat].totalQuestions) * 100),
        };
      } else {
        categoryWisePerformance[cat] = {
          attempts: 0,
          accuracy: 0,
        };
      }
    });

    return res.status(200).json({
      status: 'success',
      data: {
        totalQuizzes,
        bestScore,
        averageScore,
        latestScore,
        categoryWisePerformance,
      },
    });
  } catch (error) {
    console.error('Get Quiz Analytics Error:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch quiz analytics',
    });
  }
};
