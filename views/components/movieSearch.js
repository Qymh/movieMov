angular.module('movieSearch')
	.constant('needSize','6')
	.directive('movieChip', function(needSize) {
		return {
			scope: {
				movies: '=informationMovie',
				page: '=informationPage'
			},
			templateUrl: 'components/templates/movieShow.html',
			link:function(scope,element,attrs){
				scope.$watch('movies',function(){
				})
			},
			controller: function($scope, $element, $attrs,$window) {
				var len;
				$scope.change=true;
						
				$scope.counts = results;

				$scope.selectedPage = 1;
				
				$scope.showPage = function(num) {
					if(angular.isNumber(num)){
						document.body.scrollTop=0;
						$scope.selectedPage=num;
						if(angular.isNumber(num)) {
							if(num <= len-5) {
								if(num != 1) {
									leftNum = results[0];
									leftNumLater = results[0];
									middleNum = results[2];
									results = [];
									differ = num - middleNum;
									middleNum += differ;
									indexCount += differ;
									for(var i = 0; i < len; i++) {
										results.push(i + indexCount + 1);
										$scope.counts = results;
									}
									leftNum = results[0];
								} else {
									leftNum = 1;
								}
							} else {
								if(num==len) {
									indexCount=0;
									indexCount += (len-10);
									leftNum = len-5;
									var _indexArr=[];
									for(var i=leftNum;i<len;i++){
										_indexArr.push(i);
									}
									results=_indexArr;
									middleNum = results[2];
									differ = num - middleNum;
									indexCount += differ;
								}else{
									leftNum = len-5;
									var _indexArr=[];
									for(var i=leftNum;i<len;i++){
										_indexArr.push(i);
									}
									results=_indexArr;
									middleNum = results[2];
									differ = num - middleNum;
									indexCount += differ;
								}
							}
						}
					}
				}
				$scope.showTag = function(tag) {
				}
			}
		}
	})