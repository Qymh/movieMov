var Review=require('../lib/moviesPressReview'),		// 评论模版
MoviesAll=require('../lib/moviesAll'),		// 获取电影模版
MoviesPress=require('../lib/moviesPress') 	// 获取电影海报模版 
MoviesSkyDrive=require('../lib/moviesSkyDrive')	// 获取电影网盘模版


/*****************************获取报刊评论开始*******************************/

// 获取报刊评论
exports.moviePressReview=function(req,res,next){
	var params=req.params,
	count=params.count
	
	Review.getRange(count,0,-1,function(err,reviews){
		if(err) return next(err)
		res.json(reviews)
	})
}

// 提交报刊评论
exports.moviePressReviewAdd=function(req,res,next){
	var data=req.body,
	des=data.des,
	time=data.time,
	name=data.name
	var count=req.session.count
	
	var review=new Review({
		des:des,
		time:time,
		name:name
	})
	
	review.saveRange(count,function(err){
		if(err) return next(err)
		res.redirect('back')
	})
}

// 获取搜索的报刊
exports.moviesPressInformation=function(req,res,next){
	var count=req.params.count
	var page=req.session.moviesPressPage
	MoviesPress.getRange(page.from,page.to,function(err,movies){
		movies.forEach(function(movie){
			var src=movie.src
			var arr=[]
			if(src==count){
				arr[0]=movie
				res.json(arr)
			}
		})
	})
}

/*****************************获取报刊评论结束*******************************/

/*****************************获取电影信息开始*******************************/

// 获取最新电影
exports.getMoviesAllNew=function(req,res,next){
	MoviesAll.getRange(0,7,function(err,moviesAllNew){
		res.json(moviesAllNew)
	})
}

// 获取所有电影
exports.getMovies=function(req,res,next){
	var arrJSON=[]
	
	MoviesAll.getRange(0,-1,function(err,movies){
		res.json(movies)
	})
}

// 获取电影一部分
exports.getMoviesAll=function(req,res,next){
	var page=req.moviesAllPage
	MoviesAll.getRange(page.from,page.to,function(err,moviesAll){
		res.json(moviesAll)
	})
}

// 提交电影
exports.postMoviesAll=function(req,res,next){
	var data=req.body
	
	var moviesAll=new MoviesAll(data)
	
	moviesAll.saveRange(function(err){
		if(err) return next(err)
		res.redirect('/agent/moviesAllSetting')
	})
}

// 修改电影
exports.putMoviesAll=function(req,res,next){
	var data=req.body
	
	var property=req.body.property,
	value=req.body.value,
	count=req.body.count
	
	data={
		property:property,
		value:value
	}
	
	MoviesAll.getRangeChip(count,function(err,movies){
		if(err) return next(err)
		movies=JSON.parse(movies)
		
		for(var key in movies){
			if(key==property){
				movies[key]=value
			}
		}
		
		movies=JSON.stringify(movies)
		
		MoviesAll.putRange(count,movies,function(err){
			if(err) next(err)
		})
	})
}


// 获取电影_属性
exports.getMoviesAllProperty=function(req,res,next){
	MoviesAll.getRangePro(0,-1,function(err,moviesAllProperty){
		res.json(moviesAllProperty)
	})
}

// 添加电影_属性
exports.postMoviesAllProperty=function(req,res,next){
	var data=req.body
	
	var moviesProperty=new MoviesAll(data)
	
	moviesProperty.saveRangePro(function(err){
		if(err) return next(err)
		res.redirect('/agent/moviesAllSetting')
	})
	
}

// 删除电影_属性
exports.deleteMoviesAllProperty=function(req,res,next){
	var property=req.params.property
	
	var data={
		property:property
	}
	
	data=JSON.stringify(data)
	
	MoviesAll.delRangePro(1,data)
}

/*****************************获取电影信息完毕*******************************/

/*****************************获取报刊信息开始*******************************/

// 获取电影报刊
exports.getMoviesPress=function(req,res,next){
	var page=req.session.moviesPressPage=res.locals.moviesPressPage=req.moviesPressPage
	MoviesPress.getRange(page.from,page.to,function(err,moviesPress){
		res.json(moviesPress)
	})
}

