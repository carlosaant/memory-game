'use strict';

const C_FRONT = 'card-front';
const C_BACK = 'card-back';
const CARD_CLASS = 'card';
const ICON = 'icon';
const BACK_CARD = './assets/images/warcraft-icon-back.png';

const btn_iniciar = document.getElementById('btn_iniciar');
const score_most = document.getElementById('scoreGame');

let inicio_game = false;

// -----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  btn_iniciar.addEventListener('click', inicioGame);
  score_most.textContent = game.score;
});

function inicioGame() {
  if (inicio_game) {
    restartGame();
  } else {
    inicio_game = true;
    btn_iniciar.value = 'Reiniciar';
    iniciarGame();
  }
}

function iniciarGame() {
  game.createCardWithElements();
  // embaralharCards(cards);
  inicializarCardsElements(game.cards);

  game.score = 0;
  score_most.textContent = game.score;
}

function inicializarCardsElements(cards) {
  let board = document.getElementById('gameBoard');

  board.innerHTML = '';
  cards.forEach(card => {
    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add(CARD_CLASS);
    cardElement.dataset.name = card.name;

    createCardContent(card, cardElement);
    cardElement.addEventListener('click', flipCardElement);

    board.appendChild(cardElement);
  });
}

function createCardContent(card, cardElement) {
  createCardFace(C_FRONT, card, cardElement);
  createCardFace(C_BACK, card, cardElement);
}

function createCardFace(FACE, card, cardElement) {
  let card_face = document.createElement('div');
  card_face.classList.add(FACE);
  if (FACE == C_FRONT) {
    let imageElement = document.createElement('img');
    imageElement.classList.add(ICON);
    imageElement.src = card.icon;

    card_face.appendChild(imageElement);
  } else {
    let imageElement = document.createElement('img');
    imageElement.classList.add(ICON);
    imageElement.src = BACK_CARD;

    card_face.appendChild(imageElement);
  }

  cardElement.appendChild(card_face);
}

function flipCardElement() {
  // console.log(this);
  // passa o id da card que foi clicada na tela
  if (game.setarCard(this.id)) {
    this.classList.add('flip');

    if (game.secondCard != null) {
      game.score += 1;
      score_most.textContent = game.score;
      if (game.checkCardsMatch()) {
        game.clearCardLockMode();
        if (game.checkGameOver()) {
          const gameOverTela = document.getElementById('gameOverDiv');
          setTimeout(() => {
            gameOverTela.classList.add('show');
            gameOverTela.style.animationName = 'moveElem';
          }, 500);
        }
      } else {
        let viewFirstCard = document.getElementById(game.firstCard.id);
        let viewSecondCard = document.getElementById(game.secondCard.id);
        setTimeout(() => {
          viewFirstCard.classList.remove('flip');
          viewSecondCard.classList.remove('flip');

          game.firstCard.flipped = false;
          game.secondCard.flipped = false;
          game.clearCardLockMode();
        }, 1000);
      }
    }
  }
}

function restartGame() {
  if (game.checkGameOver) {
    game.clearCardLockMode();
    iniciarGame();
    const gameOverTela = document.getElementById('gameOverDiv');
    gameOverTela.classList.remove('show');
  } else {
    iniciarGame();
  }
}
