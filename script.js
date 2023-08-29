const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const scoreContainer = document.getElementById("score-container");
const finalScoreEl = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");

const quizData = [
    {
        question: "What is the square root of 81?",
        options: ["7", "9", "orange", "13"],
        answer: 1
    },
    {
        question: "What is the best video game of the last decade?",
        options: ["Baldur's Gate 3", "Roblox", "Assassin's Creed", "Destiny"],
        answer: 0
    },
    {
        question: "Where does the Muffin Man live?",
        options: ["221B Baker Street", "Rancho Cucamonga", "Pleasantville", "Drury Lane"],
        answer: 3
    },
    {
        question: "What is the longest recorded flight of a chicken?",
        options: ["10 secs", "3 mins", "13 secs", "some say he's still up there"],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

function startQuiz() {
    startBtn.style.display = "none";
    timerInterval = setInterval(updateTimer, 1000);
    loadQuestion();
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerEl.textContent = timeLeft;
    } else {
        clearInterval(timerInterval);
        endQuiz();
    }
}

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    optionsEl.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const optionBtn = document.createElement("button");
        optionBtn.textContent = option;
        optionBtn.addEventListener("click", () => checkAnswer(index));
        optionsEl.appendChild(optionBtn);
    });

    resultEl.textContent = ""; 
    //nextBtn.style.display = "none";
}

function checkAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedIndex === currentQuestion.answer) {
        resultEl.textContent = "Correct!";
    } else {
        resultEl.textContent = "Wrong! -10 seconds";
        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        timerEl.textContent = timeLeft;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}
function saveScore() {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
        const scores = JSON.parse(localStorage.getItem("scores")) || [];
        scores.push({ initials, score: timeLeft });
        localStorage.setItem("scores", JSON.stringify(scores));

        displayHighScores(scores);

        localStorage.setItem("previousScore", JSON.stringify(timeLeft));
}
function displayHighScores(scores) {
    const highScoresList = document.getElementById("score-container");
    highScoresList.innerHTML = ""; 

    scores.forEach(score => {
        const listItem = document.createElement("li");
        listItem.textContent = score.initials + ": " + score.score;
        highScoresList.appendChild(listItem);
    });
    scoreContainer.style.display = "block";
}
} 

function endQuiz() {
    clearInterval(timerInterval);
    questionEl.textContent = "Quiz Over!";
    optionsEl.innerHTML = "";
    scoreContainer.style.display = "block";
    finalScoreEl.textContent = timeLeft;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    timeLeft = 60;
    timerEl.textContent = timeLeft;
    scoreContainer.style.display = "none";
    startQuiz();
}

const previousScore = JSON.parse(localStorage.getItem("previousScore")) || null;
if (previousScore !== null) {
    const previousScoreDisplay = document.getElementById("previous-score");
    previousScoreDisplay.textContent = "Previous Score " + previousScore;
   previousScoreDisplay.style.display = "block"; 
}

restartBtn.addEventListener("click",
restartQuiz);
startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", saveScore);
