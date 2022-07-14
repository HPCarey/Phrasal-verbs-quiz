/*jshint esversion: 6 */
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

/**
 * Removes the hover effect for touch screens.
 * This entire function was copied from the source below:
 * https://stackoverflow.com/questions/23885255/how-to-remove-ignore-hover-css-style-on-touch-devices
 * @returns 
 */
 function watchForHover() {
  // lastTouchTime is used for ignoring emulated mousemove events
  // that are fired after touchstart events. Since they're
  // indistinguishable from real events, we use the fact that they're
  // fired a few milliseconds after touchstart to filter them.
  let lastTouchTime = 0;

  function enableHover() {
    if (new Date() - lastTouchTime < 500) return;
    document.body.classList.add('hasHover');
  }

  function disableHover() {
    document.body.classList.remove('hasHover');
  }

  function updateLastTouchTime() {
    lastTouchTime = new Date();
  }

  document.addEventListener('touchstart', updateLastTouchTime, true);
  document.addEventListener('touchstart', disableHover, true);
  document.addEventListener('mousemove', enableHover, true);

  enableHover();
}

watchForHover();


/**
 * runs quiz by hiding the start page and removing hide class from the quiz container
 * renders questions and shuffles them so the order is random: source:https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified
 * changes the heading to match the activity
 */
function runQuiz() {
  let startPage = document.getElementById("start-page");
  startPage.classList.add('hide');
  let quizContainer = document.getElementById("quiz-container");
  quizContainer.classList.remove('hide');
  let welcomeHeading = document.getElementById("welcome-heading");
  welcomeHeading.innerHTML = "Choose the correct phrasal verb:";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  renderQuestion();
}

/**
 * calls resetState function to reset results of user's actions in previous question.
 * displays the next question in a random order
 */
function renderQuestion() {
  resetState();
  displayQuestion(shuffledQuestions[currentQuestionIndex]);
}

/**
 * Disables the next button.
 * Removes disabled attribute from answer buttons once new question is rendered.
 * Removes the correct or incorrect class from th answer buttons hence removing the colour red or green.
 * source: https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified
 */
function resetState() {
  let nextButton = document.getElementById("next-button");
  nextButton.setAttribute('disabled', '');
  let answerButtons = document.getElementsByClassName("btn");
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].classList.remove("correct");
    answerButtons[i].classList.remove("incorrect");
  }
  let answerButton1 = document.getElementById('answer-btn-1');
  let answerButton2 = document.getElementById('answer-btn-2');
  let answerButton3 = document.getElementById('answer-btn-3');
  let answerButton4 = document.getElementById('answer-btn-4');
  answerButton1.removeAttribute("disabled", "disabled");
  answerButton2.removeAttribute("disabled", "disabled");
  answerButton3.removeAttribute("disabled", "disabled");
  answerButton4.removeAttribute("disabled", "disabled");
}


/**
 * Creates a button and sets its content as the options in the questions array.
 * Displays the question.
 * Gives answer buttons onclick feature to call checkAnswer function.
 * source https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified
 * source https://simplestepscode.com/javascript-quiz-tutorial/
 */
function displayQuestion(question) {
  let nextButton = document.getElementById("next-button");
  nextButton.setAttribute("disabled", "disabled");
  let questionElement = document.getElementById("question");
  let answerButton1 = document.getElementById("answer-btn-1");
  let answerButton2 = document.getElementById("answer-btn-2");
  let answerButton3 = document.getElementById("answer-btn-3");
  let answerButton4 = document.getElementById("answer-btn-4");
  questionElement.innerHTML = question.question;
  answerButton1.innerHTML = question.options[0].text;
  answerButton2.innerHTML = question.options[1].text;
  answerButton3.innerHTML = question.options[2].text;
  answerButton4.innerHTML = question.options[3].text;
  answerButton1.onclick = checkAnswer;
  answerButton2.onclick = checkAnswer;
  answerButton3.onclick = checkAnswer;
  answerButton4.onclick = checkAnswer;
}

