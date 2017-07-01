angular.module('moviesSearch')
	.controller('moviesSearchCtrl', function($scope) {
		$scope.navs=[
			{name:'咨询',href:'/consultation'},
			{name:'电影',href:'/moviesShow'},
			{name:'求片区',href:'#'},
			{name:'网盘区',href:'/moviesSkyDrive'}
		]
	})