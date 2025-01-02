const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playerNameInput = document.getElementById("player-name");
const startButton = document.getElementById("start-game-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const complimentMessage = document.getElementById("compliment-message");
const errorMessage = document.getElementById("error-message");

let snake = [{ x: 10, y: 10 }];
let snakeLength = 1;
let direction = 'RIGHT';
let food = { x: 15, y: 15 };
let score = 0;
let gameInterval;
let isGameOver = false;
let gameSpeed = 200;

const validNames = ["Junaid Nazar", "JUNAID NAZAR", "junaid nazar", "junaid"];
const compliments = [
    "Mr. Junaid Nazar, you are an inspiration to everyone around you!",
    "Your wisdom and guidance have truly shaped the minds of your students, Mr. Junaid Nazar.",
    "Mr. Junaid Nazar, your dedication to teaching is unmatched.",
    "You make learning fun and impactful, Mr. Junaid Nazar!",
    "Your hard work and commitment to your students don't go unnoticed, Mr. Junaid Nazar.",
    "Mr. Junaid Nazar, your passion for teaching is truly admirable.",
    "The way you explain concepts makes even the most challenging topics seem easy, Mr. Junaid Nazar.",
    "Your enthusiasm and energy are contagious, Mr. Junaid Nazar!",
    "Mr. Junaid Nazar, your encouragement and support motivate us to do our best.",
    "You are a remarkable teacher, Mr. Junaid Nazar, and we are lucky to learn from you!"
];

function startGame() {
    const playerName = playerNameInput.value.trim();
    if (validNames.includes(playerName)) {
        welcomeScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");
        startGameLogic();
    } else {
        errorMessage.textContent = "Sorry, this game is only for Sir. Junaid Nazar";
    }
}

function startGameLogic() {
    document.addEventListener("keydown", changeDirection);
    isGameOver = false;
    snake = [{x: 10, y: 10}];
    snakeLength = 1;
    score = 0;
    direction = 'RIGHT';
    gameSpeed = 200; // Reset speed to initial value
    startGameInterval();
}

function startGameInterval() {
    clearInterval(gameInterval); // Clear any existing interval
    gameInterval = setInterval(gameLoop, gameSpeed);
}

function gameLoop() {
    if (isGameOver) return;
    moveSnake();
    if (checkCollision()) {
        gameOver();
        return;
    }
    if (eatFood()) {
        score += 10;
        generateFood();
    }
    drawGame();
}
function moveSnake() {
    let head = {...snake[0]};
    if (direction === 'UP') head.y -= 1;
    if (direction === 'DOWN') head.y += 1;
    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'RIGHT') head.x += 1;
    snake.unshift(head);
    if (snake.length > snakeLength) {
        snake.pop();
    }
}
function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}
function checkCollision() {
    let head = snake[0];
    if (head.x < 0 || head.x >= canvas.width / 10 || head.y < 0 || head.y >= canvas.height / 10) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}
function eatFood() {
    let head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        snakeLength++;
        increaseSpeed(); // Increase speed when food is eaten
        return true;
    }
    return false;
}
function increaseSpeed() {
    gameSpeed = Math.max(50, gameSpeed * 0.90); 
    startGameInterval(); // Restart the game loop with the new speed
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / 10)),
        y: Math.floor(Math.random() * (canvas.height / 10))
    };
}
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "green" : "lightgreen";
        ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
    });
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 10);
}
function gameOver() {
    clearInterval(gameInterval);
    gameOverScreen.classList.remove("hidden");
    let randomMessage = compliments[Math.floor(Math.random() * compliments.length)];
    complimentMessage.textContent = randomMessage;
}
function restartGame() {
    gameOverScreen.classList.add("hidden");
    startGameLogic();
}
startButton.addEventListener("click", startGame);
