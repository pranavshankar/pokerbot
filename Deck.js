Card = require("./Card");

function Deck() {
	this.cards = [];
	for (i = 1; i <= 52; i++) {
		var val = i % 13;
		if (val == 0) {
			val = 13;
		}
		var cycle = Math.floor(i / 13); 
		var suit;
		if (cycle == 0) {
			suit = 'clubs';
		} else if (cycle == 1) {
			suit = 'diamonds';
		} else if (cycle == 2) {
			suit = 'hearts';
		} else {
			suit = 'spades';
		}
		var c = new Card.Card(i, val, suit);
		this.cards[i - 1] = c;
	}
};

Deck.prototype.shuffle = function () {
	var _swap = function (i, j, cards) {
		var temp = cards[i];
		cards[i] = cards[j];
		cards[j] = temp;
	};

	for (i = 51; i > 1; i--) {
		var j = Math.round(Math.random() * i);
		_swap(i, j, this.cards);
	}
};

Deck.prototype.deal = function (num) {	
	var toRet = [];
	for (var i = 0; i < num; i++) {
		toRet[i] = this.cards.splice(0, 1)[0];
	}
	return toRet;
};

Deck.prototype.dealInitial = function () {
	return this.deal(2);
};

Deck.prototype.length = function () {
	return this.cards.length;
 }


exports.Deck = Deck;