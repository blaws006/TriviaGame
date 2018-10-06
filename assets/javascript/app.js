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
    // Map each answer
    setQuestions: () => {
      const questionOne = new Map([
        [0, 'This Kendrick Lamar album was one of the first albums to be added to Harvard University\'s Hiphop Archive'],
        [1, 'To Pimp a Butterfly'],
        [2, 'DAMN.'],
        [3, 'Section .80'],
        [4, 'Good Kid mAAd City'],

      ]);
      const questionTwo = new Map([
        [0, 'Izuku Midoriya is a high school student with "Quirks" in what anime?'],
        [1, 'Fullmetal Alchemist'],
        [2, 'My Hero Acedamia'],
        [3, 'Attack on Titan'],
        [4, 'Kill La Kill'],

      ]);
      const questionThree = new Map([
        [0, 'T\'Challa, the king of Wankanda, is also known as what superhero?'],
        [1, 'Kazar'],
        [2, 'Iron Fist'],
        [3, 'Sub-Mariner'],
        [4, 'Black Panther'],

      ]);
      const questionFour = new Map([
        [0, 'Lambeau Field is home to which NFL team?'],
        [1, 'New Orleans Saints'],
        [2, 'New York Giants'],
        [3, 'Green Bay Packers'],
        [4, 'Buffalo Bills'],

      ]);
      const questionFive = new Map([
        [0, 'What Stephen King clown-based novel was made into a movie?'],
        [1, 'IT'],
        [2, 'Dark Tower'],
        [3, 'The Shining'],
        [4, 'Stand by Me']
      ]);
      const questions = [questionOne, questionTwo, questionThree, questionFour, questionFive]
      return questions;
    },
    answerKey: () => {
      const answers = ['To Pimp a Butterfly', 'My Hero Acedamia', 'Black Panther', 'Green Bay Packers', 'IT'];
      return answers;
    },
    imageMap: () => {
      const images = ['assets/images/Kendrick_Lamar.gif', 'assets/images/Izuku.gif', 'assets/images/Black_Panther.gif', 'assets/images/GB.gif', 'assets/images/IT.gif'];
      return images;
    }
  }
})();

// UI Controller
const UIController = (() => {

  // Makes it easier to select an html element by creating a DOMstrings object and making key-value pairs out of classes and id's
  const DOMstrings = {
    startButton: '.press-start',
    answer: '.answer',
    img: '.image',
    time: '.time',
    gameSection: '#gameSectionContainer',
    answerKey: '.answerKey',
    answerPage: '.answer-page',
    image: '.image',
    reset: '.reset'
  }

  let gamePage = document.querySelector(DOMstrings.gameSection);

  return {
    getDOMstrings: () => {
      return DOMstrings;
    },
    //Displays the main question page
    displayQuestions: (question, answerOne, answerTwo, answerThree, answerFour) => {
      const triviaPage = gamePage.innerHTML = `<div class="page-two"><div class="text-center"><h4>Time Remaining: <span class="time">90</span></h4><hr></div><div><div class="text-center" id="question"><p>${question}</p></div></div><div class="text-center"><div class="row"><div class="answer col-md-12">${answerOne}</div></div><div class="row"><div class="answer col-md-12">${answerTwo}</div></div><div class="row"><div class="answer col-md-12">${answerThree}</div></div><div class="row"><div class="answer col-md-12">${answerFour}</div></div></div></div>`;
      return triviaPage;
    },
    // Displays the active clock
    displayTime: (clock) => {
      document.querySelector(DOMstrings.time).textContent = clock;
    },
    //Displays results page after you select an answer.
    displayResult: (result, answer, image) => {
      const rightWrongPage = gamePage.innerHTML = `<div class="answer-page"><h2 class="result">${result}</h2><p>The answer is: <span class="answerKey">${answer}</span></p><div class="image text-center"><img src='${image}' /></div></div >`;
      return rightWrongPage;
    },
    // Dislpay final tally
    displayScore: (right, wrong) => {
      const scorePage = gamePage.innerHTML = `<div class="page-three"><div class="text-center"><h2>Results</h2><hr><div class="text-center"><p>Questions Right: <span class="right">${right}</span></p><p>Questions Wrong: <span class="wrong">${wrong}</span></p></div><div class="cta text-center"><button class="text-center button-style btn btn-primary btn-lg press-start" type="submit">Play Again</button></div></div></div>`;
      return scorePage;
    }
  }
})();

// App Controller
const appController = ((triviaCtrl, UICtrl) => {
  let count = 90;
  let intervalID;
  let allImages = triviaCtrl.imageMap();
  let allQuestions = triviaCtrl.setQuestions();
  let allAnswers = triviaCtrl.answerKey();
  let currentQuestion = [];
  const DOM = UICtrl.getDOMstrings();
  let right = 0;
  let wrong = 0;

  // Will control the timer countdown element
  const getTime = () => {
    count--;
    UICtrl.displayTime(count);
    evalTime();
  };

  // Will evaluate conditions on when to stop the clock
  const evalTime = () => {
    if (count === 0) {
      clearInterval(intervalID);
    }
  };

  const getResult = (userAnswer, answerKey, img) => {
    if (userAnswer === answerKey) {
      UICtrl.displayResult('Right', answerKey, img);
      setTimeout(getQNA, 5000);
      right++;
    } else {
      UICtrl.displayResult('Wrong', answerKey, img)
      setTimeout(getQNA, 5000);
      wrong++;
    }
  }
  const reset = () => {
    document.querySelector(DOM.startButton).addEventListener('click', () => {
      right = 0;
      wrong = 0;
      allImages = triviaCtrl.imageMap();
      allQuestions = triviaCtrl.setQuestions();
      allAnswers = triviaCtrl.answerKey();
      getQNA();
    });
  }
  const getQNA = () => {
    if (allAnswers.length > 0) {
      count = 90;
      intervalID = setInterval(getTime, 1000);
      let randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)]
      currentQuestion.push(randomQuestion);
      let i = allQuestions.indexOf(randomQuestion);
      let currentAnswer = allAnswers[i];
      let currentImage = allImages[i];
      if (i > -1) {
        allQuestions.splice(i, 1);
        allAnswers.splice(i, 1);
        allImages.splice(i, 1);
      }

      UICtrl.displayQuestions(currentQuestion[0].get(0), currentQuestion[0].get(1), currentQuestion[0].get(2), currentQuestion[0].get(3), currentQuestion[0].get(4));
      let answerList = document.querySelectorAll(DOM.answer);

      answerList.forEach((index, value) => {
        answerList[value].addEventListener('click', () => {

          getResult(index.innerHTML, currentAnswer, currentImage)
          count = 0;
          evalTime();
          currentQuestion.pop(randomQuestion);
         
        })
      })
    } else {
      UICtrl.displayScore(right, wrong);
      
      reset();
    }
  };

  const setupEventListeners = () => {

    document.querySelector(DOM.startButton).addEventListener('click', () =>{
      
      //Displays questions and answers
      getQNA();
    });

  };

  return {
    init: () => {
      setupEventListeners();
    }
  }
})(triviaController, UIController);

appController.init();