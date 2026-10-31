const symbols = [
  "🥁", "🥁",
  "🎸", "🎸",
  "🎹", "🎹",
  "🎻", "🎻"
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let pairsFound = 0;

pairsFound = 0;
document.getElementById("score").textContent =
  "Nájdené dvojice: 0 / 4";

function createBoard() {

  document
    .getElementById("winMessage")
    .classList.remove("show");

  pairsFound = 0;

  document.getElementById("score").textContent =
    "Nájdené dvojice: 0 / 4";

  const game = document.getElementById("game");
  game.innerHTML = "";

  const shuffled = [...symbols].sort(() => Math.random() - 0.5);

  shuffled.forEach(symbol => {

    const card = document.createElement("div");

    card.className = "card";
    card.dataset.symbol = symbol;
    card.textContent = "❓";

    card.addEventListener("click", flipCard);

    game.appendChild(card);
  });

  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
function flipCard() {

  if (lockBoard) return;

  if (this === firstCard) return;

  if (this.classList.contains("matched")) return;

  this.textContent = this.dataset.symbol;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;

  checkMatch();
}

function checkMatch() {

  if (
    firstCard.dataset.symbol ===
    secondCard.dataset.symbol
  ) {

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    pairsFound++;

document.getElementById("score").textContent =
  `Nájdené dvojice: ${pairsFound} / 4`;
    
    firstCard = null;
    secondCard = null;

    checkWin();

  } else {

    lockBoard = true;

    setTimeout(() => {

      firstCard.textContent = "❓";
      secondCard.textContent = "❓";

      firstCard = null;
      secondCard = null;

      lockBoard = false;

    }, 1000);
  }
}

function checkWin() {

  const matched =
    document.querySelectorAll(".matched");

  if (matched.length === symbols.length) {

    setTimeout(() => {
      document
        .getElementById("winMessage")
        .classList.add("show");

      document
        .getElementById("fanfare")
        .play();

    }, 500);

  }
}

createBoard();
document
  .getElementById("playAgainBtn")
  .addEventListener("click", () => {

    document
      .getElementById("winMessage")
      .classList.remove("show");

    createBoard();

  });