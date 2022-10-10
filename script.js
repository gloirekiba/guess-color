const documentElement = document.documentElement;
const colorGuess = document.getElementById("colorGuess");
const colorList = document.getElementById("colorList");
const [level, score, live] = getElementsById("level", "score", "live");

const LOCAL_STORAGE_CONFIG_KEY = "config";
const LEVELS = ["easy", "medium", "hard"];
const CONFIG = getFromLocalStorage(LOCAL_STORAGE_CONFIG_KEY);
CONFIG.level = CONFIG.level || LEVELS[0];
const LIVE_DECREMENT = 1;
const SCORE_INCREMENT = difficultyToScore(CONFIG.level);

const maxLive = difficultyToMaxLive(CONFIG.level);
const maxColors = difficultyToMaxColors(CONFIG.level);

live.textContent = maxLive;
level.textContent = CONFIG.level;

const cardColors = new Array(maxColors).fill(maxColors).map((_, index) => {
  const cardColor = document.createElement("button");
  cardColor.classList.add("card-color");
  cardColor.style.backgroundColor = `var(--color-${index + 1})`;
  cardColor.addEventListener("click", checkCorrectColor);
  return cardColor;
});

colorList.append(...cardColors);

function getElementsById(...ids) {
  return ids.map((id) => document.getElementById(id));
}

function getFromLocalStorage(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : {};
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function difficultyToScore(difficulty) {
  switch (difficulty) {
    case LEVELS[0]:
      return 100;
    case LEVELS[1]:
      return 200;
    case LEVELS[2]:
      return 300;
    default:
      return 100;
  }
}

function difficultyToMaxLive(difficulty) {
  switch (difficulty) {
    case LEVELS[0]:
      return 10;
    case LEVELS[1]:
      return 5;
    case LEVELS[2]:
      return 3;
    default:
      return 10;
  }
}

function difficultyToMaxColors(difficulty) {
  switch (difficulty) {
    case LEVELS[0]:
      return 3;
    case LEVELS[1]:
      return 6;
    case LEVELS[2]:
      return 9;
    default:
      return 3;
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRGBColor() {
  const r = getRandomNumber(0, 255);
  const g = getRandomNumber(0, 255);
  const b = getRandomNumber(0, 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function changeColor() {
  const colors = new Array(maxColors).fill().map(getRGBColor);
  const correctColor = colors[getRandomNumber(0, maxColors - 1)];

  colorGuess.textContent = correctColor;

  documentElement.style.setProperty("--correctColor", correctColor);
  colors.forEach((color, index) => {
    documentElement.style.setProperty(`--color-${index + 1}`, color);
  });
}

function updateBoard(win) {
  const scoreValue = parseInt(score.textContent);
  const liveValue = parseInt(live.textContent);

  if (win) {
    score.textContent = scoreValue + SCORE_INCREMENT;
    return;
  }

  live.textContent = liveValue - LIVE_DECREMENT;

  if (isGameOver()) {
    alert("Game Over!");
    resetGame();
  }
}

function isGameOver() {
  return live.textContent === "0";
}

function resetGame() {
  score.textContent = 0;
  live.textContent = maxLive;
  startGame();
}

function checkCorrectColor(event) {
  const clickedColor = window.getComputedStyle(event.target).backgroundColor;
  const correctColor = documentElement.style.getPropertyValue("--correctColor");

  console.table({ clickedColor, correctColor });

  if (clickedColor === correctColor) {
    alert("Correct!");
    updateBoard(true);
    changeColor();
  } else {
    alert("Wrong!");
    updateBoard(false);
  }
}

function startGame() {
  changeColor();
}

startGame();
