angular.module('homepage')
	.constant('moviesPress','/api/agent/moviesConsultation/')	// 获取电影报刊
	.constant('size','9')
	.directive('moviesConsultation', function($resource,moviesPress,size) {
		return {
			scope:{
				total:'=informationTotal'	// 总报刊长度
			},
			link: function(scope, element, attrs) {
				scope.page=1	// 当前页数
	
				scope.movieMsgResource=$resource(moviesPress+scope.page);	// 电影报刊Resource
	
				scope.movieMsg=scope.movieMsgResource.query();	// 获取电影报刊
				
				scope.counts=[]	// 所有页数数组
				
				scope.countsLength=Math.ceil(scope.total/size)	//总共页数长度
				
				for(var i=1;i<=scope.countsLength;i++){
					scope.counts.push(i)
				}
				
				scope.transition=['...']
				
				scope.countsAlone=scope.counts	// 克隆页数数组
				
				scope.counts=scope.counts.slice(0,5).concat(scope.transition).concat(scope.counts.slice(-1))	// 初始页数数组
				
				scope.show=function(count,$event){
					if(angular.isNumber(count)){
						var counts=scope.countsAlone	// 所有页数数组
						var countsLength=scope.countsAlone.length	//页数长度
						var temporaryArr=[]		// 临时数组
						var target=$event.target	// 获取当前选取的页数
						var targetEle=angular.element(target)	// 将当前选择页数设置为元素
						var spans=document.querySelectorAll('.movieMsg_count span')	// 获取所有页数
						var spansEle=angular.element(spans)	// 将所有页数设置为元素
						
						// 返回顶部
						window.pageYOffset=0 
						document.documentElement.scrollTop=0 
						document.body.scrollTop=0
						
						// 改变焦点UI
						spansEle.removeClass('movieMsg_count_focus')
						targetEle.addClass('movieMsg_count_focus')
						
						// 改变显示UI
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
						
						// 更新电影报刊内容{
						scope.page=count
						
						scope.movieMsgResource=$resource(moviesPress+scope.page);	// 电影报刊Resource
	
						scope.movieMsg=scope.movieMsgResource.query();	// 更新电影报刊
						// }
					}
				}
			},
			templateUrl: 'views/components/templates/movieMsg.ejs'
		}
	})