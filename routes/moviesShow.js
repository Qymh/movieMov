var MoviesAll=require('../lib/moviesAll')

// 显示电影界面
exports.list=function(req,res,next){
	MoviesAll.getPage(function(err,total){
		res.render('moviesShow.ejs',{
			total:total
		})
	})
}

// 显示单独电影界面
exports.show=function(req,res,next){
	var count=req.params.count
	res.render('movies/movies.ejs')
}

// 显示单独最新电影界面
exports.showNew=function(req,res,next){
	var count=req.params.count
	res.render('movies/movies.ejs')
}

// 按页数搜索电影
exports.search=function(req,res,next){
	var count=req.params.count
	
	var obj={
		page:0,
		perpage:6,
		from:0,
		to:5,
	}
	var page=req.session.moviesAllPage||obj
	
	MoviesAll.getRange(page.from,page.to,function(err,moviesAll){
			moviesAll.forEach(function(movie){
				var src=movie.src
				var arr=[]
				if(src==count){
					arr[0]=movie
					res.json(arr)
				}
			})
	})
}

// 按页数搜索最新电影
exports.searchNew=function(req,res,next){
	var count=req.params.count
	
	MoviesAll.getRange(0,7,function(err,moviesAll){
			moviesAll.forEach(function(movie){
				var src=movie.src
				var arr=[]
				if(src==count){
					arr[0]=movie
					res.json(arr)
				}
			})
	})
}

// 按名字搜索电影
exports.searchMovies=function(req,res,next){
	MoviesAll.getPage(function(err,total){
		res.render('moviesSearch.ejs',{
			total:total
		})
	})
}
