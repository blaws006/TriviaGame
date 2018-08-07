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

  return {
    setQuestionOne: () => {
      const questionOne = new Map([
        [0, 'This Kendrick Lamar album was one of the first albums to be added to Harvard University\'s Hiphop Archive'],
        [1, 'To Pimp a Butterfly'],
        [2, 'DAMN.'],
        [3, 'Section .80'],
        [4, 'Good Kid mAAd City']
      ]);

      return questionOne;
    },
    setQuestionTwo: () => {
      const questionTwo = new Map([
        [0, 'Izuku Midoriya is a high school protagonist with "Quirks" in what anime?'],
        [1, 'Fullmetal Alchemist'],
        [2, 'My Hero Acedamia'],
        [3, 'Attack on Titan'],
        [4, 'Kill La Kill']
      ]);

      return questionTwo;
    },
    setQuestionThree: () => {
      const questionThree = new Map([
        [0, 'T\'Challa, the king of Wankanda, is also known as what superhero?'],
        [1, 'Kazar'],
        [2, 'Iron Fist'],
        [3, 'Sub-Mariner'],
        [4, 'Black Panther']
      ]);

      return questionThree;
    },
    setQuestionFour: () => {
      const questionFour = new Map([
        [0, 'Lambeau Field is home to which NFL team?'],
        [1, 'New Orleans Saints'],
        [2, 'New York Giants'],
        [3, 'Green Bay Packers'],
        [4, 'Buffalo Bills']
      ]);

      return questionFour;
    },
    setQuestionFive: () => {
      const questionFive = new Map([
        [0, 'What Stephen King clown-based novel was made into a movie?'],
        [1, 'IT'],
        [2, 'Dark Tower'],
        [3, 'The Shining'],
        [4, 'Stand by Me']
      ]);

      return questionFive;
    }
  }
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
      const startPage = document.querySelector(DOMstrings.gameSection);
      const triviaPage = startPage.innerHTML = `<div class="page-two"><div class="text-center"><h4>Time Remaining: <span class="time">90</span></h4><hr></div><div><div class="text-center" id="question"><p></p></div></div><div class="text-center"><div class="row"><div class=" answer col-md-12"></div></div><div class="row"><div class="answer col-md-12"></div></div><div class="row"><div class="answer col-md-12"></div></div><div class="row"><div class="answer col-md-12"></div></div></div></div>`;
      return triviaPage;
    },
    displayTime: (clock) => {
      document.querySelector(DOMstrings.time).textContent = clock;
    }
  }
  // Display trivia pages
  // Display right/wrong answer page
  // Dislpay final tally
  // Display timer and reset after each question
})();

// App Controller

const appController = ((triviaCtrl, UICtrl) => {
  var count = 5;
  var intervalID;

  const getTime = () => {
    count--;
    UICtrl.displayTime(count);
    evalTime();
  };

  const evalTime = () => {
    if (count === 0) {
      clearInterval(intervalID);
      console.log(count);
    }
  };

  const getQNA = () => {
    console.log(triviaCtrl.setQuestionOne());
    console.log(triviaCtrl.setQuestionTwo());
    console.log(triviaCtrl.setQuestionThree());
    console.log(triviaCtrl.setQuestionFour());
    console.log(triviaCtrl.setQuestionFive());
  };

  const setupEventListeners = () => {
    const DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.startButton).addEventListener('click', () => {
      UICtrl.displayQuestions();
      intervalID = setInterval(getTime, 1000);
    });
  };
  return {
    init: () => {
      setupEventListeners();
      getQNA();
    }
  }
})(triviaController, UIController);

appController.init();
