angular.module('homepageCtrl',[])
.controller('homepageCtrl',function($scope,$element,$interval){
	$scope.navs=[
		{name:'咨询',href:'/consultation'},
		{name:'电影',href:'/moviesShow'},
		{name:'求片区',href:'#'},
		{name:'网盘区',href:'/moviesSkyDrive'}
	]
	
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