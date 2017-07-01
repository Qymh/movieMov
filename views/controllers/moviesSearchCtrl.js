angular.module('moviesSearch')
	.controller('moviesSearchCtrl', function($scope) {
		$scope.navs=[
			{name:'咨询',href:'/consultation'},
			{name:'电影',href:'/moviesShow'},
			{name:'求片区',href:'#'},
			{name:'网盘区',href:'/moviesSkyDrive'}
		]
		
		var width=document.documentElement.clientWidth||document.body.clientWidth,	// 获取页面宽度
		designWidth=952,		// 设计时的宽度
		differ=(parseInt(width)-designWidth)/2,	// 获取当前页面宽度与设计宽度的差值
		leftPersent=(differ/width)*100+'%'
		moviesBox=document.querySelectorAll('.moviesBox')[0],
		moviesBoxEle=angular.element(moviesBox)
		
		moviesBoxEle.attr('style','left:'+leftPersent)
	})