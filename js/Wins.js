class Wins {
	constructor(finalCards) {
		this.finalCards = finalCards;
		this.allJacks = this.finalCards.filter((e) => e.value === 'jack');
		this.allQueens = this.finalCards.filter((e) => e.value === 'queen');
		this.allKings = this.finalCards.filter((e) => e.value === 'king');
		this.allAces = this.finalCards.filter((e) => e.value === 'ace');

		this.all10 = this.finalCards.filter((e) => e.value == 10);
		this.all9 = this.finalCards.filter((e) => e.value == 9);
		this.all8 = this.finalCards.filter((e) => e.value == 8);
		this.all7 = this.finalCards.filter((e) => e.value == 7);
		this.all6 = this.finalCards.filter((e) => e.value == 6);
		this.all5 = this.finalCards.filter((e) => e.value == 5);
		this.all4 = this.finalCards.filter((e) => e.value == 4);
		this.all3 = this.finalCards.filter((e) => e.value == 3);
		this.all2 = this.finalCards.filter((e) => e.value == 2);

		this.all = [
			this.allAces,
			this.allKings,
			this.allQueens,
			this.allJacks,
			this.all10,
			this.all9,
			this.all8,
			this.all7,
			this.all6,
			this.all5,
			this.all4,
			this.all3,
			this.all2,
		];
		this.winCards = [];
	}

	royalFlush() {
		if (this.sameSign() && this.highStraight()) {
			this.winCards = this.finalCards;
			return true;
		}
	}

	straightFlush() {
		if (this.sameSign() && this.straight()) {
			this.winCards = this.finalCards;
			return true;
		}
	}

	straight() {
		let found = false;
		let straights = [
			['ace', 2, 3, 4, 5],
			[2, 3, 4, 5, 6],
			[3, 4, 5, 6, 7],
			[4, 5, 6, 7, 8],
			[5, 6, 7, 8, 9],
			[6, 7, 8, 9, 10],
			[7, 8, 9, 10, 'jack'],
			[8, 9, 10, 'jack', 'queen'],
			[9, 10, 'jack', 'queen', 'king'],
		];
		straights.forEach((straight) => {
			let sortStraight = straight.sort();
			let sortedFinalCards = this.finalCards.map((e) => e.value).sort();
			if (
				sortStraight[0] === sortedFinalCards[0] &&
				sortStraight[1] === sortedFinalCards[1] &&
				sortStraight[2] === sortedFinalCards[2] &&
				sortStraight[3] === sortedFinalCards[3] &&
				sortStraight[4] === sortedFinalCards[4]
			) {
				found = true;
				return found;
			}
		});
		return found;
	}

	highStraight() {
		return this.all10.length === 1;
	}

	sameSign() {
		let firstCard = this.finalCards[0].sign;
		return this.finalCards.every((card) => card.sign === firstCard);
	}
}
