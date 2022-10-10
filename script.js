const documentElement = document.documentElement;
const colorGuess = document.getElementById("colorGuess");
const colorList = document.getElementById("colorList");
document.getElementById("newColor").addEventListener("click", changeColor);
document.getElementById("reset").addEventListener("click", resetGame);
const level = document.getElementById("level");
const [score, combo, live] = getElementsById("score", "combo", "live");

const LOCAL_STORAGE_CONFIG_KEY = "config";
const LEVELS = ["easy", "medium", "hard"];
const CONFIG = getFromLocalStorage(LOCAL_STORAGE_CONFIG_KEY);
CONFIG.level = CONFIG.level || LEVELS[0];
const LIVE_DECREMENT = 1;
const SCORE_INCREMENT = difficultyToScore(CONFIG.level);

const maxLive = difficultyToMaxLive(CONFIG.level);
const maxColors = difficultyToMaxColors(CONFIG.level);

live.textContent = maxLive;
level.value = CONFIG.level;

level.addEventListener("change", changeDifficulty);

const cardColors = new Array(maxColors).fill().map((_, index) => {
  const cardColor = document.createElement("button");
  cardColor.classList.add("card-color");
  cardColor.style.backgroundColor = `var(--color-${index + 1})`;
  cardColor.addEventListener("click", checkCorrectColor);
  return cardColor;
});

colorList.append(...cardColors);

function changeDifficulty(event) {
  const difficulty = event.target.value;
  const config = getFromLocalStorage(LOCAL_STORAGE_CONFIG_KEY);
  config.level = difficulty;
  saveToLocalStorage(LOCAL_STORAGE_CONFIG_KEY, config);
  location.reload();
}

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
  const comboValue = parseInt(combo.textContent);

  if (win) {
    score.textContent = scoreValue + SCORE_INCREMENT * comboValue;
    combo.textContent = comboValue + 1;
    return;
  }

  live.textContent = liveValue - LIVE_DECREMENT;
  combo.textContent = 1;

  if (isGameOver()) {
    alert("Game Over!");
    resetGame();
  }
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

function isGameOver() {
  return live.textContent === "0";
}

function startGame() {
  changeColor();
}

function resetGame() {
  score.textContent = 0;
  live.textContent = maxLive;
  startGame();
}

startGame();
