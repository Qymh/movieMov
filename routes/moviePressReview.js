var Review=require('../lib/moviePressReview')

exports.list=function(req,res,next){
	var params=req.params
	count=params.count
	req.session.count=res.locals.count=count
	
	Review.getRange(count,0,-1,function(err,reviews){
		if(err) return next(err)
		
		reviews=reviews
		
		res.render('moviePress/moviePress.ejs',{
			reviews:reviews
		})
	})
	
}

exports.send=function(req,res,next){
	var data=req.body
	var des=data.usersViewDes
	var count=req.session.count
	
	var review=new Review({
		des:des
	})
	
	review.saveRange(count,function(err){
		if(err) return next(err)
		res.redirect('back')
	})
}
