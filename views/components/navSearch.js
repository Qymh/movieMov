angular.module('navSearch', [])
	.constant('baseurlForSearch', '/api/agent/moviesAllSetting')	// 所有电影数据
	.directive('navSearch', function(baseurlForSearch, $resource) {
		return {
			replace: true,
			controller: function($scope, $element,$location) {
				var nowDate=new Date().getTime();
				
				// 展示搜索下拉列表
				$scope.show = function() {
					var indexDate=new Date().getTime();
					if(indexDate-nowDate>1000){
						nowDate=indexDate;
						$scope.showName=[];	// 最终要显示的下拉数据
						$scope.names=[];	// 储存获取电影的部分数据 (name,src)
						var search = $element.find('input').val();	// 获取搜索列表输入的内容
						
						// 获取电影Resource
						$scope.navSearchResource = $resource(baseurlForSearch);
						
						// 获取电影数据JSON
						$scope.navSearchs = $scope.navSearchResource.query();
						
						$scope.navSearchs.$promise.then(function(data) {
							
							// 获取部分数据
							data.forEach(function(index) {
								$scope.names.push({
									name:index.name,
									src:index.src
								});
							})
							
							// 返回写入的搜索目标与所有目标的匹配
							$scope.names.forEach(function(index) {
								if(index.name.indexOf(search)>=0&&search!=''){
									$scope.showName.push({
										name:index.name,
										src:index.src
									});
								}
							})
							
							// 检查最终显示的下拉数据并设置显示或者隐藏
							$scope.$watch($scope.showName,function(){
								if($scope.showName!=''){
									$scope.blurValue=true;
								}else{
									$scope.blurValue=false;
								}
							})
						})
						
					}
				};
				
				// 当鼠标点击其他任意位置下拉表隐藏
				$element.parent().parent().on('click',function(){
					$scope.$apply(function(){
						$scope.blurValue=false;
					})
				})
				
				
				// 跳转至搜索页面
				$scope.assign=function(item){
					$scope.blurValue=true;
					$location.path('/moviesSearch?name='+item.name)
				}
			},
			template: '<div><input type="text" placeholder="电视/电视剧"\
			ng-model="search" ng-change="show()" ng-blur="blur()">\
			<ul ng-show="blurValue" class="search">\
				<li ng-repeat="item in showName|limitTo:6" ng-click="assign(item)">\
					{{item.name}}</li>\
			</ul></div>'
		}
	})