var MoviesPress=require('../lib/moviesPress')

exports.list=function(req,res,next){
	MoviesPress.getPage(function(err,total){
		res.render('homepage.ejs',{
			total:total
		})
	})
	
}
