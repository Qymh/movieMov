angular.module('log',[])
	.controller('logCtrl', function($scope) {

		$scope.resett = function() {
			$scope.log.name = '';
			$scope.log.password = '';
			$scope.log.passwordAgain = '';
		}
	})