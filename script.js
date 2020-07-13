
var startTime = document.getElementById ("start")
var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");

var secondsLeft = 10;

startTime.addEventListener("click", setTime)

function setTime() {
    mainEl.textContent = ""; 
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left";
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        sendMessage();
      }
  
    }, 1000);
  }
  function sendMessage() {
    mainEl.textContent = " you ran out of time"
  };

  




