// define variables to select elements
const startButton = document.getElementById("start-quiz-button");
const nextButton = document.getElementById("next-button");
const question = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const startPage = document.getElementById("start-page");
const quizContainer = document.getElementById("quiz-container");
const welcomeHeading = document.getElementById("welcome-heading");

// event listeners
startButton.addEventListener('click', runQuiz);
nextButton.addEventListener('click', renderQuestion);

//functions
function runQuiz() {
  startPage.classList.add('hide');
  quizContainer.classList.remove('hide');
  welcomeHeading.innerHTML = "Choose the correct phrasal verb";
  document.getElementById('right').textContent = 0;
  document.getElementById('wrong').textContent = 0;
  currentQuestionIndex = 0;
  displayNextQuestion();
}

function renderQuestion(question) {

}

function checkAnswer(event) {

}

function incrementScore() {

}
// Below are questions, options and answers for quiz
const questions = [{
    question: "Meaning: Learn a new skill through practice rather than study.",
    options: ["read up on", "fill in", "pick up", "take up"],
    correctAnswer: "pick up"
  },
  {
    question: "Meaning: Revise/ study a concept again to clarify the meaning",
    options: ["look up", "fill in", "read up on", "go over"],
    correctAnswer: "go over"
  },
  {
    question: "Meaning: Use an information database or learning resource to verify something or learn something specific",
    options: ["read up on", "look up", "pick up", "take up"],
    correctAnswer: "look up"
  },
  {
    question: "Meaning: Start learning a new skill or hobby",
    options: ["pick up", "read up on", "take up", "go over"],
    correctAnswer: "take up"
  },
  {
    question: "Meaning: Expand your knowledge of a subject through study",
    options: ["read up on", "look up", "take up", "go over"],
    correctAnswer: "read up on"
  },
  {
    question: "Meaning: Complete information that is missing from a form or test",
    options: ["look up", "fill in", "read up on", "take up"],
    correctAnswer: "fill in"
  },
]