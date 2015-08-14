var Card = function (id, value, suit) {
	this.id = id;
	this.value = value;
	this.suit = suit;

	this.getName = function () {
		if (this.value > 1 && this.value < 11) {
			return this.value + " of " + this.suit;
		} 
		switch (this.value) {
			case 1:
				return "Ace of " + this.suit;
			case 11:
				return "Jack of " + this.suit;
			case 12: 
				return "Queen of " + this.suit;
			case 13: 
				return "King of " + this.suit;
			default:
				return "Invalid value"; 
		}
	};
};

exports.Card = Card;


