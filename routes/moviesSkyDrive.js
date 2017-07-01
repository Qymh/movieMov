var MoviesSkyDrive=require('../lib/moviesSkyDrive')

// 显示管理
exports.list=function(req,res,next){
	MoviesSkyDrive.getRange(0,-1,function(err,moviesSkyDrive){
		MoviesSkyDrive.getRangePro(0,-1,function(err,moviesSkyDriveProperty){
			if(err) return next(err)
			
			res.render('moviesSkyDriveAgent.ejs',{
				moviesSkyDrive:moviesSkyDrive,
				moviesSkyDriveProperty:moviesSkyDriveProperty
			})
		})
	})
}

// 显示网盘界面
exports.show=function(req,res,next){
	MoviesSkyDrive.getPage(function(err,total){
		res.render('moviesSkyDrive.ejs',{
			total:total
		})
	})
}

// 显示单独的网盘界面
exports.showNew=function(req,res,next){
	var count=req.params.count
	res.render('moviesSkyDrive/moviesSkyDrive.ejs')
}

// 获取搜索的网盘单独页面
exports.search=function(req,res,next){
	var count=req.params.count
	console.log(count)
	
	var obj={
		page:0,
		perpage:6,
		from:0,
		to:5,
	}
	var page=req.session.moviesSkyDrivePage||obj
	
	MoviesSkyDrive.getRange(page.from,page.to,function(err,moviesSkyDrive){
			moviesSkyDrive.forEach(function(movie){
				var src=movie.src
				var arr=[]
				if(src==count){
					arr[0]=movie
					res.json(arr)
				}
			})
	})
}
