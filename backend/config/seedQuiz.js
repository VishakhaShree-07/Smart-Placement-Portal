import QuizQuestion from '../models/QuizQuestion.js';

const sampleQuestions = [
  {
    question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    options: ["120 metres", "150 metres", "324 metres", "180 metres"],
    correctAnswer: "150 metres",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "The cost price of 20 articles is the same as the selling price of x articles. If the profit is 25%, then the value of x is:",
    options: ["15", "16", "18", "25"],
    correctAnswer: "16",
    category: "aptitude",
    difficulty: "medium"
  },
  {
    question: "If a person walks at 14 km/hr instead of 10 km/hr, he would have walked 20 km more. The actual distance travelled by him is:",
    options: ["50 km", "56 km", "70 km", "80 km"],
    correctAnswer: "50 km",
    category: "aptitude",
    difficulty: "medium"
  },
  {
    question: "Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?",
    options: ["(1/3)", "(1/8)", "(2/8)", "(1/16)"],
    correctAnswer: "(1/8)",
    category: "reasoning",
    difficulty: "easy"
  },
  {
    question: "SCD, TEF, UGH, ____, WKL. Find the missing term.",
    options: ["CMN", "UJI", "VIJ", "IJT"],
    correctAnswer: "VIJ",
    category: "reasoning",
    difficulty: "easy"
  },
  {
    question: "Pointing to a photograph of a boy Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?",
    options: ["Brother", "Uncle", "Cousin", "Father"],
    correctAnswer: "Father",
    category: "reasoning",
    difficulty: "medium"
  },
  {
    question: "Find the synonym of 'ABANDON':",
    options: ["Keep", "Forsake", "Cherish", "Adopt"],
    correctAnswer: "Forsake",
    category: "verbal",
    difficulty: "easy"
  },
  {
    question: "Choose the word which is opposite in meaning to 'ANOMALOUS':",
    options: ["Normal", "Strange", "Atypical", "Unusual"],
    correctAnswer: "Normal",
    category: "verbal",
    difficulty: "medium"
  },
  {
    question: "Fill in the blank: The police _____ the thief before he could escape.",
    options: ["catches", "caught", "has caught", "had caught"],
    correctAnswer: "caught",
    category: "verbal",
    difficulty: "easy"
  }
];

const seedQuiz = async () => {
  try {
    const count = await QuizQuestion.countDocuments();
    if (count === 0) {
      await QuizQuestion.insertMany(sampleQuestions);
      console.log('Quiz questions seeded successfully');
    }
  } catch (error) {
    console.error('Quiz seeding failed:', error.message);
  }
};

export default seedQuiz;
