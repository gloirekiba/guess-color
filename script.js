const documentElement = document.documentElement;
const colorGuess = document.getElementById("colorGuess");
const cardColors = document.querySelectorAll(".card-color");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const config = {
  get: () => JSON.parse(localStorage.getItem("config")) || {},
  set: (config) => localStorage.setItem("config", JSON.stringify(config)),
};

function getRGBColor() {
  const r = getRandomNumber(0, 255);
  const g = getRandomNumber(0, 255);
  const b = getRandomNumber(0, 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function changeColor() {
  const colors = new Array(9).fill().map(getRGBColor);
  const correctColor = colors[getRandomNumber(0, 8)];

  colorGuess.textContent = correctColor;

  documentElement.style.setProperty("--correctColor", correctColor);
  colors.forEach((color, index) => {
    documentElement.style.setProperty(`--color-${index + 1}`, color);
  });
}

function checkCorrectColor(event) {
  const clickedColor = window.getComputedStyle(event.target).backgroundColor;
  const correctColor = documentElement.style.getPropertyValue("--correctColor");

  console.table({ clickedColor, correctColor });

  if (clickedColor === correctColor) {
    alert("Correct!");
  } else {
    alert("Wrong!");
  }
}

cardColors.forEach((cardColor) => {
  cardColor.addEventListener("click", checkCorrectColor);
});

function startGame() {
  changeColor();
}

startGame();
