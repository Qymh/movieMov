angular.module('moviesAdviceCtrl', [])
	.constant('moviesAdvice', '/api/agent/moviesAdvice')
	.constant('size','10')
	.controller('moviesAdviceCtrl', function($scope, $element, $location, $resource, moviesAdvice,size) {
		$scope.navs = [{
				name: '咨询',
				href: '/consultation'
			},
			{
				name: '电影',
				href: '/moviesShow'
			},
			{
				name: '求片区',
				href: '/advice'
			},
			{
				name: '网盘区',
				href: '/moviesSkyDrive'
			}
		]
		
		var section=$element.find('section')
		var sectionEle=angular.element(section)
		var total=sectionEle.attr('total')
		
		$scope.total=total
		
		$scope.page=1
		
		$scope.counts = [] // 所有页数数组

		$scope.countsLength = Math.ceil( $scope.total/ size) //总共页数长度

		for(var i = 1; i <= $scope.countsLength; i++) {
			$scope.counts.push(i)
		}

		$scope.transition = ['...']

		$scope.countsAlone = $scope.counts // 克隆页数数组

		if($scope.countsLength > 5) {
			$scope.counts = $scope.counts.slice(0, 5)
				.concat($scope.transition).concat($scope.counts.slice(-1)) // 初始页数数组
		}
		
		// nav搜索电影
		$scope.searchButton = function() {
			var span = $element.find('nav').find('span')[1];
			var input = $element.find('nav').find('input');
			if(!input.val()) {
				window.alert('请输入内容');
			} else {
				document.location.assign('/moviesSearch?name=' + input.val())
			}
		}

		$scope.searchKeyDown = function(e) {
			if(e.keyCode == 13) {
				$scope.searchButton()
			}
		}

		$scope.moviesAdviceResource = $resource(moviesAdvice+'/'+$scope.page)

		$scope.reviews = $scope.moviesAdviceResource.query()
		
		// 提交评论
		$scope.send = function(msg, name) {
			var now = new Date()
			var year = now.getFullYear()
			var month = now.getMonth() + 1
			var day = now.getDate()
			var hour = now.getHours()
			var minute = now.getMinutes()
			var second = now.getSeconds()
			var time = year + '年' + month + '月' + day + '日' + hour + '时' + minute + '分' + second + '秒'

			var data = {
				msg: msg,
				name: name,
				time: time
			}

			$scope.reviews.push(data)
			
			$scope.reviews.reverse()
			
			$scope.moviesAdviceResource = $resource(moviesAdvice)

			new $scope.moviesAdviceResource(data).$save()
		}
		
		// 在评论区中搜索
		$scope.find=function(){
			var input=document.querySelectorAll('.moviesAdvice_search input')[0]
			var inputEle=angular.element(input)
			var value=inputEle.val()
			
			if(!value){
				window.alert('请输入内容!')
			}else{
				var arr=[]
				var counter=document.querySelectorAll('.moviesAdvice_counter')[0]
				var counterEle=angular.element(counter)
				$scope.moviesAdviceResource = $resource(moviesAdvice)
				
					$scope.moviesAdviceResource.query().$promise.then(function(movies){
						movies.forEach(function(movie){
							if(movie.msg.indexOf(value)>-1){
								arr.push(movie)
							}
						})
						
						$scope.reviews=arr
						
						counterEle.remove()
						
						if($scope.reviews.length==0){
							var review={
								msg:'您搜索的内容不存在'
							}
							$scope.reviews.push(review)
						}
					})
			}
		}
		
		// 改变显示UI
		$scope.change=function(count, $event) {
			if(angular.isNumber(count)) {
				var counts = $scope.countsAlone // 所有页数数组
				var countsLength = $scope.countsAlone.length //页数长度
				var temporaryArr = [] // 临时数组
				var target = $event.target // 获取当前选取的页数
				var targetEle = angular.element(target) // 将当前选择页数设置为元素
				var spans = document.querySelectorAll('.moviesAdvice_counter span') // 获取所有页数
				var spansEle = angular.element(spans) // 将所有页数设置为元素

				// 返回顶部
				window.pageYOffset = 0
				document.documentElement.scrollTop = 0
				document.body.scrollTop = 0

				// 改变焦点UI
				spansEle.removeClass('moviesAdvice_counter_focus')
				targetEle.addClass('moviesAdvice_counter_focus')

				// 改变显示UI
				if(countsLength > 5) {
					if(count > 3 && count < countsLength - 2) {
						temporaryArr = [1, '...', count - 2, count - 1, count, count + 1, count + 2, '..', countsLength]
						$scope.counts = temporaryArr
					} else if(count <= 3) {
						temporaryArr = [1, 2, 3, 4, 5, '...', countsLength]
						$scope.counts = temporaryArr
					} else if(count >= countsLength - 2) {
						temporaryArr = [1, '...', countsLength - 4, countsLength - 3, countsLength - 2, countsLength - 1, countsLength]
						$scope.counts = temporaryArr
					}
				}

				// 更新电影报刊内容{
				$scope.page = count

				$scope.moviesAdviceResource = $resource(moviesAdvice + '/' + $scope.page); // 电影报刊Resource

				$scope.reviews = $scope.moviesAdviceResource.query(); // 更新电影报刊
				// }
			}
		}
	})