var redis=require('redis'),
db=redis.createClient()

function Review(obj){
	for(var j in obj ){
		this[j]=obj[j]
	}
}

module.exports=Review

Review.prototype.save=function(fn){
	var review=this
	db.incr('moviePressReview:ids',function(err,id){
		if(err) return fn(err)
		review.id=id	
	})
	
	db.hmset('moviePressReview:'+review.id,review,function(err){
		fn(err)
	})
}

Review.getInfo=function(id,fn){
	db.hgetall('moviePressReview:'+id,function(err,review){
		fn(null,review)
	})
}

Review.prototype.saveRange=function(count,fn){
	var reviewJSON=JSON.stringify(this)
	
	db.lpush('moviePressReview'+count,reviewJSON,function(err){
		if(err) return fn(err)
		fn()
	})
}

Review.getRange=function(count,from,to,fn){
	db.lrange('moviePressReview'+count,from,to,function(err,items){
		var reviews=[]
		
		items.forEach(function(item){
			reviews.push(JSON.parse(item))
		})
		
		fn(null,reviews)
	})
}











