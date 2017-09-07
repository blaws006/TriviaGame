$(document).ready(function(){
 //Need 5 questions - subjects include: Hip-Hop, Anime, Comic Books, Sports, Movies
// 1. This Kendrick Lamar album was added to the Harvard University's Hiphop Archive
    //To Pimp a Butterfly, DAMN., Section .80, Good Kid mAAd City
//2. Izuku Midoriya a high school protagonist with "Quirks" in what anime?
  //My Hero Acedamia, Fullmetal Alchemist, Attack on Titan, Kill La Kill
//3. T'Challa, the king of Wankanda is also known as what superhero?
  //Black Panther, Kazar, Iron Fist, Sub-Mariner
//4. Which NFL linebacker debut as a professional wrestler in 2004?
  // Brian Urlacher, Junior Seau, Mike Ditka, Ray Lewis
//5. What Stephen King clown-based novel was made into a movie
  //IT, Dark Tower, The Shining, Stand by Me


// Needs a start screen 
// Right answer produces a right answer screen
// Wrong answer produces a wrong answer screen
// Both right answer and wrong answer screens produce right anwser w/ gif
// Screen goes to next question after question is answered or the timer runs out
// Need a setInterval function to create the timer - wrong answer if timer runs out
// Needs a screen that records number of right and wrong answers - Play Again button resets the game
  
  
  var right = 0;
  var wrong = 0;
  var questionCount = 0;
  var time = 90;
  var intervalId;
  var userAnswer;
  var questionOne = ["This Kendrick Lamar album was added to the Harvard University's Hiphop Archive", "To Pimp a Butterfly", "DAMN.", "Section .80", "Good Kid mAAd City"]
  var questionTwo = ["Izuku Midoriya is a high school protagonist with 'Quirks' in what anime?", "Fullmetal Alchemist", "My Hero Acedamia", "Attack on Titan", "Kill La Kill"]
  var questionThree = ["T'Challa, the king of Wankanda is also known as what superhero?", "Kazar", "Iron Fist", "Sub-Mariner", "Black Panther"]
  var questionFour = ["Lambeau Field is home to which NFL team?", "New Orleans Saints", "New York Giants", "Green Bay Packers", "Buffalo Bills"]
  var questionFive = ["What Stephen King clown-based novel was made into a movie",  "Dark Tower", "IT", "The Shining", "Stand by Me"]
  var allQuestions = [questionOne, questionTwo, questionThree, questionFour, questionFive]
  var answerKey = ["To Pimp a Butterfly", "My Hero Acedamia", "Black Panther", "Green Bay Packers", "IT"]
  var images = ["assets/images/Kendrick_Lamar.gif", "assets/images/Izuku.gif", "assets/images/Black_Panther.gif", "assets/images/GB.gif", "assets/images/IT.gif"]  
  var correct = false;
  $(".page-two").hide();
  $(".page-three").hide();
  $(".answer-page").hide();
  //Press play button
   $(".press-start").click(play);
  
  // When the game starts...Bring up the first question and start the timer
   //This timer will start and be the user has 90 seconds to answer the question
  function play(){
      right = 0;
      wrong = 0;
      questionCount = 0;
      time = 90;
      $(".page-two").show();
      $(".page-one").hide();
      $(".page-three").hide();
      $(".answer-page").hide();
      question();
     
  }
  //Questions in order  
function question(){
  
    if (questionCount === 5) {
    
     $(".page-two").hide();
      $(".page-one").hide();
      $(".page-three").show();
      $(".answer-page").hide();
      results();
      stop();
      time = 0;
  }
  
  else {
  $("#question").html(allQuestions[questionCount][0])
  $("#answer-one").html(allQuestions[questionCount][1])
  $("#answer-two").html(allQuestions[questionCount][2])
  $("#answer-three").html(allQuestions[questionCount][3])
  $("#answer-four").html(allQuestions[questionCount][4])
   $(".page-two").show();
      $(".page-one").hide();
      $(".page-three").hide();
      $(".answer-page").hide();
     reset();
       timer();   
  }  
  
}
    

$(".answer").click( function(event){
    
  
  console.log(this.id)
//    var answerKey = [questionOne[1], questionTwo[2], questionThree[4], questionFour[3], questionFive[2]]
//  
    if (questionCount === 0 && this.id === "answer-one") {
      right++;
      correct = true;
      rightOrWrong();
     setTimeout(question, 5000);
      setTimeout(function(){questionCount++}, 4000)
       stop();
    } 
  
    else if (questionCount === 1 && this.id === "answer-two") {
      right++;
      correct = true;
      rightOrWrong();
      setTimeout(question, 5000);
      setTimeout(function(){questionCount++}, 4000)
      stop();
    } 
     
    else if (questionCount === 2 && this.id === "answer-four") {
      right++;
      correct = true;
      rightOrWrong()
      setTimeout(question, 5000);
      setTimeout(function(){questionCount++}, 4000)
      stop();
    } 
  else if (questionCount === 3 && this.id === "answer-three") {
      right++;
    rightOrWrong();
    correct = true;
      setTimeout(question, 5000);
    setTimeout(function(){questionCount++}, 4000)
    stop();
    } 
  else if (questionCount === 4 && this.id === "answer-two") {
      right++;
    rightOrWrong();
    correct = true;
      setTimeout(question, 5000);
    setTimeout(function(){questionCount++}, 4000)
    stop();
    } 
//  
    else {
        correct = false;
        wrong++;
      rightOrWrong();
      setTimeout(question, 5000);
      setTimeout(function(){questionCount++}, 4000)
      stop();
    }

  });
  
  
  function results(){
    $("#right").html(right);
    $("#wrong").html(wrong);
  }
  
  function timer(){
    
    intervalId = setInterval(timeLeft, 1000); 
      
  }
  
  function timeLeft(){
    
    time--;
    $("#time").html(time);
    
    if(time === 0){
      wrong++;
      rightOrWrong();
      setTimeout(question, 5000);
      setTimeout(function(){questionCount++}, 4000)
      stop();
    }
    
  }
  function rightOrWrong(){
    
    if (correct === true) { 
      $("#result").html("Right!")
      $("#answerKey").html(answerKey[questionCount])
      $("#image").html("<img src='" + images[questionCount] + "'>")
      $(".page-two").hide();
      $(".page-one").hide();
      $(".page-three").hide();
      $(".answer-page").show();
      
    }
    
    
    else {
       $("#result").html("Wrong!");
      $("#answerKey").html(answerKey[questionCount]);
       $("#image").html("<img src='" + images[questionCount] + "'>")
       $(".page-two").hide();
      $(".page-one").hide();
      $(".page-three").hide();
      $(".answer-page").show();
     
    }
  }
  
  
  function stop(){
    
    clearInterval(intervalId);
  }
  
  function reset() {
    time = 90;
    $("#time").html(time)
    
  }

});