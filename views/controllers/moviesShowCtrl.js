angular.module('moviesShow')
.controller('moviesShowCtrl',function($scope,$element){
	$scope.navs=[
		{name:'咨询',href:'#'},
		{name:'电影',href:'/moviesShow'},
		{name:'电视剧',href:'#'},
		{name:'求片区',href:'#'},
		{name:'更多+',href:'#'}
	]
	
	var width=document.documentElement.clientWidth||document.body.clientWidth,	// 获取页面宽度
	designWidth=952,		// 设计时的宽度
	differ=(parseInt(width)-designWidth)/2,	// 获取当前页面宽度与设计宽度的差值
	leftPersent=(differ/width)*100+'%'
	moviesBox=document.querySelectorAll('.moviesBox')[0],
	moviesBoxEle=angular.element(moviesBox)
	
	moviesBoxEle.attr('style','left:'+leftPersent)
	
	$scope.searchButton=function(){
		var span=$element.find('nav').find('span')[1];
		var input=$element.find('nav').find('input');
		if(!input.val()){
			window.alert('请输入内容');
		}else{
			document.location.assign('http://127.0.0.1:8020/电影网站1/movieSearch.ejs#?name='+input.val());
		}
	}
	
	$scope.searchKeyDown=function(e){
		if(e.keyCode==13){
			$scope.searchButton()
		}
	}
})