/**
 * Checks the user's answer is correct
 * Disables the answer buttons once an answer is selected
 * Brings back the functionality of the next button once answer is selected
 * Renders next question questions using next button 
 * Once all questions have been answered, changes functionality of next button to call endQuiz function
 * @param {c} event 
 */
function checkAnswer(event) {
  let answerButton1 = document.getElementById('answer-btn-1');
  let answerButton2 = document.getElementById('answer-btn-2');
  let answerButton3 = document.getElementById('answer-btn-3');
  let answerButton4 = document.getElementById('answer-btn-4');
  let selectedButton = event.target;
  let userAnswer = selectedButton.innerHTML;
  let rightAnswer = shuffledQuestions[currentQuestionIndex].correctAnswer;
  answerButton1.setAttribute("disabled", "disabled");
  answerButton2.setAttribute("disabled", "disabled");
  answerButton3.setAttribute("disabled", "disabled");
  answerButton4.setAttribute("disabled", "disabled");
  if (userAnswer === rightAnswer) {
    selectedButton.classList.add('correct');
    incrementScore();
  } else {
    selectedButton.classList.add('incorrect');
  }
  if (answerButton1.innerText === rightAnswer) {
    answerButton1.classList.add('correct');
  } else if (answerButton2.innerText === rightAnswer) {
    answerButton2.classList.add('correct');
  } else if (answerButton3.innerText === rightAnswer) {
    answerButton3.classList.add('correct');
  } else if (answerButton4.innerText === rightAnswer) {
    answerButton4.classList.add('correct');
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    let nextButton = document.getElementById("next-button");
    nextButton.removeAttribute('disabled', '');
    currentQuestionIndex++;
  } else {
    let nextButton = document.getElementById("next-button");
    nextButton.removeAttribute('disabled', '');
    nextButton.addEventListener('click', endQuiz);
  }
}

function incrementScore() {
  let oldScore = parseInt(document.getElementById("question-score").innerText);
  document.getElementById("question-score").innerText = ++oldScore;
}

/**
 * Hides quiz section and displays results page
 * Changes heading to match content
 */
function endQuiz() {
  let quizContainer = document.getElementById("quiz-container");
  quizContainer.classList.add('hide');
  let endQuizContainer = document.getElementById("end-quiz-container");
  endQuizContainer.classList.remove('hide');
  let welcomeHeading = document.getElementById("welcome-heading");
  welcomeHeading.innerHTML = "That's it! Check out your results:";
  scoreRender();
}

/**
 * Calculates the user's final results as a percentage
 * Source: https://www.youtube.com/watch?v=49pYIMygIcU&ab_channel=KevinPowell
 */
function scoreRender() {
  let finalScore = parseInt(document.getElementById("question-score").innerText);
  let userScore = document.getElementById('score-div');
  let scorePercent = Math.round(100 * finalScore / questions.length);
  userScore.innerHTML += "<p>" + scorePercent + "%</p>";
}

/**
 * Removes hide class for start page and hides endQuiz container 
 * Reverts the heading text back to the original heading on start page
 * Resets the user's score.
 * Resets the user's % result by removing the last child of the score div: source https://www.w3schools.com/jsref/met_element_remove.asp
 */
function restartQuiz() {
  let startPage = document.getElementById("start-page");
  startPage.classList.remove('hide');
  let endQuizContainer = document.getElementById("end-quiz-container");
  endQuizContainer.classList.add('hide');
  let welcomeHeading = document.getElementById("welcome-heading");
  welcomeHeading.innerHTML = "Test your knowledge of phrasal verbs related to education and learning.";
  document.getElementById("question-score").innerHTML = 0;
  let scorePercent = document.getElementById("score-div").lastChild;
  scorePercent.remove();
  currentQuestionIndex = 0;
  let nextButton = document.getElementById("next-button");
  nextButton.removeEventListener('click', endQuiz);
}