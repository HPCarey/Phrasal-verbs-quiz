// define variables to select elements

let shuffledQuestions = null;
let currentQuestionIndex = null;

// event listeners
window.addEventListener('DOMContentLoaded', (event) => {
  let startButton = document.getElementById("start-quiz-button");
  startButton.addEventListener('click', runQuiz);
  let nextButton = document.getElementById("next-button");
  nextButton.addEventListener('click', renderQuestion);
  let restartButton = document.getElementById("restart-quiz-button");
  restartButton.addEventListener('click', restartQuiz);
  console.log('DOM fully loaded and parsed');
});



//functions
function runQuiz() {
  let startPage = document.getElementById("start-page");
  startPage.classList.add('hide');
  let quizContainer = document.getElementById("quiz-container");
  quizContainer.classList.remove('hide');
  let welcomeHeading = document.getElementById("welcome-heading");
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
  currentQuestionIndex++;
  //nextQuestionIcon.classList.add("greyscale");
  //nextQuestionIcon.setAttribute("disabled", "disabled");
}

function displayQuestion(question) {
  let questionElement = document.getElementById("question");
  questionElement.innerHTML = question.question;
  /* creates a button and sets its content as the options in the questions section.
  source https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified*/
  question.options.forEach(answer => {
    let button = document.createElement('button');
    button.textContent = answer.text;
    let answerButtons = document.getElementById("answer-buttons");
    answerButtons.appendChild(button);
    button.addEventListener('click', checkAnswer);
    // marks the correct answer as correct in the HTML
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
  });
}

function resetState() {
  /* Removes the default answer buttons and replaces with the answers in question array
  source: https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified*/
  let nextButton = document.getElementById("next-button");
  nextButton.setAttribute('disabled', '');
  let answerButtons = document.getElementById("answer-buttons");
  answerButtons.innerHTML = '';
}


function checkAnswer(e) {
  const selectButton = e.target;
  const correct = selectButton.dataset.correct;
  let answerButtons = document.getElementById("answer-buttons");
  Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    let nextButton = document.getElementById("next-button");
    nextButton.removeAttribute('disabled');
  } else if (shuffledQuestions.length >= questions.length) {
    let nextButton = document.getElementById("next-button");
    nextButton.addEventListener('click', endQuiz());
  }
}

function endQuiz() {
  let quizContainer = document.getElementById("quiz-container");
  quizContainer.classList.add('hide');
  let endQuizContainer = document.getElementById("end-quiz-container");
  endQuizContainer.classList.remove('hide');
}

function restartQuiz() {
  let startPage = document.getElementById("start-page");
  startPage.classList.remove('hide');
  let endQuizContainer = document.getElementById("end-quiz-container");
  endQuizContainer.classList.add('hide');
}

//shows colour change to indicate correct/incorrect answer input from user
//https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified
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