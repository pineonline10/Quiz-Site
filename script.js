const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const scoreContainer = document.getElementById("score-container");
const finalScoreEl = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitBtn = document.getElementById("submitBtn");

const quizData = [
    // Add your quiz questions and answers here
    {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        answer: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Earth", "Venus", "Jupiter"],
        answer: 0
    },
    {
        question: "In which year did World War II end?",
        options: ["1941", "1945", "1939", "1950"],
        answer: 1
    },
    // Add more questions as needed
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
    // Load and display question logic
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    optionsEl.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const optionBtn = document.createElement("button");
        optionBtn.textContent = option;
        optionBtn.addEventListener("click", () => checkAnswer(index));
        optionsEl.appendChild(optionBtn);
    });

    resultEl.textContent = ""; // Clear any previous result messages
    nextBtn.style.display = "none";
}

function checkAnswer(selectedIndex) {
    // Check answer logic
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedIndex === currentQuestion.answer) {
        resultEl.textContent = "Correct!";
    } else {
        resultEl.textContent = "Wrong! -10 seconds";
        timeLeft -= 10; // Subtract 10 seconds for incorrect answer
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        timerElement.textContent = timeLeft;
    }
    nextBtn.style.display = "block";
}
function saveScore() {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
        const scores = JSON.parse(localStorage.getItem("scores")) || [];
        scores.push({ initials, score: timeLeft });
        localStorage.setItem("scores", JSON.stringify(scores));

        // Display high scores (optional)
        // const highScoresList = document.getElementById("high-scores-list");
        // highScoresList.innerHTML = scores.map(score => `<li>${score.initials}: ${score.score}</li>`).join("");
    }
}

function endQuiz() {
    // End quiz logic
}

startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", saveScore);
