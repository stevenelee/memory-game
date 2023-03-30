"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    const card = document.createElement('div');
    card.classList.add(color);
    card.addEventListener('click', handleCardClick);
    gameBoard.append(card);
  }
}

/** Flip a card face-up. */

let clicks = 0;

function flipCard(card) {
  card.style.backgroundColor = card.classList[0];
  card.classList.add("flipped");
  clicks++;
}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.style.backgroundColor = '';
  card.classList.remove("flipped");
  card.id = '';
}

/** Handle clicking on a card: this could be first-card or second-card. */

let matches = 0;
let lockBoard = false;

function handleCardClick(evt) {
  if (lockBoard) return;

  let clickedCard = evt.target;
  if (clickedCard.classList.contains("flipped")) return;

  flipCard(clickedCard);
  if (clicks === 1) clickedCard.id = "first-card";
   else if (clicks === 2) clickedCard.id = "second-card";

  let firstCard = document.getElementById("first-card");
  let secondCard = document.getElementById("second-card");

  if (clicks === 2) {
    if (firstCard.classList[0] === secondCard.classList[0]) {
      matches++;
      firstCard.id = '';
      secondCard.id = '';
    } else {
      lockBoard = true;
      setTimeout(function() {
        unFlipCard(firstCard);
        unFlipCard(secondCard);
        lockBoard = false;
      }, 1000);
    }
    clicks = 0;
  }

  if (matches === COLORS.length/2) {
    setTimeout(function() {
      alert("You are the memory master!");
    }, 250);
  }
}
