var MoviesAll=require('../lib/moviesAll')

// 显示
exports.list=function(req,res,next){
	MoviesAll.getRange(0,-1,function(err,moviesAll){
		MoviesAll.getRangePro(0,-1,function(err,moviesProperty){
			if(err) return next(err)
			
			res.render('moviesAll.ejs',{
				moviesAll:moviesAll,
				moviesProperty:moviesProperty
			})
		})
	})
}
