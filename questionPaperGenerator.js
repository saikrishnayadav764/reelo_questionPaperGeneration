const questionStore = require("./questionStore");

// questionPaperGenerator.js
class QuestionPaperGenerator {
  constructor(questionStore) {
    this.questionStore = questionStore;
  }

  generateQuestionPaper(
    totalMarks,
    difficultyDistribution,
    topicDistribution,
    choice
  ) {
    const questionPaper = [];

    switch (choice) {
      case 0: {
        // Distribution of questions based on difficulty percentages
        for (const difficulty in difficultyDistribution) {
          const percentage = difficultyDistribution[difficulty];
          const difficultyQuestions = this.getQuestionsByDifficulty(difficulty);
          const marksForDifficulty = (percentage / 100) * totalMarks;

          let accumulatedMarks = 0;
          let currentIndex = 0;

          while (
            accumulatedMarks < marksForDifficulty &&
            currentIndex < difficultyQuestions.length
          ) {
            const currentQuestion = difficultyQuestions[currentIndex];

            if (
              currentQuestion.marks + accumulatedMarks <=
              marksForDifficulty
            ) {
              questionPaper.push(currentQuestion);
              accumulatedMarks += currentQuestion.marks;
            }

            currentIndex++;
          }
        }
        break;
      }

      case 1: {
        // Distribution of questions based on topic percentages
        for (const topic in topicDistribution) {
          const percentage = topicDistribution[topic];
          const topicQuestions = this.getQuestionsByTopic(topic);
          const marksForTopic = (percentage / 100) * totalMarks;

          let accumulatedMarks = 0;
          let currentIndex = 0;

          while (
            accumulatedMarks < marksForTopic &&
            currentIndex < topicQuestions.length
          ) {
            const currentQuestion = topicQuestions[currentIndex];

            if (currentQuestion.marks + accumulatedMarks <= marksForTopic) {
              questionPaper.push(currentQuestion);
              accumulatedMarks += currentQuestion.marks;
            }

            currentIndex++;
          }
        }
        break;
      }

      case 2: {
        // Distribution of questions based on topic and difficulty percentages
        for (const difficulty in difficultyDistribution) {
          const difficultyPercentage = difficultyDistribution[difficulty];
          const topicDistributionForDifficulty =
            topicDistribution[difficulty] || {}; // Get topic distribution for the specific difficulty
          const difficultyQuestions = this.getQuestionsByDifficulty(difficulty);
          const marksForDifficulty = (difficultyPercentage / 100) * totalMarks;

          let accumulatedMarks = 0;
          let currentIndex = 0;

          while (
            accumulatedMarks < marksForDifficulty &&
            currentIndex < difficultyQuestions.length
          ) {
            const currentQuestion = difficultyQuestions[currentIndex];

            if (
              currentQuestion.marks + accumulatedMarks <= marksForDifficulty &&
              topicDistributionForDifficulty[currentQuestion.topic]
            ) {
              questionPaper.push(currentQuestion);
              accumulatedMarks += currentQuestion.marks;
            }

            currentIndex++;
          }
        }
        break;
      }
    }

    return questionPaper;
  }

  getQuestionsByDifficulty(difficulty) {
    return questionStore.filter(
      (question) => question.difficulty === difficulty
    );
  }

  getQuestionsByTopic(topic) {
    return questionStore.filter((question) => question.topic === topic);
  }
}

module.exports = QuestionPaperGenerator;
