var MoviesPress=require('../lib/moviesPress')
var Review=require('../lib/moviesPressReview')

// 显示报刊单独页面
exports.show=function(req,res,next){
	Review.getRange(count,0,-1,function(err,reviews){
		if(err) return next(err)
		
		reviews=reviews
		
		res.render('moviePress/moviePress.ejs',{
			reviews:reviews
		})
	})
}

// 显示
exports.list=function(req,res,next){
	MoviesPress.getRange(0,-1,function(err,moviesPress){
		MoviesPress.getRangePro(0,-1,function(err,moviesProperty){
			if(err) return next(err)
			
			res.render('moviesPress.ejs',{
				moviesPress:moviesPress,
				moviesProperty:moviesProperty
			})
		})
	})
}

// 显示咨询
exports.showMore=function(req,res,next){
	MoviesPress.getRange(0,-1,function(err,moviesPress){
		res.json(moviesPress)
	})
}
