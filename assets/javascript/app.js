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
      const images = ['assets/images/Kendrick_Lamar.gif', 'assets/images/Izuku.gif', 'assets/images/Black_Panther.gif', 'assets/images/GB.gif', 'assets/images/IT.gif'
      ];
      return images;
    }
  }
})();

// UI Controller
const UIController = (() => {

  // Makes it easier to select an html element by creating a DOMstrings object and making key-value pairs out of classes and id's
  const DOMstrings = {
    startButton: '#press-start',
    answer: '.answer',
    img: '.image',
    time: '.time',
    gameSection: '#gameSectionContainer',
    answerKey: '.answerKey',
    answerPage: '.answer-page',
    image: '.image'
  }

  return {
    getDOMstrings: () => {
      return DOMstrings;
    },
    //Displays the main question page
    displayQuestions: (question, answerOne, answerTwo, answerThree, answerFour) => {
      const gamePage = document.querySelector(DOMstrings.gameSection);
      const triviaPage = gamePage.innerHTML = `<div class="page-two"><div class="text-center"><h4>Time Remaining: <span class="time">90</span></h4><hr></div><div><div class="text-center" id="question"><p>${question}</p></div></div><div class="text-center"><div class="row"><div class="answer col-md-12">${answerOne}</div></div><div class="row"><div class="answer col-md-12">${answerTwo}</div></div><div class="row"><div class="answer col-md-12">${answerThree}</div></div><div class="row"><div class="answer col-md-12">${answerFour}</div></div></div></div>`;
      return triviaPage;
    },
    // Displays the active clock
    displayTime: (clock) => {
      document.querySelector(DOMstrings.time).textContent = clock;
    },
    //Displays results page after you select an answer.
    displayResult: (result, answer, image) => {
      const gamePage = document.querySelector(DOMstrings.gameSection);
      const rightWrongPage = gamePage.innerHTML = `<div class="answer-page"><h2 class="result">${result}</h2><p>The answer is: <span class="answerKey">${answer}</span></p><div class="image text-center"><img src='${image}' /></div></div >`
      return rightWrongPage;
    }
  }
  // Display trivia pages
  // Display right/wrong answer page
  // Dislpay final tally
  // Display timer and reset after each question
})();

// App Controller

const appController = ((triviaCtrl, UICtrl) => {
  let count = 90;
  let intervalID;
  let allQuestions = triviaCtrl.setQuestions();
  let allAnswers = triviaCtrl.answerKey();
  let currentQuestion = [];
  const DOM = UICtrl.getDOMstrings();

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
      console.log(count);
    }
  };


  const getResult = (userAnswer, answerKey, img) => {
    if (userAnswer === answerKey) {
      UICtrl.displayResult('Right', answerKey, img) 
    } else {
      UICtrl.displayResult('Wrong', answerKey, img)
    }
  }

  const getQNA = () => {
    intervalID = setInterval(getTime, 1000);
    let randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)]
    currentQuestion.push(randomQuestion);
    let i = allQuestions.indexOf(randomQuestion); 
    let currentAnswer = allAnswers[i];
    if (i > -1) {
      allQuestions.splice(i, 1);
      allAnswers.splice(i, 1);
    }
    UICtrl.displayQuestions(currentQuestion[0].get(0), currentQuestion[0].get(1), currentQuestion[0].get(2), currentQuestion[0].get(3), currentQuestion[0].get(4));
    console.log(allAnswers);
    console.log(allQuestions);
    let answerList = document.querySelectorAll(DOM.answer);
    
    answerList.forEach((index, value) => {
      answerList[value].addEventListener('click', () => {
        console.log(triviaCtrl.imageMap()[i])
        getResult(index.innerHTML, currentAnswer, triviaCtrl.imageMap()[i])
        count = 0;
        evalTime();
        /* console.log(index.innerHTML);
        console.log(currentAnswer); */
      })
    })

  };

  const setupEventListeners = () => {

    document.querySelector(DOM.startButton).addEventListener('click', () => {
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