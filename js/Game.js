class Game {
	constructor() {
		this.btn = document.querySelector('button');
		this.cards = document.querySelectorAll('.img-holder');
		this.cardIndex = 0;
		this.randomFiveCards = [];
		this.round = 0;
		this.finalCards = [];
		this.win = 0;
	}

	init() {
		this.btn.addEventListener('click', () => this.flip());
	}

	flip() {
		this.round === 1 ? (this.round = 2) : (this.round = 1);
		if (this.round === 1) {
			this.removeAllSelected();
		}
		this.btn.innerHTML = 'Round ' + this.round;
		this.cardIndex = 0;
		this.turnOnBack();
	}

	removeAllSelected() {
		let body = document.querySelector('body');
		let winDiv = document.querySelector('.winDiv');
		document.querySelectorAll('.selected').forEach((div) => {
			div.classList.remove('selected', 'cardWin');
		});
		if (winDiv) {
			body.removeChild(winDiv);
		}
	}

	turnOnBack() {
		this.cards.forEach((card) => {
			let front = card.querySelector('.front:not(.selected)');
			let back = card.children[1];
			if (front) {
				front.style.transform = 'perspective(900px) rotateY(180deg)';
				back.style.transform = 'perspective(900px) rotateY(0)';
			}
		});
		setTimeout(() => {
			this.shuffleCards();
			this.reveal();
		}, 100);
	}

	reveal() {
		let cardFront = this.cards[this.cardIndex].querySelector(
			'.front:not(.selected)'
		);
		let cardBack = this.cards[this.cardIndex].querySelector('.back');

		if (cardFront) {
			this.finalCards[this.cardIndex] = this.randomFiveCards[this.cardIndex];
			cardFront.children[0].setAttribute('src', this.getImage());
			cardFront.setAttribute(
				'data-id',
				this.randomFiveCards[this.cardIndex].getCard()
			);
			cardFront.onclick = () => {
				cardFront.classList.toggle('selected');
			};

			setTimeout(() => {
				cardBack.style.transform = 'perspective(900px) rotateY(180deg)';
				cardFront.style.transform = 'perspective(900px) rotateY(0)';
				this.cardIndex++;
				if (this.cardIndex < this.cards.length) {
					this.reveal();
				} else if (this.round === 2) {
					this.checkWins();
				}
			}, 100);
		} else {
			this.cardIndex++;
			if (this.cardIndex < this.cards.length) {
				this.reveal();
			} else if (this.round === 2) {
				this.checkWins();
			}
		}
	}

	getImage() {
		return (
			'./images/' +
			this.randomFiveCards[this.cardIndex].sign +
			'_' +
			this.randomFiveCards[this.cardIndex].value +
			'.png'
		);
	}

	displayWin(string) {
		let body = document.querySelector('body');
		let div = document.createElement('div');
		let span = document.querySelector('.scoreNum');
		body.insertAdjacentElement('afterbegin', div);
		div.classList.add('winDiv');
		div.innerHTML = `Congrats you won ${string}`;
		this.win++;
		span.innerHTML = this.win;
	}

	shuffleCards() {
		this.randomFiveCards = deck.fiveRandomCards();
	}

	checkWins() {
		let wins = new Wins(this.finalCards);

		if (wins.royalFlush()) {
			this.selectWinCards(wins);
			this.displayWin('Royal Flush');
		} else if (wins.straightFlush()) {
			this.displayWin('Straight Flush');
			this.selectWinCards(wins);
		} else if (wins.poker()) {
			this.displayWin('Poker');
			this.selectWinCards(wins);
		} else if (wins.fullHouse()) {
			this.displayWin('Full House');
			this.selectWinCards(wins);
		} else if (wins.straight()) {
			this.displayWin('Straight');
			this.selectWinCards(wins);
		} else if (wins.threeOfAKind()) {
			this.displayWin('Three of a Kind');
			this.selectWinCards(wins);
		} else if (wins.twoPairs()) {
			this.displayWin('Two Pairs');
			this.selectWinCards(wins);
		} else if (wins.jacksOrBetter()) {
			this.displayWin('Jacks or Better');
			this.selectWinCards(wins);
		}
	}

	selectWinCards(wins) {
		wins.winCards.flat().forEach((card) => {
			document
				.querySelector('[data-id="' + card.getCard() + '"]')
				.classList.add('cardWin', 'selected');
		});
	}
}

let game = new Game();
game.init();
