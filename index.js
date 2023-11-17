const readline = require("readline");
const questionStore = require("./questionStore");
const QuestionPaperGenerator = require("./questionPaperGenerator");

// Helper function to create a readline interface
const createInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

// Helper function to prompt the user for input
const promptUser = (question) => {
  const rl = createInterface();
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

const questionPaperGenerator = new QuestionPaperGenerator(questionStore);

const totalMarks = 100;

//edit values if you want to generate by difficulty
const difficulty = {
  total: 100,
  Easy: 30,
  Medium: 40,
  Hard: 30,
};

//edit values if you want to generate by topic
const topic = {
  total: 100,
  "Topic 1": 30,
  "Topic 2": 40,
  "Topic 3": 30,
};

//edit values if you want to generate by difficulty and topic
const topicDistribution = {
  Easy: {
    "Topic 1": 40,
    "Topic 2": 60,
  },
  Medium: {
    "Topic 1": 30,
    "Topic 2": 50,
  },
  Hard: {
    "Topic 1": 20,
    "Topic 2": 30,
  },
};

promptUser(`
Enter 0 for the question paper generation by difficulty wise\n
Enter 1 for the question paper generation by topic wise\n
Enter 2 for the question paper generation by both topic and difficulty wise\n
Enter choice: `).then((input) => {
  let questionPaper = null;
  const choice = parseInt(input, 10);
  if (isNaN(choice) || choice < 0 || choice > 2) {
    throw new Error(
      "Invalid input. Please enter 0, 1 or 2 for question paper generation."
    );
  }

  if (choice === 1) {
    questionPaper = questionPaperGenerator.generateQuestionPaper(
      totalMarks,
      difficulty,
      topic,
      choice
    );
  } else {
    questionPaper = questionPaperGenerator.generateQuestionPaper(
      totalMarks,
      difficulty,
      topicDistribution,
      choice
    );
  }

  if (choice === 0) {
    console.log("Generated Question Paper By Difficulty wise:");
  } else if (choice == 1) {
    console.log("Generated Question Paper By Topic Wise:");
  } else {
    console.log("Generated Question Paper By both Difficulty and topic wise:");
  }

  console.log(questionPaper);
});