// 提交电影报刊
exports.postMoviesPress=function(req,res,next){
	var data=req.body
	
	var moviesPress=new MoviesPress(data)
	
	moviesPress.saveRange(function(err){
		if(err) return next(err)
		res.redirect('/agent/moviesPress')
	})
}

// 修改电影报刊
exports.putMoviesPress=function(req,res,next){
	var data=req.body
	
	var property=req.body.property,
	value=req.body.value,
	count=req.body.count
	
	data={
		property:property,
		value:value
	}
	
	MoviesPress.getRangeChip(count,function(err,movies){
		if(err) return next(err)
		movies=JSON.parse(movies)
		
		for(var key in movies){
			if(key==property){
				movies[key]=value
			}
		}
		
		movies=JSON.stringify(movies)
		
		MoviesPress.putRange(count,movies,function(err){
			if(err) next(err)
		})
	})
}


// 获取电影报刊_属性
exports.getMoviesPressProperty=function(req,res,next){
	MoviesPress.getRangePro(0,-1,function(err,moviesPressProperty){
		res.json(moviesPressProperty)
	})
}

// 添加电影报刊_属性
exports.postMoviesPressProperty=function(req,res,next){
	var data=req.body
	
	var moviesProperty=new MoviesPress(data)
	
	moviesProperty.saveRangePro(function(err){
		if(err) return next(err)
		res.redirect('/agent/moviesPress')
	})
	
}

// 删除电影报刊_属性
exports.deleteMoviesPressProperty=function(req,res,next){
	var property=req.params.property
	
	var data={
		property:property
	}
	
	data=JSON.stringify(data)
	
	MoviesPress.delRangePro(1,data)
}

/*****************************获取报刊信息结束*******************************/

/*****************************获取电影网盘开始*******************************/

// 获取电影网盘
exports.getMoviesSkyDrive=function(req,res,next){
	var page=req.session.moviesSkyDrivePage=res.locals.moviesSkyDrivePage=req.moviesSkyDrivePage
	
	MoviesSkyDrive.getRange(page.from,page.to,function(err,moviesSkyDrive){
		res.json(moviesSkyDrive)
	})
}

// 提交电影网盘
exports.postMoviesSkyDrive=function(req,res,next){
	var data=req.body
	
	var moviesSkyDrive=new MoviesSkyDrive(data)
	
	moviesSkyDrive.saveRange(function(err){
		if(err) return next(err)
		res.redirect('/agent/moviesSkyDrive')
	})
}

// 修改电影网盘
exports.putMoviesSkyDrive=function(req,res,next){
	var data=req.body
	
	var property=req.body.property,
	value=req.body.value,
	count=req.body.count
	
	data={
		property:property,
		value:value
	}
	
	MoviesSkyDrive.getRangeChip(count,function(err,movies){
		if(err) return next(err)
		movies=JSON.parse(movies)
		
		for(var key in movies){
			if(key==property){
				movies[key]=value
			}
		}
		
		movies=JSON.stringify(movies)
		
		MoviesSkyDrive.putRange(count,movies,function(err){
			if(err) next(err)
		})
	})
}


// 获取电影网盘_属性
exports.getMoviesSkyDriveProperty=function(req,res,next){
	MoviesSkyDrive.getRangePro(0,-1,function(err,moviesSkyDriveProperty){
		res.json(moviesSkyDriveProperty)
	})
}

// 添加电影网盘_属性
exports.postMoviesSkyDriveProperty=function(req,res,next){
	var data=req.body
	
	var moviesSkyDriveProperty=new MoviesSkyDrive(data)
	
	moviesSkyDriveProperty.saveRangePro(function(err){
		if(err) return next(err)
		res.redirect('/agent/moviesSkyDrive')
	})
	
}

// 删除电影网盘_属性
exports.deleteMoviesSkyDriveProperty=function(req,res,next){
	var property=req.params.property
	
	var data={
		property:property
	}
	
	data=JSON.stringify(data)
	
	MoviesSkyDrive.delRangePro(1,data)
}
