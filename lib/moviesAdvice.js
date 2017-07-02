var redis=require('redis'),
db=redis.createClient()

function MoviesAdvice(obj){
	for(var key in obj){
		this[key]=obj[key]
	}
}

module.exports=MoviesAdvice

// 保存建议
MoviesAdvice.prototype.saveRange=function(fn){
	var moviesAdviceJSON=JSON.stringify(this)
	
	db.lpush('moviesAdvice',moviesAdviceJSON,function(err){
		if(err) return fn(err) 	
		fn()
	})
}

// 获取建议
MoviesAdvice.getRange=function(from,to,fn){
	
	db.lrange('moviesAdvice',from,to,function(err,items){
		
		var arr=[]
		
		if(err) return fn(err)
		items.forEach(function(item){
			arr.push(JSON.parse(item))
		})
		
		fn(null,arr)
	})
}

// 获取总数
MoviesAdvice.getPage=function(fn){
	db.llen('moviesAdvice',fn)
}












