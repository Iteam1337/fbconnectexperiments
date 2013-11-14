(function() {
	'use strict';

	var app = angular.module('supersharer', []);

})();

(function() {
  'use strict';

  angular.module('supersharer').controller('PageCtrl', ['$scope', '$http', '$log', 'Facebook', function($scope, $http, $log, Facebook) {
  	$scope.Facebook = Facebook;

  	$scope.markedFriends = {};

  	$scope.getFriends = function() {
  		Facebook.friends(function(data) {
  			$scope.friends = data.data;
  			$scope.$apply();
  		});
  	};

  	$scope.inviteFriend = function(friendId) {
  		Facebook.sendMessage(friendId, function(response) {
  			alert("Din inbjudan har skickats!")
  			if (response && response.request_id) {
  				$log.log(response);
  			}
  		});
  	}

  	$scope.invite = function() {
  		$log.log($scope.markedFriends);
  		var friendIds = Object.keys($scope.markedFriends).filter(function(item) {
  			return $scope.markedFriends.hasOwnProperty(item) && $scope.markedFriends[item];
  		});
  		Facebook.sendMessage(friendIds, function(response) {
  			$log.log(response);
  		});
  	};

  	$scope.showInvite = function() {
  		return Object.keys($scope.markedFriends).some(function(item) {
  			return $scope.markedFriends.hasOwnProperty(item) && $scope.markedFriends[item];
  		});
  	};

  }]);
})();

(function() {
	'use strict';

	angular.module('supersharer').factory('Facebook', ['$window', '$log', function($window, $log) {
		var service = {};

		service.FB = $window.FB;

		service.friends = function(callback) {
			service.FB.api('/me/friends?fields=name,picture', callback);
		};

		service.sendMessage = function(friend, callback) {
			service.FB.ui({
			    method: 'send',
			    name: 'Share with friends',
			    to: friend,
			    link: 'http://www.iteam.se',
			    picture: 'http://www.gravatar.com/avatar/fff397e622f3d6c92399ffe1c396c92c.jpg?s=200',
			    caption: 'Iteam Super Sharer',
			    message: 'Skicka en personlig inbjudan till dina kompisar! Om de nappar så får du en bonus!',
			    description: 'Här kommer du att få ett härligt tips!'
			  },
			/*service.FB.ui({
					method:'apprequests',
					message:'I share this with you',
					to: friends
				},*/
				callback
			);
		};
		
		return service;
	}]);
})();
