const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
const coins = document.getElementById("coins");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");

let playerX = gameContainer.clientWidth / 2;
let playerY = gameContainer.clientHeight / 2;
let score = 0;
let timeLeft = 30;

function movePlayer(x, y) {
  playerX += x;
  playerY += y;
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
}

function generateCoin() {
  const coin = document.createElement("div");
  coin.className = "coin";
  const randomX = Math.floor(Math.random() * (gameContainer.clientWidth - 30));
  const randomY = Math.floor(Math.random() * (gameContainer.clientHeight - 30));
  coin.style.left = randomX + "px";
  coin.style.top = randomY + "px";
  coins.appendChild(coin);
  coin.addEventListener("click", () => collectCoin(coin));
}

function collectCoin(coin) {
  coins.removeChild(coin);
  score++;
  scoreDisplay.textContent = score;
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;
  if (timeLeft === 0) {
    clearInterval(gameInterval);
    alert("Game Over! Your Score: " + score);
    resetGame();
  }
}

function resetGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  while (coins.firstChild) {
    coins.removeChild(coins.firstChild);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && playerX < gameContainer.clientWidth - 50) {
    movePlayer(10, 0);
  } else if (event.key === "ArrowLeft" && playerX > 0) {
    movePlayer(-10, 0);
  } else if (event.key === "ArrowDown" && playerY < gameContainer.clientHeight - 50) {
    movePlayer(0, 10);
  } else if (event.key === "ArrowUp" && playerY > 0) {
    movePlayer(0, -10);
  }
});

let gameInterval = setInterval(generateCoin, 1500);
let timerInterval = setInterval(updateTimer, 1000);
