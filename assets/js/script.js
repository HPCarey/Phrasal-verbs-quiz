// define variables to select elements
const startButton = document.getElementById("start-quiz-button");
const nextButton = document.getElementById("next-button");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const startPage = document.getElementById("start-page");
const quizContainer = document.getElementById("quiz-container");
const welcomeHeading = document.getElementById("welcome-heading");

let shuffledQuestions;
let currentQuestionIndex;

// event listeners
startButton.addEventListener('click', runQuiz);
nextButton.addEventListener('click', renderQuestion);


//functions
function runQuiz() {
  startPage.classList.add('hide');
  quizContainer.classList.remove('hide');
  welcomeHeading.innerHTML = "Choose the correct phrasal verb:";
  /* followed instructions from this video in order to create the render function and display function features
  https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified*/
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  renderQuestion();
}

function renderQuestion() {
  resetState();
  displayQuestion(shuffledQuestions[currentQuestionIndex]);

}

function displayQuestion(question) {
  questionElement.innerHTML = question.question;
  /* creates a button and sets its content as the options in the questions section.
  source https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified*/
  question.options.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    answerButtons.appendChild(button);
    button.addEventListener('click', checkAnswer);
    // marks the correct answer as correct in the HTML
    if (answer.correct) {
        button.dataset.correct = answer.correct;
    }
});
}

function resetState() {
  /* Removes the default answer buttons
  source: https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified*/
  nextButton.classList.add('hide');
  answerButtons.innerHTML = '';
  }
  

function checkAnswer(e) {
  const selectButton = e.target;
  const correct = selectButton.dataset.correct;
  Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('incorrect');
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
  }
}

function incrementScore() {

}
// Below are questions, options and answers for quiz
const questions = [{
    question: "Meaning: Learn a new skill through practice rather than study.",
    options: [
      { text: 'read up on', correct: false },
      { text: 'fill in', correct: false },
      { text: 'pick up', correct: true },
      { text: 'take up', correct: false }
    ]
  },
  {
    question: "Meaning: Revise/ study a concept again to clarify the meaning",
    options: [
    { text: 'look up', correct: false },
    { text: 'fill in', correct: false },
    { text: 'read up on', correct: false },
    { text: 'go over', correct: true }
    ]
  },
  {
    question: "Meaning: Use an information database or learning resource to verify something or learn something specific",
    options: [
      { text: 'read up on', correct: false },
      { text: 'look up', correct: true },
      { text: 'pick up', correct: false },
      { text: 'take up', correct: false }
    ]
  },
  {
    question: "Meaning: Start learning a new skill or hobby",
    options: [
      { text: 'pick up', correct: false },
      { text: 'read up on', correct: false },
      { text: 'take up', correct: true },
      { text: 'go over', correct: false }
    ]
  },
  {
    question: "Meaning: Expand your knowledge of a subject through study",
    options: [
      { text: 'read up on', correct: true },
      { text: 'look up', correct: false },
      { text: 'take up', correct: false },
      { text: 'go over', correct: false }
    ]
  },
  {
    question: "Meaning: Complete information that is missing from a form or test",
    options: [
      { text: 'look up', correct: false },
      { text: 'fill in', correct: true },
      { text: 'read up on', correct: false },
      { text: 'take up', correct: false }
    ]
  }
];