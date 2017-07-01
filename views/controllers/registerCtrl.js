angular.module('log', ['ngResource'])
	.constant('baseurlForUser', 'http://localhost:5500/users/')
	.controller('logCtrl', function($scope, $resource, $window, $location, baseurlForUser) {

		$scope.userResource = $resource(baseurlForUser);

		$scope.users = $scope.userResource.query();

		$scope.logg = function(infor) {
			
		}
		$scope.resett = function() {
			$scope.log.name = '';
			$scope.log.password = '';
			$scope.log.passwordAgain = '';
		}
	})