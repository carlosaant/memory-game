let game = {
  wow_elements: [
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
  ],

  cards: null,

  createCardWithElements: function () {
    this.cards = [];
    for (let element of this.wow_elements) {
      this.cards.push(this.createPairFromElement(element));
    }

    //flat separar os arrays dentro de cada elemento, retornando eles em um só array
    this.cards = this.cards.flatMap(pair => pair);
    this.embaralharCards();
    // return this.cards;
  },

  createPairFromElement: function (element) {
    return [
      {
        id: this.createIdWithElement(element.name),
        name: element.name,
        icon: element.path,
        flipped: false
      },
      {
        id: this.createIdWithElement(element.name),
        name: element.name,
        icon: element.path,
        flipped: false
      }
    ];
  },

  createIdWithElement: function (element) {
    return element + parseInt(Math.random() * 1000);
  },

  embaralharCards: function () {
    let currentIndex = this.cards.length;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex]
      ];
    }
  },

  // ------------- checkagem e funcionamento do jogo
  lockMode: false,
  firstCard: null,
  secondCard: null,

  setarCard: function (id) {
    let card = this.cards.filter(card => card.id === id)[0];

    if (card.flipped || this.lockMode) {
      return false;
    }

    // se a primeira card estiver como null, se estiver vazio entao entra no first
    if (!this.firstCard) {
      this.firstCard = card;
      return true;
    } else {
      this.secondCard = card;

      //como foi setada as 2 cards, entra em lockmode
      this.lockMode = true;
      return true;
    }
  },

  checkCardsMatch: function () {
    return this.firstCard.name === this.secondCard.name;
  },

  clearCardLockMode: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  }
};
