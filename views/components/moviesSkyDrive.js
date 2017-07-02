angular.module('skyDrive',[])
.constant('moviesSkyDriveSearch','/api/agent/moviesSkyDriveSearch')
.constant('moviesSkyDrive','/api/agent/moviesSkyDrive/')
.constant('size','6')
.directive('skyDrive',function(moviesSkyDrive,$resource,size,moviesSkyDriveSearch,$location){
	return {
		scope:{
			total:'=informationTotal'	// 总网盘长度
		},
		link:function(scope,element,attrs){
			var width=document.documentElement.clientWidth||document.body.clientWidth,	// 获取页面宽度
			designWidth=952,		// 设计时的宽度
			differ=(parseInt(width)-designWidth)/2,	// 获取当前页面宽度与设计宽度的差值
			leftPersent=(differ/width)*100+'%'
			movieBox=document.querySelectorAll('.skyDrive')[0],
			movieBoxEle=angular.element(movieBox)
			
			movieBoxEle.attr('style','left:'+leftPersent)
			
			scope.page=1	// 当前页数
	
			scope.moviesSkyDriveResource=$resource(moviesSkyDrive+scope.page);	// 电影网盘Resource
	
			scope.moviesSkyDrive=scope.moviesSkyDriveResource.query();	// 获取电影网盘
				
			scope.counts=[]	// 所有页数数组
				
			scope.countsLength=Math.ceil(scope.total/size)	//总共页数长度
				
			for(var i=1;i<=scope.countsLength;i++){
				scope.counts.push(i)
			}
				
			scope.transition=['...']
				
			scope.countsAlone=scope.counts	// 克隆页数数组
				
			if(scope.countsLength>5){
				scope.counts=scope.counts.slice(0,5)
				.concat(scope.transition).concat(scope.counts.slice(-1))	// 初始页数数组
			}
				
			scope.show=function(count,$event){
				if(angular.isNumber(count)){
					var counts=scope.countsAlone	// 所有页数数组
					var countsLength=scope.countsAlone.length	//页数长度
					var temporaryArr=[]		// 临时数组
					var target=$event.target	// 获取当前选取的页数
					var targetEle=angular.element(target)	// 将当前选择页数设置为元素
					var spans=document.querySelectorAll('.skyDrive_counter span')	// 获取所有页数
					var spansEle=angular.element(spans)	// 将所有页数设置为元素
					
					// 改变焦点UI
					spansEle.removeClass('skyDrive_counter_focus')
					targetEle.addClass('skyDrive_counter_focus')
						
					// 改变显示UI
					if(countsLength>5){
						if(count>3&&count<countsLength-2){
							temporaryArr=[1,'...',count-2,count-1,count,count+1,count+2,'..',countsLength]
							scope.counts=temporaryArr
						}else if(count<=3){
								temporaryArr=[1,2,3,4,5,'...',countsLength]
							scope.counts=temporaryArr
						}else if(count>=countsLength-2){
							temporaryArr=[1,'...',countsLength-4,countsLength-3,countsLength-2,countsLength-1,countsLength]
							scope.counts=temporaryArr
						}
					}
					
					// 更新电影报刊内容{
					scope.page=count
						
					scope.moviesSkyDriveResource=$resource(moviesSkyDrive+scope.page);	// 电影网盘Resource
	
					scope.moviesSkyDrive=scope.moviesSkyDriveResource.query();	// 获取电影网盘
				}
			}
			
			scope.search=function(){
				var input=element.find('input')
				var inputEle=angular.element(input)
				var value=inputEle.val()
				
				if(!value){
					window.alert('请输入内容');
				}else{
					scope.moviesSkyDriveResource=$resource(moviesSkyDriveSearch+'?name='+value)
					scope.moviesSkyDrive=scope.moviesSkyDriveResource.query()
					scope.counts=[]
				}
			}
		},
		templateUrl:'views/components/templates/moviesSkyDrive.ejs'
	}
})
