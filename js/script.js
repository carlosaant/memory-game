'use strict';

const C_FRONT = 'card-front';
const C_BACK = 'card-back';
const CARD_CLASS = 'card';
const ICON = 'icon';
const BACK_CARD = './assets/images/warcraft-icon-back.png';

let wow_elements = [
  { name: 'shaman', path: './assets/images/shaman-icon-wow.png' },
  { name: 'warrior', path: './assets/images/warrior-icon-wow.png' },
  { name: 'druid', path: './assets/images/druid-icon-wow.png' },
  { name: 'darkknight', path: './assets/images/darkwar-icon-wow.png' },
  { name: 'mage', path: './assets/images/mage-icon-wow.png' },
  { name: 'hunter', path: './assets/images/hunter-icon-wow.png' },
  { name: 'monk', path: './assets/images/monk-icon-wow.png' },
  { name: 'paladin', path: './assets/images/paladin-icon-wow.png' },
  { name: 'rogue', path: './assets/images/rogue-icon-wow.png' },
  { name: 'priest', path: './assets/images/sacer-icon-wow.png' },
  { name: 'warlock', path: './assets/images/warlock-icon-wow.png' },
  { name: 'burningcruzade', path: './assets/images/bc-icon-wow.png' }
];

let cards = null;

const btn_iniciar = document.getElementById('btn_iniciar');

// -----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  btn_iniciar.addEventListener('click', iniciarGame);
});

function iniciarGame() {
  cards = createCardWithElements();
  embaralharCards(cards);
  inicializarCardsElements(cards);
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

function createCardWithElements() {
  let cards = [];
  for (let element of wow_elements) {
    cards.push(createPairFromElement(element));
  }

  //flat separar os arrays dentro de cada elemento, retornando eles em um só array
  return cards.flatMap(pair => pair);
}

function createPairFromElement(element) {
  return [
    {
      id: createIdWithElement(element.name),
      name: element.name,
      icon: element.path,
      flipped: false
    },
    {
      id: createIdWithElement(element.name),
      name: element.name,
      icon: element.path,
      flipped: false
    }
  ];
}

function createIdWithElement(element) {
  return element + parseInt(Math.random() * 1000);
}

function embaralharCards(cards) {
  let currentIndex = cards.length;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [cards[randomIndex], cards[currentIndex]] = [
      cards[currentIndex],
      cards[randomIndex]
    ];
  }
}

function flipCardElement() {
  this.classList.add('flip');
}
