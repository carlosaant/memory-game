'use strict';

const C_FRONT = 'card-front';
const C_BACK = 'card-back';
const CARD_CLASS = 'card';
const ICON = 'icon';
const BACK_CARD = './assets/images/warcraft-icon-back.png';

const btn_iniciar = document.getElementById('btn_iniciar');

// -----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  btn_iniciar.addEventListener('click', iniciarGame);
});

function iniciarGame() {
  game.createCardWithElements();
  // embaralharCards(cards);
  inicializarCardsElements(game.cards);
}

function inicializarCardsElements(cards) {
  let board = document.getElementById('gameBoard');
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

    if (game.checkCardsMatch()) {
      game.clearCardLockMode();
    } else {
      let viewFirstCard = document.getElementById(game.firstCard.id);
      let viewSecondCard = document.getElementById(game.secondCard.id);
      setTimeout(() => {
        viewFirstCard.classList.remove('flip');
        viewSecondCard.classList.remove('flip');
        game.clearCardLockMode();
      }, 1000);
    }
  }
}
