
module.exports=function(fn,perpage){
	perpage=perpage||10
	return function(req,res,next){
		var page=req.params.page||1
		page=page-1
	
		fn(function(err,total){
			
			req.moviesAdvicePage=res.locals.moviesAdvicePage={
				number:page||0,
				perpage:perpage||10,
				from:page*perpage||0,
				to:page*perpage+perpage-1||9,
				total:total,
				count:Math.ceil(total/perpage)
			}
			
			next()
		})
	}
}
