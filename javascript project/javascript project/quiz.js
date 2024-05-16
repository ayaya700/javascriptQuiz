class Question {
  constructor(q, a) {
    this.question = q;
    this.answers = a;
  }
}
class Answer {
  constructor(a, f) {
    this.answer = a;
    this.flag = f;
  }
}
var questions = [];
var questionarray;
var answerArray = [];
var currentIndex = 0;
this.selectedValue = [];

var resp;
var markedQuestions = [];
let api = new XMLHttpRequest();
api.open("GET", "questions.json");
api.send();
api.onreadystatechange = () => {
  if (api.readyState == 4) {
    const response = JSON.parse(api.responseText);
    resp = response.slice(0, 10);
    shuffle(resp);
    console.log(resp);
    for (let i = 0; i < resp.length; i++) {
      var ans = [
        new Answer(resp[i].A, resp[i].answer == "A" ? true : false),
        new Answer(resp[i].B, resp[i].answer == "B" ? true : false),
        new Answer(resp[i].C, resp[i].answer == "C" ? true : false),
        new Answer(resp[i].D, resp[i].answer == "D" ? true : false),
      ];
      questions[i] = new Question(resp[i].question, ans);
    }
    display(questions);
  }
};

function prev() {
  if (currentIndex >= 0) {
    currentIndex--;
    display(questionarray);
  }
}
function next() {
  if (currentIndex < 10) {
    currentIndex++;
    display(questionarray);
  }
}
var counter = -1;

function display(arr) {
  questionarray = arr;

  var container = `<p id="scoreContainer">Question ${
    parseInt(currentIndex) + 1
  }   <p> </br>${questions[currentIndex].question}</p>
  
<div id="option_container">
  <div id="option">
  <input onclick="calcAnswer(this)" id="0" type="radio" name="option"
  ${selectedValue[currentIndex] === "0" ? "checked" : ""} required>
    <label for="option-1">
    ${questions[currentIndex].answers[0].answer}
    </label>
    </div>
    <div id="option">
    <input onclick="calcAnswer(this)" id="1" type="radio" name="option"
    ${selectedValue[currentIndex] === "1" ? "checked" : ""}   required>
    <label for="option-2"   >
    ${questions[currentIndex].answers[1].answer}
    </label>
    </div>
    <div id="option">
    <input onclick="calcAnswer(this)" id="2" type="radio" name="option" 
    ${selectedValue[currentIndex] === "2" ? "checked" : ""} required>
    <label for="option-3">
    ${questions[currentIndex].answers[2].answer}
    </label>
    </div>
    <div id="option">
    <input onclick="calcAnswer(this)" id="3" type="radio" name="option" 
    ${selectedValue[currentIndex] === "3" ? "checked" : ""}
    required>
    <label for="option-4">
    ${questions[currentIndex].answers[3].answer}
    </label>
    </div>
    </div>
    <div id="btn-container">
    <button onclick="prev()" id="prev">prev</button>
    <button id="submit" type="submit" onClick="myfunction()">submit</button>
    <button onclick="next(this)" id="next">Next</button>
    </div>
    <div id="safeTimerDisplay"></div>
     <button  id="markBtn">mark</button>

    </div> `;

  document.getElementById("quiz_form_container").innerHTML = container;
  if (currentIndex == 0) {
    document.getElementById("prev").style.visibility = "hidden";
  } else {
    document.getElementById("prev").style.visibility = "visible";
  }

  if (currentIndex == 9) {
    document.getElementById("next").style.visibility = "hidden";
  } else {
    document.getElementById("next").style.visibility = "visible";
  }

  document.getElementById("markBtn").addEventListener("click", function () {
    counter = 0;
    for (const key in markedQuestions) {
      if (markedQuestions[key] == currentIndex) {
        counter++;
      }
    }

    if (counter == 0) {
      markedQuestions.push(currentIndex);
      document.getElementById("markerContainer").innerHTML += `
      <div id="memo">
      <button id="${currentIndex}" onclick="getQuestion(this)"> Question${
        currentIndex + 1
      }
      </button>
      <span id="${currentIndex}" onclick="deleteMark(this)" class="material-symbols-outlined"> delete </span>
      </div>
      `;
    }
  });
}
function calcAnswer(x) {
  answerArray[currentIndex] = questions[currentIndex].answers[x.id].flag;
  selectedValue[currentIndex] = x.id;
  console.log(x.id);
  console.log(answerArray);
}
function getQuestion(x) {
  currentIndex = x.id;
  display(questionarray);
}

function deleteMark(x) {
  x.parentElement.remove();
  counter = 0;
  for (const key in markedQuestions) {
    if (markedQuestions[key] == x.id) {
      markedQuestions.splice(key, 1);
    }
  }
}
var markCounter = 0;
function myfunction() {
  let markCounter = 0;
  for (let index = 0; index < questions.length; index++) {
    if (answerArray[index] === true) {
      markCounter++;
    }
  }
  localStorage.setItem("score", `${markCounter}`);
  location.replace("submit.html");
}
function timer() {
  var sec = 0;
  var min = 1;
  var timer = setInterval(function () {
    if (sec < 10) {
      document.getElementById("safeTimerDisplay").innerHTML =
        "0" + min + ":0" + sec;
    } else {
      document.getElementById("safeTimerDisplay").innerHTML =
        "0" + min + ":" + sec;
    }
    if (min == 0 && sec == 0) {
      clearInterval(timer);
      localStorage.setItem("score", `${markCounter}`);
      location.replace("timeOut.html");
    }
    if (sec == 0) {
      min--;
      sec = 59;
    }

    sec--;
  }, 1000);
}

timer();

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

var MarkCont = document.getElementById("mark_container");

var MarkCont2 = document.getElementById("mark_container2");
