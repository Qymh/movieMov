var redis=require('redis'),
db=redis.createClient();

module.exports=MoviesPress

function MoviesPress(obj){
	for(var key in obj){
		this[key]=obj[key]
	}
}


// 保存电影数据
MoviesPress.prototype.saveRange=function(fn){
	var moviesPressJSON=JSON.stringify(this)
	
	db.lpush('moviesPress',moviesPressJSON,function(err){
		if(err) return fn(err)
		fn()
	})
}

// 获取电影数据
MoviesPress.getRange=function(from,to,fn){
	
	db.lrange('moviesPress',from,to,function(err,items){
		if(err) return fn(err)
		
		var moviesPressResults=[];
		
		items.forEach(function(item){
			moviesPressResults.push(JSON.parse(item))
		})
		
		fn(null,moviesPressResults)
	})
}

// 修改电影
MoviesPress.putRange=function(count,data,fn){
	db.lset('moviesPress',count,data,function(err){
		if(err) fn(err)
		fn(null)
	})
}

// 获取电影一部分
MoviesPress.getRangeChip=function(count,fn){
	db.lindex('moviesPress',count,function(err,movies){
		if(err) return fn(err)
		fn(null,movies)
	})
}

// 保存电影_属性
MoviesPress.prototype.saveRangePro=function(fn){
	var moviesPressJSON=JSON.stringify(this)
	
	db.lpush('moviesPressProperty',moviesPressJSON,function(err){
		if(err) return fn(err)
		fn()
	})
}

// 获取电影_属性
MoviesPress.getRangePro=function(from,to,fn){
	
	db.lrange('moviesPressProperty',from,to,function(err,items){
		if(err) return fn(err)
		var moviesPressResults=[];
		
		items.forEach(function(item){
			moviesPressResults.push(JSON.parse(item))
		})
		
		fn(null,moviesPressResults)
	})
}

// 删除电影_属性
MoviesPress.delRangePro=function(count,value){
	
	db.lrem('moviesPressProperty',count,value)
}

// 获取电影报刊长度
MoviesPress.getPage=function(fn){
	db.llen('moviesPress',fn)
}















