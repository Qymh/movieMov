angular.module('moviesSearch')
	.constant('moviesAll','/api/agent/moviesAllSetting')
	.directive('movieChip', function($resource,$location,moviesAll) {
		return {
			templateUrl: 'views/components/templates/moviesShow.ejs',
			scope:{
				total:'=informationTotal',	// 总电影长度
				name:'=informationName'
			},
			link:function(scope,element,attrs){
				scope.moviesShow=[]
				
				var absurl=$location.absUrl()
				
				var name=absurl.match(/\=\S+/g)[0]
				name=decodeURI(name).toString().slice(1,name.length)
				
				scope.moviesAllResource=$resource(moviesAll)
				
				scope.moviesAllResource.query().$promise.then(function(movies){
					movies.forEach(function(movie){
						var inner=movie.name
						if(inner==name){
							scope.moviesShow.push(movie)
						}
					})
				})
				
				
			}
		}
	})