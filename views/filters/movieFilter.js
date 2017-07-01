angular.module('movieFilter', [])
	.filter('toChange', function() {
		return function(value) {
			if(angular.isArray(value)) {
				return value = value.split(',').join(' / ');
			} else {
				return value;
			}
		}
	})
	.filter('forChange', function() {
		return function(value) {
			if(angular.isDefined(value)) {
				return value.split('、').join(' ');
			} else {
				return value;
			}
		}
	})
	