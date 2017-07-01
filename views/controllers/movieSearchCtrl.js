angular.module('movieSearch')
	.constant('needSize', '6')
	.constant('baseurlForShow', 'http://localhost:5500/movienew/')
	.controller('movieSearchCtrl', function($scope, $location, $element, $resource, baseurlForShow, needSize) {
		$scope.navs = [{
				name: '咨询',
				href: '#'
			},
			{
				name: '电影',
				href: 'movieShow.ejs'
			},
			{
				name: '电视剧',
				href: '#'
			},
			{
				name: '求片区',
				href: '#'
			},
			{
				name: '更多+',
				href: '#'
			}
		];

		$scope.finish = false;

		$scope.selectedPage = 1;

		$scope.movieChipResource = $resource(baseurlForShow);

		$scope.movies = $scope.movieChipResource.query();

		var searchCount = $location.search().count;
		var searchName = $location.search().name;
		var resultss = [];
		var len;

		$scope.movies.$promise.then(function(data) {
			data.forEach(function(index, count) {
				if(searchCount) {
					$scope.finish = true;
					if(index.src == searchCount) {
						resultss.push(index);
						$scope.movies = resultss;
						len = Math.ceil(resultss.length / needSize);

						for(var i = 0; i < len; i++) {
							results.push(i + indexCount + 1)
						}
					}
				} else {
					if(searchName) {
						var nameArr = searchName.split('');
						for(var j = 0; j < nameArr.length; j++) {
							if(index.name.indexOf(nameArr[j]) >= 0) {
								resultss.push(index);

								for(var q = 0; q < resultss.length; q++) {
									for(var w = q + 1; w < resultss.length; w++) {
										if(resultss[q] == resultss[w]) {
											resultss.splice(w, 1);
										}
									}
								}

								$scope.movies = resultss;

								len = Math.ceil($scope.movies.length / needSize);

								for(var i = 0; i < len; i++) {
									results.push(i + indexCount + 1)
								}

								for(var q = 0; q < results.length; q++) {
									for(var w = q + 1; w < results.length; w++) {
										if(results[q] == results[w]) {
											results.splice(w, 1);
										}
									}
								}
								break;
							}
							$scope.finish=true;
						}
					}
				}
			})
			if(resultss == '') {
				$scope.finish = false;
				document.location.assign('http://127.0.0.1:8020/%E7%94%B5%E5%BD%B1%E7%BD%91%E7%AB%991/noMovie.ejs')
			}
		})
	})