var MoviesAdvice=require('../lib/moviesAdvice')

exports.list=function(req,res,next){
	
	MoviesAdvice.getPage(function(err,total){
		res.render('moviesAdvice.ejs',{
			total:total
		})
	})
}
