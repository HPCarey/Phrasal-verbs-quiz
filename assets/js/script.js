/*jshint esversion: 6 */
// define variables to select elements
let shuffledQuestions = null;
let currentQuestionIndex = null;
let selectedButton = null;

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

/**
 * runs quiz 
 * renders questions and shuffles them so the order is random
 * source:https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified
 */

function runQuiz() {
  let startPage = document.getElementById("start-page");
  startPage.classList.add('hide');
  let quizContainer = document.getElementById("quiz-container");
  quizContainer.classList.remove('hide');
  let welcomeHeading = document.getElementById("welcome-heading");
  welcomeHeading.innerHTML = "Choose the correct phrasal verb:";
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  renderQuestion();
}

function renderQuestion() {
  resetState();
  displayQuestion(shuffledQuestions[currentQuestionIndex]);
  currentQuestionIndex++;
}

/**
 * Removes the default answer buttons and replaces with the answers in question array
 * removes disabled from answer buttons once new question is rendered
 * source: https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified
 */
function resetState() {
  let nextButton = document.getElementById("next-button");
  nextButton.setAttribute('disabled', '');
  let answerButtons = document.getElementsByClassName("btn");
  console.log(answerButtons);
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
 * creates a button and sets its content as the options in the questions section.
 *  source https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified
 * marks the correct answer as correct in the HTML
 */
function displayQuestion(question) {
  let nextButton = document.getElementById("next-button");
  console.log(nextButton);
  nextButton.setAttribute("disabled", "disabled");
  let questionElement = document.getElementById("question");
  console.log(questionElement);
  let answerButton1 = document.getElementById("answer-btn-1");
  console.log(answerButton1);
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
 * checks the users answer is correct
 * disables the answer buttons once an answer is selected
 * Bring back the functionality of the next button once answer is picked
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
    currentQuestionIndex++;
  } else {
    selectedButton.classList.add('incorrect');
    if (answerButton1.innerHTML === rightAnswer) {
      answerButton1.classList.add('correct');
    } else if (answerButton2.innerHTML === rightAnswer) {
      answerButton2.classList.add('correct');
    } else if (answerButton3.innerHTML === rightAnswer) {
      answerButton3.classList.add('correct');
    } else if (answerButton4.innerHTML === rightAnswer) {
      answerButton4.classList.add('correct');
    }
  }

  let nextButton = document.getElementById("next-button");
  nextButton.removeAttribute("disabled", "disabled");
}



/**
 * shows colour change to indicate correct/incorrect answer input from user
 * source: https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified
 */
/* function setStatusClass(element, correct) {
  clearStatusClass(element);
   if (correct) {
     clearStatusClass(element);
     if (correct) {
       element.classList.add('correct');
       incrementScore();
     } else {
       element.classList.add('incorrect');
     }
   }
 }*/

function clearStatusClass() {
}
  


function incrementScore() {
  let oldScore = parseInt(document.getElementById("question-score").innerText);
  document.getElementById("question-score").innerText = ++oldScore;

}

function endQuiz() {
  let quizContainer = document.getElementById("quiz-container");
  quizContainer.classList.add('hide');
  let endQuizContainer = document.getElementById("end-quiz-container");
  endQuizContainer.classList.remove('hide');
  let welcomeHeading = document.getElementById("welcome-heading");
  welcomeHeading.innerHTML = "That's it! Check out your results:";
}

function restartQuiz() {
  let startPage = document.getElementById("start-page");
  startPage.classList.remove('hide');
  let endQuizContainer = document.getElementById("end-quiz-container");
  endQuizContainer.classList.add('hide');
  let welcomeHeading = document.getElementById("welcome-heading");
  welcomeHeading.innerHTML = "Test your knowledge of phrasal verbs related to education and learning.";

}