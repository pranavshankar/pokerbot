angular.module('pokerApp')
	.controller('IndexCtrl', ['$scope', '$window',
		function ($scope, $window) {
			var sock = new SockJS('http://localhost:3000/sock');

			sock.onopen = function() {
				console.log('open');
			};

			sock.onclose = function() {
				console.log('close');
			};

			sock.onmessage = function(e) {
				// var content = JSON.parse(e.data);
				var content = e.data;
				console.log(content);
				if (content.action == 'setup') {
					$scope.deck = content.deck;
					$scope.dealer = content.dealer;
					$scope.hand = $scope.deck.dealInitial();
					$scope.hand = temp.hand;
				}
			}

			// set initial default values for player
			$scope.blind = 'big';
			$scope.dealer = true;
			$scope.chips = 5000;

			// set initial pot
			$scope.pot = 0;

			if ($scope.blind === 'big') {
				$scope.chips -= 200;
				$scope.pot += 200;
			} else if ($scope.blind === 'small') {
				$scope.chips -= 100;
				$scope.pot += 100;
			}
		}
	]
);