var User=require('../lib/user')

exports.list=function(req,res,next){
	res.render('views/register.ejs')
}

exports.send=function(req,res,next){
	var data=req.body
	
	User.getName(data.registerName,function(err,user){
		// 名称被占用	
		if(user.id){
			res.error('名称被占用')
			res.redirect('back')
		}
		
		// 正常注册
		else{
			user=new User({
				name:data.registerName,
				pass:data.registerPassword
			})
			
			user.save(function(err){
				if(err) return next(err)
				req.session.uid=user.id
				res.redirect('/')
			})
		}
	})
}
