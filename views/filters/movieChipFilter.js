angular.module('myFilter', [])
	.filter('movieLimit', function($filter) {
		return function(data, page, size) {
			if(angular.isArray(data) && angular.isNumber(page) &&
				angular.isNumber(size)) {
				var start = (page - 1) * size;
				if(data.length < start) {
					return [];
				} else {
					return $filter('limitTo')(data.slice(start), size)
				}
			} else {
				return data;
			}
		}
	})
	.filter('pageCount', function() {
		return function(data, size) {
			result = [];
			if(angular.isArray(data) && angular.isNumber(size)) {
				for(var i = 0; i < Math.ceil(data.length / size); i++) {
					result.push(i + indexPageCount);
				}
				var len = result.length;
				var front = result.slice(0, 5);
				var inset = ['...']
				var back = [Math.ceil(data.length / size)]
				if(len > 6 && indexPageCount < 5) {
					result = front.concat(inset).concat(back);
					return result;
				} else {
					result = front.concat(back);
					return result;
				}
			} else {
				return data;
			}
		}
	})
	.filter('test', function() {
		return function(data, size) {
			var len = data.length;
			
			if(len<=5){
				var index=[]
				for(var j=1;j<=len;j++){
					index.push(j);
					if(index.length==len){
						return data=index;
					}
				}
			}
			
			var rightMax = [len];
			var leftMax = [1];
			data = data.filter(function(count) {
				return count > 0;
			})
			var len = data.length;
			var leftArr = data.slice(0, 5);
			var indexPoint = ['....'];
			var indexPointt = ['...'];
			if(leftNum >= 2) {
				if(leftNum == len - 5) {
					var a = [];
					for(var i = len - 5; i <= len; i++) {
						a.push(i);
					}
					return data = leftMax.concat(indexPoint).concat(a);
				} else {
					return data = leftMax.concat(indexPointt).concat(leftArr).concat(indexPoint).concat(rightMax)
				}
			} else if(leftNum == 1) {
				return data = [1, 2, 3, 4, 5].concat(indexPoint).concat(rightMax);
			} else {
				return leftArr.concat(indexPoint).concat(rightMax)
			}
		}
	})
	.filter('forActor', function() {
		return function(value) {
			if(angular.isDefined(value)) {
				return value.split('，').slice(0,2).join(' ');
			} else {
				return value;
			}
		}
	})
	.filter('forDes', function() {
		return function(value) {
			return value.split('').slice(0, 35).concat(['...']).join('')
		}
	})
	.filter('forTag',function(){
		return function(data){
			if(angular.isDefined(data)){
				return data.split('、')
			}
		}
	})