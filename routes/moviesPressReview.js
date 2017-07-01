var Review=require('../lib/moviesPressReview')

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
