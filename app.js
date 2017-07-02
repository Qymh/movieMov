var http=require('http'),
express=require('express'),
register=require('./routes/register'),		// 注册路由
sign=require('./routes/sign'),				// 登陆路由
homepage=require('./routes/homepage'),		// 主页路由
moviesAll=require('./routes/moviesAll'),		// 电影管理路由
moviesPress=require('./routes/moviesPress'),	// 电影报刊管理路由
moviesSkyDrive=require('./routes/moviesSkyDrive')	// 电影网盘管理路由
moviePressReview=require('./routes/moviesPressReview'),  // 电影报刊评论路由   	
moviesShow=require('./routes/moviesShow'),	// 电影显示路由
api=require('./routes/api'),				// api路由
messages=require('./lib/messages'),			// 信息提示模版
moviesPressLib=require('./lib/moviesPress'),	// 电影报刊模版
moviesAllLib=require('./lib/moviesAll'),		// 电影模版
moviesSkyDriveLib=require('./lib/moviesSkyDrive'),	// 电影网盘模版
user=require('./lib/middleware/user'),		// 用户信息储存
moviesPressPage=require('./lib/middleware/moviesPress'),	// 电影报刊页数中间件
moviesAllPage=require('./lib/middleware/moviesAll'),		// 电影页数中间件
moviesSkyDrivePage=require('./lib/middleware/moviesSkyDrive') // 电影网盘页数中间件

var app=express()

app.use(express.static(__dirname))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.cookieParser('the secret'))	
app.use(express.session())
app.use(user)
app.use(messages)

// 注册
app.get('/register',register.list)
app.post('/register',register.send)

// 登陆
app.get('/sign',sign.list)
app.post('/sign',sign.send)
app.get('/logout',sign.logout)

// 主页面
app.get('/',homepage.list)

// 电影界面
app.get('/moviesShow',moviesShow.list)

// 电影搜索界面
app.get('/moviesSearch',moviesShow.searchMovies)

// 电影咨询界面
app.get('/consultation',moviesPress.showMore)

// 电影网盘界面
app.get('/moviesSkyDrive',moviesSkyDrive.show)

// 电影的单独界面
app.get('/moviesShow/:count',moviesShow.show)

// 搜索出电影的单独界面
app.get('/moviesSearch/:count',moviesShow.showSearch)

// 最新电影的单独界面
app.get('/moviesNew/:count',moviesShow.showNew)

// 电影网盘单独界面
app.get('/moviesSkyDrive/:count',moviesSkyDrive.showNew)

// 电影报刊
app.get('/moviePress/:count',moviesPress.show)

/*********************************************关于API**********************************************/
app.get('/api/moviePressReview/:count',api.moviePressReview)	// 获取评论
app.post('/api/moviePressReview',api.moviePressReviewAdd)		// 添加评论

/*********关于电影报刊******/
app.get('/api/agent/moviesPress/:page',moviesPressPage(moviesPressLib.getPage,6),api.getMoviesPress)	// 获取电影报刊
app.get('/api/agent/moviesConsultation/:page',moviesPressPage(moviesPressLib.getPage,9),api.getMoviesPress)	// 获取电影报刊

app.post('/api/agent/moviesPress',api.postMoviesPress)			// 提交电影报刊
app.put('/api/agent/moviesPress/:property',api.putMoviesPress)			// 修改电影报刊

app.get('/api/agent/moviesPressProperty',api.getMoviesPressProperty)	// 获取电影报刊_属性
app.post('/api/agent/moviesPressProperty',api.postMoviesPressProperty)	// 提交电影报刊_属性
app.del('/api/agent/moviesPressProperty/:property',api.deleteMoviesPressProperty)	// 删除电影报刊_属性

/**********关于电影******/
app.get('/api/agent/moviesAllSetting',api.getMovies)	// 获取所有电影
app.get('/api/agent/moviesAllSetting/:page',moviesAllPage(moviesAllLib.getPage,6),api.getMoviesAll)	// 获取电影一部分
app.get('/api/agent/moviesAllSettingNew',api.getMoviesAllNew)	// 获取最新电影
app.post('/api/agent/moviesAllSetting',api.postMoviesAll)		// 提交电影
app.put('/api/agent/moviesAllSetting/:property',api.putMoviesAll)			// 修改电影

app.get('/api/agent/moviesAllSettingProperty',api.getMoviesAllProperty)	// 获取电影_属性
app.post('/api/agent/moviesAllSetting/property',api.postMoviesAllProperty)	// 提交电影_属性
app.del('/api/agent/moviesAllSetting/property/:property',api.deleteMoviesAllProperty)	// 删除电影_属性

app.get('/api/agent/moviesShow/:count',moviesShow.search)	// 获取搜索的电影
app.get('/api/agent/moviesSearch/:count',moviesShow.searchAll)	// 获取搜索出电影的搜索
app.get('/api/agent/moviesShowNew/:count',moviesShow.searchNew)	// 获取最新电影的搜索

/**********关于电影网盘*******/
app.get('/api/agent/moviesSkyDrive',api.getMoviesSkyDriveAll)	// 获取所有电影网盘
app.get('/api/agent/moviesSkyDrive/:page',moviesSkyDrivePage(moviesSkyDriveLib.getPage,6),api.getMoviesSkyDrive)	// 获取电影网盘
app.get('/api/agent/moviesSkyDriveSearch',moviesSkyDrive.showSearch)	// 获取搜索电影网盘
app.post('/api/agent/moviesSkyDrive',api.postMoviesSkyDrive)		// 提交电影网盘
app.put('/api/agent/moviesSkyDrive/:property',api.putMoviesSkyDrive)			// 修改电影网盘

app.get('/api/agent/moviesSkyDriveProperty',api.getMoviesSkyDriveProperty)	// 获取电影网盘_属性
app.post('/api/agent/moviesSkyDriveProperty',api.postMoviesSkyDriveProperty)	// 提交电影网盘_属性
app.del('/api/agent/moviesSkyDriveProperty/:property',api.deleteMoviesSkyDriveProperty)	// 删除电影网盘_属性

app.get('/api/agent/moviesSkyDriveOnce/:count',moviesSkyDrive.search)	// 获取网盘的搜索

app.get('/api/agent/moviesPressInformation/:count',api.moviesPressInformation)	// 获取搜索的报刊

/*********************************************API结束**********************************************/

// 管理人员设定电影
app.get('/agent/moviesAllSetting',moviesAll.list)			// 管理电影

// 管理人员设定电影报刊
app.get('/agent/moviesPress',moviesPress.list)			// 管理电影报刊

// 管理人员设定电影网盘
app.get('/agent/moviesSkyDrive',moviesSkyDrive.list)	// 管理电影网盘

http.createServer(app).listen(3000)


/*
 * 获取报刊用户评论api	/api/moviePressReview/:count	count指params
 * 上传报刊用户评论api	/api/moviePressReview
 */
