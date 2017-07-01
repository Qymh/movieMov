var MoviesPress=require('../lib/moviesPress')

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
