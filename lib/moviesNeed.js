var redis=require('redis'),
db=redis.createClient()

function moviesNeed(obj){
	for(var key in obj){
		this[key]=obj[key]
	}
}
