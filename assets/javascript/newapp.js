// Needs a start screen 
// Right answer produces a right answer screen
// Wrong answer produces a wrong answer screen
// Both right answer and wrong answer screens produce right anwser w/ gif
// Screen goes to next question after question is answered or the timer runs out
// Need a setInterval function to create the timer - wrong answer if timer runs out
// Needs a screen that records number of right and wrong answers - Play Again button resets the game

// NEW Challenges
// Let's write this in ES6 and convert everything to the modular pattern!

// Trivia Controller
const triviaController = (() => {
  // Map each answer
  // Hold right or wrong answer data
})();

// UI Controller
const UIController = (() => {
  const DOMstrings = {
    startButton: '#press-start',
    answerOne: '.answer-one',
    answerTwo: '.answer-two',
    answerThree: '.answer-three',
    answerFour: '.answer-four',
    img: '.image',
    time: '.time',
    gameSection: '#gameSectionContainer'
  }

  return {
    getDOMstrings: () => {
      return DOMstrings;
    },
    displayQuestions: () => {
      const startPage = document.querySelector(DOMstrings.gameSection)
      const triviaPage = startPage.innerHTML = `<div class="page-two"><div class="text-center"><h4>Time Remaining: <span class="time">0:00</span></h4><hr></div><div><div class="text-center" id="question"><p></p></div></div><div class="text-center"><div class="row"><div class=" answer col-md-12"></div></div><div class="row"><div class="answer col-md-12"></div></div><div class="row"><div class="answer col-md-12"></div></div><div class="row"><div class="answer col-md-12"></div></div></div></div>`;
      return triviaPage
    }
  }
  // Display trivia pages
  // Display right/wrong answer page
  // Dislpay final tally
  // Display timer and reset after each question
})();

// App Controller

const appController = ((triviaCtrl, UICtrl) => {

  const setupEventListeners = () => {
    const DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.startButton).addEventListener('click', () => {
      UICtrl.displayQuestions();
    });
  }
  return {
    init: () => {
      setupEventListeners();
    }
  }
})(triviaController, UIController);

appController.init();