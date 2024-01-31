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
			this.cards[1],
			this.cards[2],
			this.cards[0],
			this.cards[3],
			this.cards[4],
		];
	}
}

let deck = new Deck(allCards);
