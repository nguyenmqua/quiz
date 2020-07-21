var body = document.body

var container = document.createElement ("div")
var QuestionEl = document.createElement("h2");
var choicesEl = document.createElement("div");
var startButton = document.createElement("button");
var controls = document.createElement("div")
var secondTimerEl = document.createElement ("h3")
var scoreBoardEl = document.createElement("div")
var highscoreEl = document.createElement("div")
var highscoreFormEl = document.createElement ("form");
var highscoreLabel = document.createElement("label");
var inputField = document.createElement("input");
var highScoreList = document.createElement("ul")
var buttonTags = document.querySelectorAll("button");

body.appendChild(container)
body.appendChild(controls)
controls.appendChild(secondTimerEl);
container.appendChild(QuestionEl);
container.appendChild(choicesEl);
container.appendChild(startButton);


startButton.setAttribute ("id", "start");
QuestionEl.setAttribute("id", "question");
QuestionEl.textContent = "Lets test your coding knowledge out! For every question you click correct, one point will be added. If wrong, time will be deducted. You have 30 seconds. Go!"
startButton.textContent = "Start";
secondTimerEl.setAttribute ("class", "time")

body.setAttribute("style","background:#32527b; padding: 0; margin:0; display: flex; width:100vw; height: 100vh; justify-content: center; align-items: center;")
container.setAttribute("style", "width:800; max-width:80%; background-color: white; border-radius:5px; padding:10px; box-shadow: 0 0 10px 2px");
controls.setAttribute("style", "width:800;position: absolute; right:5px; top: 5px; max-width:80%; background-color: white; border-radius:5px; padding:5px; box-shadow: 0 0 10px 2px; text-align:center");
scoreBoardEl.setAttribute("style", "width:800;position: absolute; left:5px; top: 5px; max-width:80%; background-color: white; border-radius:5px; padding:10px; box-shadow: 0 0 10px 2px");
choicesEl.setAttribute("style", 'display:grid; grid-template-columns: repeat(2,auto);gap:10px;margin:20px 0;');
startButton.setAttribute("style", "border-radius: 5px; background:#32527b, color: white, padding: 5px; align: center")



var questionCounter = 0
var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var startTime = document.getElementById ("start");
var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");


var currentQuestion = {};
var score = 0;
var availablequestions = [];



var myQuestions = [
  {
      question: 'Inside which HTML element do we put the JavaScript??',
      answers: [
        {text: '<script>', correct: true},
        {text: '<javascript>', correct: false},
        {text: '<js>', correct: false},
        {text: '<scripting>', correct: false},
      ]
    },
    {
      question: 'What does HTML stand for ',
      answers: [
        {text: 'Hard Tatic Markingup Language', correct: false},
        {text: 'Hypertext Markup Language', correct: true}, 
        {text: 'Hanging Text Makingup Letter', correct: false},
        {text: 'Hemming tail Make Letters', correct: false}, 
      ]
    },
    {
      question: 'What does CSS stand for?',
      answers: [
        {text: 'Colliding Situtionary Stands', correct: false},
        {text: 'Collapsing Sliding Standards', correct: false}, 
        {text: 'Columns Standard Styles', correct: false},
        {text: 'Cascading Style Sheets', correct: true}, 
      ]
    },
    {
      question: 'What is the selector for a class?',
      answers: [
        {text: '?', correct: false},
        {text: '/', correct: false}, 
        {text: '#', correct: false},
        {text: '.', correct: true}, 
      ]
    },
    {
      question: 'What is the selctor for a id?',
      answers: [
        {text: '?', correct: false},
        {text: '/', correct: false}, 
        {text: '#', correct: true},
        {text: '.', correct: false}, 
      ]
    }
   
]
  

var secondsLeft = 100;

startTime.addEventListener("click", setTime )
startTime.addEventListener("click", startGame)

function setTime(event) {
  var element = document.getElementById("start");
  element.parentNode.removeChild(startButton);
  QuestionEl.textContent = "";
    timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft +
       " seconds left";
      if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        finalScore();
      }
    }, 1000);
  }
 

function startGame () {
  score = 0;
  availablequestions = [...myQuestions];
  nextQuestion()
};

function nextQuestion(){
  questionCounter ++;
  localStorage.setItem("mostRecentScore", score)
  var questionIndex = Math.floor(Math.random()* availablequestions.length);
  currentQuestion = availablequestions[questionIndex];
  availablequestions.splice(questionIndex, 1);
    
  if (questionCounter > myQuestions.length) {
    finalScore() 
  }
  else {getNewQuestion()}
  
}


function getNewQuestion(question){
  QuestionEl.textContent = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    button = document.createElement('button')
    button.textContent = answer.text
    button.setAttribute("id", "answers")
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    choicesEl.appendChild(button)
    choicesEl.setAttribute('id','choices')

  })};


  function selectAnswer (e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    if (correct){
      score ++
     } else {
      secondsLeft--
    }
    
    var totalScore = document.createElement("h3");
    scoreBoardEl.textContent = "Score";
    totalScore.textContent = score;
    body.appendChild(scoreBoardEl);
    scoreBoardEl.appendChild(totalScore);
    nextQuestion()
    resetState()
  }

function resetState(getNewQuestion){
  for (i = 0; i < 4; i++){
  var item = document.getElementById("answers");
  item.parentNode.removeChild(item);
}}

function finalScore (){
  clearInterval(timerInterval)
  HighScore = document.createElement("div");
  container.appendChild(HighScore);
  HighScore.setAttribute('id',"highscoreDiv")
  var hsForm = document.createElement("form");
  hsForm.setAttribute("id","highscoreForm");
  HighScore.appendChild(hsForm)
  var highscoreLabel = document.createElement("label");
  highscoreLabel.setAttribute("for", "labelText");
  highscoreLabel.setAttribute("id", "finalScore")
  
  hsForm.appendChild(highscoreLabel);
  var inputField = document.createElement("input");
  inputField.setAttribute("type","text");
  inputField.setAttribute("placeholder","Enter Name");
  inputField.setAttribute("name","input-text");
  inputField.setAttribute("id","input-text");
  hsForm.appendChild(inputField);
  var hsList = document.createElement("ul")
  hsList.setAttribute('id','highscoreList')
  hsForm.appendChild(hsList);
  QuestionEl.textContent = "Let's see how ya did";
  


var username = document.querySelector("#input-text");
var saveScore = document.querySelector("#highscoreForm");
var finalScore = document.getElementById('finalScore');
 mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const maxScore = 5;

finalScore.innerText = mostRecentScore + " points";

saveScore.addEventListener("submit", function (event){
  event.preventDefault();
SaveHighScore = e => {
  e.preventDefault()}

const score = {
  score: mostRecentScore,
  name: username.value
};

highScores.push(score);
highScores.sort((a,b) => b.score - a.score);
highScores.splice(5)

localStorage.setItem("highScores", JSON.stringify(highScores));


for (var i = 0; i < highScores.length; i++) {
    QuestionEl.textContent = "High Score:"
    var displayScore = highScores[i].score;
    var displayName = highScores[i].name;
    var li = document.createElement("li");
    li.textContent = "Score: " + displayScore + " Username: " +  displayName;
    hsForm.appendChild(li);
    } 
    username.disabled = true;
})}

function Reload(){
  window.location.reload()
}

  
