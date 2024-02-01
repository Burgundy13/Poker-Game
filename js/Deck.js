class Deck {
	cards;
	cardsCopy;

	constructor(cards) {
		this.cards = cards;
		this.cardsCopy = [].concat(this.cards);
	}

	fiveRandomCards() {
		// let fiveRandomCards = [];
		// if (this.cards.length < 6) {
		// 	this.cards = [].concat(this.cardsCopy);
		// }
		// for (let i = 0; i < 5; i++) {
		// 	let rand = Math.floor(Math.random() * this.cards.length);
		// 	fiveRandomCards.push(this.cards[rand]);
		// 	this.cards.splice(rand, 1);
		// }
		// return fiveRandomCards;
		return [
			this.cards[0],
			this.cards[13],
			this.cards[26],
			this.cards[30],
			this.cards[43],
		];
	}
}

let deck = new Deck(allCards);
