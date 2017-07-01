var User=require('../lib/user')


exports.list=function(req,res,next){
	res.render('views/sign.ejs')
}

exports.send=function(req,res,next){
	var data=req.body,
	name=data.signName,
	pass=data.signPassword
	
	User.authenticate(name,pass,function(err,user){
		if(err) return next(err)
		if(user){
			req.session.uid=user.id
			res.redirect('/')
		}else{
			res.error('用户名或密码错误')
			res.redirect('back')
		}
	})
}
