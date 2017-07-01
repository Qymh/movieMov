var redis=require('redis')
db=redis.createClient()

function MoviesSkyDrive(obj){
	for(var key in obj){
		this[key]=obj[key]
	}
}

module.exports=MoviesSkyDrive

// 储存网盘电影
MoviesSkyDrive.prototype.saveRange=function(fn){
	var MoviesSkyDirveJSON=JSON.stringify(this)
	
	db.lpush('moviesSkyDrive',MoviesSkyDirveJSON,function(err){
		if(err) return fn(err)
		fn()
	})
}

// 获取网盘电影
MoviesSkyDrive.getRange=function(from,to,fn){
	db.lrange('moviesSkyDrive',from,to,function(err,items){
		if(err) return fn(err)
		
		var results=[];
		
		items.forEach(function(item){
			results.push(JSON.parse(item))
		})
		
		fn(null,results)
	})
}

// 修改网盘电影
MoviesSkyDrive.putRange=function(count,data,fn){
	db.lset('moviesSkyDrive',count,data,function(err){
		if(err) fn(err)
		fn(null)
	})
}

// 获取网盘电影一部分
MoviesSkyDrive.getRangeChip=function(count,fn){
	db.lindex('moviesSkyDrive',count,function(err,moviesSkyDrive){
		if(err) return fn(err)
		fn(null,moviesSkyDrive)
	})
}

// 保存网盘电影_属性
MoviesSkyDrive.prototype.saveRangePro=function(fn){
	var moviesAllJSON=JSON.stringify(this)
	
	db.lpush('moviesSkyDriveProperty',moviesAllJSON,function(err){
		if(err) return fn(err)
		fn()
	})
}

// 获取网盘电影_属性
MoviesSkyDrive.getRangePro=function(from,to,fn){
	
	db.lrange('moviesSkyDriveProperty',from,to,function(err,items){
		if(err) return fn(err)
		var results=[];
		
		items.forEach(function(item){
			results.push(JSON.parse(item))
		})
		
		fn(null,results)
	})
}

// 删除网盘电影_属性
MoviesSkyDrive.delRangePro=function(count,value){
	db.lrem('moviesSkyDriveProperty',count,value)
}

// 获取电影网盘长度
MoviesSkyDrive.getPage=function(fn){
	db.llen('moviesSkyDrive',fn)
}












