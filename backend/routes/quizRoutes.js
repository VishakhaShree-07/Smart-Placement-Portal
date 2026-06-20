import express from 'express';
import {
  getQuizQuestions,
  submitQuiz,
  getQuizResults,
  getQuizHistory,
  getQuizAnalytics,
} from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/questions', getQuizQuestions);
router.post('/submit', submitQuiz);
router.get('/results', getQuizResults);
router.get('/history', getQuizHistory);
router.get('/analytics', getQuizAnalytics);

export default router;
