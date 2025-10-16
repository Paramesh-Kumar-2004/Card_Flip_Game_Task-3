const board = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");

const images = [
    "img 1.jpg",
    "img 2.jpg",
    "img 3.jpg",
    "img 4.jpg",
    "img 5.jpg",
    "img 6.jpg",
    "img 7.jpg",
    "img 8.jpg"
];

let cardArray = [...images, ...images];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    board.innerHTML = "";
    shuffle(cardArray).forEach(img => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
       <div class="card-inner">
        <div class="card-front">
          <img src="images/${img}" alt="card image">
        </div>
        <div class="card-back"></div>
       </div>
      `;
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1000);
}

function checkForMatch() {
    const firstImg = firstCard.querySelector(".card-front img").src;
    const secondImg = secondCard.querySelector(".card-front img").src;

    const isMatch = firstImg === secondImg;
    isMatch ? disableCards() : unflipCards();
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

restartBtn.addEventListener("click", createBoard);
createBoard();