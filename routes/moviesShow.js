var MoviesAll=require('../lib/moviesAll')

exports.list=function(req,res,next){
	MoviesAll.getPage(function(err,total){
		res.render('moviesShow.ejs',{
			total:total
		})
	})
}

exports.show=function(req,res,next){
	var count=req.params.count
	res.render('movies/movies.ejs')
}

exports.showNew=function(req,res,next){
	var count=req.params.count
	res.render('movies/'+count+'.ejs')
}

exports.search=function(req,res,next){
	var count=req.params.count
	
	var obj={
		page:0,
		perpage:6,
		from:0,
		to:5,
	}
	var page=req.session.moviesAllPage||obj
	
	MoviesAll.getRange(page.from,page.to,function(err,moviesAll){
			moviesAll.forEach(function(movie){
				var src=movie.src
				var arr=[]
				if(src==count){
					arr[0]=movie
					res.json(arr)
				}
			})
	})
}

exports.searchNew=function(req,res,next){
	var count=req.params.count
	
	MoviesAll.getRange(0,7,function(err,moviesAll){
			moviesAll.forEach(function(movie){
				var src=movie.src
				var arr=[]
				if(src==count){
					arr[0]=movie
					res.json(arr)
				}
			})
	})
}
