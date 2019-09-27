if(typeof module !== 'undefined' && module.exports){
	var Suite = require('./main')
}

const test = new Suite()
test($=>$ == 4, 2 + 2)
test($=>$ == 4, 2 + 2)
test($=>$ == 5, 2 + 2)
test($=>$ == foo, 2 + 2)
test(function(a, b){
	return (function(){
		return true
	})()
})
test((a,b)=>{
	return true
})
test(nil=>true)
test.count()