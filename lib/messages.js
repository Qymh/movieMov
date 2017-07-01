var express=require('express'),
res=express.response

res.message=function(msg){
	var sess=this.req.session
	sess.messages=sess.messages||[]
	sess.messages.push({
		msg:msg
	})
}

res.error=function(msg){
	return this.message(msg)
}

module.exports=function(req,res,next){
	res.locals.messages=req.session.messages||[]
	res.locals.removeMessages=function(){
		req.session.messages=[]
	}
	next()
}
