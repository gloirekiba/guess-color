const documentElement = document.documentElement;
const colorGuess = document.getElementById("colorGuess");
const colorList = document.getElementById("colorList");

// difficulty easy max 3 colors
// difficulty medium max 6 colors
// difficulty hard max 9 colors

function difficultyToMaxColors(difficulty) {
  switch (difficulty) {
    case "easy":
      return 3;
    case "medium":
      return 6;
    case "hard":
      return 9;
    default:
      return 3;
  }
}

const cardColors = new Array(9).fill().map((_, index) => {
  const cardColor = document.createElement("button");
  cardColor.classList.add("card-color");
  cardColor.style.backgroundColor = `var(--color-${index + 1})`;
  cardColor.addEventListener("click", checkCorrectColor);
  return cardColor;
});

colorList.append(...cardColors);

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

function startGame() {
  changeColor();
}

startGame();
