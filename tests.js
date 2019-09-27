if(typeof module !== 'undefined' && module.exports){
	var Suite = require('./index')
}

const test = new Suite()
test($=>$ == 4, 2 + 2)
test($=>$ < 5, 1 + 2)
test($=>$ == 'foo', 'fo' + 'o')

let didThrow = false
try{
	foo
}catch(e){
	didThrow = true
}
test($=>didThrow)
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