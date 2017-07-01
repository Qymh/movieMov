var redis=require('redis'),
db=redis.createClient();

module.exports=MoviesAll

function MoviesAll(obj){
	for(var key in obj){
		this[key]=obj[key]
	}
}


// 保存电影数据
MoviesAll.prototype.saveRange=function(fn){
	var moviesAllJSON=JSON.stringify(this)
	
	db.lpush('moviesAll',moviesAllJSON,function(err){
		if(err) return fn(err)
		fn()
	})
}

// 获取电影数据
MoviesAll.getRange=function(from,to,fn){
	
	db.lrange('moviesAll',from,to,function(err,items){
		if(err) return fn(err)
		
		var moviesAllResults=[];
		
		items.forEach(function(item){
			moviesAllResults.push(JSON.parse(item))
		})
		
		fn(null,moviesAllResults)
	})
}

// 修改电影
MoviesAll.putRange=function(count,data,fn){
	db.lset('moviesAll',count,data,function(err){
		if(err) fn(err)
		fn(null)
	})
}

// 获取电影一部分
MoviesAll.getRangeChip=function(count,fn){
	db.lindex('moviesAll',count,function(err,movies){
		if(err) return fn(err)
		fn(null,movies)
	})
}

// 保存电影_属性
MoviesAll.prototype.saveRangePro=function(fn){
	var moviesAllJSON=JSON.stringify(this)
	
	db.lpush('moviesProperty',moviesAllJSON,function(err){
		if(err) return fn(err)
		fn()
	})
}

// 获取电影_属性
MoviesAll.getRangePro=function(from,to,fn){
	
	db.lrange('moviesProperty',from,to,function(err,items){
		if(err) return fn(err)
		var moviesAllResults=[];
		
		items.forEach(function(item){
			moviesAllResults.push(JSON.parse(item))
		})
		
		fn(null,moviesAllResults)
	})
}

// 删除电影_属性
MoviesAll.delRangePro=function(count,value){
	db.lrem('moviesProperty',count,value)
}

// 获取电影长度
MoviesAll.getPage=function(fn){
	db.llen('moviesAll',fn)
}














