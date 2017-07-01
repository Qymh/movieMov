
module.exports=function(fn,perpage){
	perpage=perpage||10
	return function(req,res,next){
		var page=req.params.page||1
		page=page-1
	
		fn(function(err,total){
			if(err) return next(err)
			
			req.moviesSkyDrivePage=res.locals.moviesSkyDrivePage={
				number:page||0,
				perpage:perpage||6,
				from:page*perpage||0,
				to:page*perpage+perpage-1||5,
				total:total,
				count:Math.ceil(total/perpage)
			}
			
			next()
		})
	}
}
