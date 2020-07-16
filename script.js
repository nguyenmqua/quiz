var body = document.body

var container = document.createElement ("div")
var QuestionEl = document.createElement("h2");
var choicesEl = document.createElement("div");
var button1 = document.createElement("button");
var button2  = document.createElement("button");
var button3 = document.createElement("button");
var button4 = document.createElement("button");
var startButton = document.createElement("button");
var controls = document.createElement("div")
var secondTimerEl = document.createElement ("h3")





//setAtrribute
startButton.setAttribute ("id", "start");
QuestionEl.setAttribute("id", "question");
QuestionEl.textContent = "Lets test your coding knowledge out! For every question you click correct, one point will be added. If wrong, time will be deducted. You have 30 seconds. Go!"
startButton.textContent = "Start";
secondTimerEl.setAttribute ("class", "time")


//apphend to the start page

body.appendChild(controls)
controls.appendChild(startButton);
controls.appendChild(secondTimerEl);
body.appendChild(QuestionEl);
body.appendChild(choicesEl);

var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var startTime = document.getElementById ("start");
var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");


var questionCounter = 0;
var currentQuestion = {};
var score = 0;
var availablequestions = [];



var myQuestions = [
  {
      question: 'Inside which HTML element do we put the JavaScript??',
      answers: [
        {text: '<script>', correct: true},
        {text: '<javascript>', correct: false} ,
        {text: '<js>', correct: false},
        {text: '<scripting>', correct: false},
      ]
    },
    {
      question: 'Will you work?',
      answers: [
        {text: '<script>', correct: true},
        {text: '<javascript>', correct: false}, 
        {text: '<js>', correct: false},
        {text: '<scripting>', correct: false}, 
      ]
    }
    
]
  

var secondsLeft = 10;

startTime.addEventListener("click", setTime )
startTime.addEventListener("click", startGame)

function setTime(event) {

  var element = document.getElementById("start");
    element.parentNode.removeChild(startButton);

  QuestionEl.textContent = "";
    timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left";
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        sendMessage();
      }
    }, 1000);
  }
  function sendMessage() {
    timeEl.textContent = " you ran out of time"
}
 
  ;

function startGame () {
  questionCounter = 0;
  score = 0;
  availablequestions = [...myQuestions];
  console.log (availablequestions);
  getNewQuestion()
};

function getNewQuestion(question){
  questionCounter ++;
  var questionIndex = Math.floor(Math.random()* availablequestions.length);
  currentQuestion = availablequestions[questionIndex];
  QuestionEl.textContent = currentQuestion.question;


  currentQuestion.answers.forEach(answer => {
    var button = document.createElement('button')
    button.textContent = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    choicesEl.appendChild(button)

  })};

  function selectAnswer (e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    console.log(correct)
  }

  function setStatusClass (element)
