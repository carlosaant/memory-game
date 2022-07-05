'use strict';

const C_FRONT = 'card-front';
const C_BACK = 'card-back';

let wow_elements = [
  { name: 'shaman', path: './assets/images/shaman-icon-wow.png' },
  { name: 'warrior', path: '...' },
  { name: 'druid', path: '...' },
  { name: 'darkknight', path: '...' },
  { name: 'mage', path: '...' },
  { name: 'hunter', path: '...' },
  { name: 'monk', path: '...' },
  { name: 'paladin', path: '...' },
  { name: 'rogue', path: '...' },
  { name: 'priest', path: '...' },
  { name: 'warlock', path: '...' },
  { name: 'burningcruzade', path: '...' }
];

let cards = null;

const btn_iniciar = document.getElementById('btn_iniciar');

// -----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', ()=>{
  btn_iniciar.addEventListener('click', iniciarGame);
});

function iniciarGame(){
  cards = createCardWithElements();
  embaralharCards(cards);
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
      icon: element.path,
      flipped: false
    },
    {
      id: createIdWithElement(element.name),
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
