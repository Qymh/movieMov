angular.module('moviesSkyDriveCtrl',[])
.controller('moviesSkyDriveCtrl',function($scope){
	$scope.navs=[
		{name:'咨询',href:'/consultation'},
		{name:'电影',href:'/moviesShow'},
		{name:'求片区',href:'/advice'},
		{name:'网盘区',href:'/moviesSkyDrive'}
	]
	
	$scope.searchButton=function(){
		var span=$element.find('nav').find('span')[1];
		var input=$element.find('nav').find('input');
		if(!input.val()){
			window.alert('请输入内容');
		}else{
			document.location.assign('/moviesSearch?name='+input.val())
		}
	}
	
	$scope.searchKeyDown=function(e){
		if(e.keyCode==13){
			$scope.searchButton()
		}
	}
})
