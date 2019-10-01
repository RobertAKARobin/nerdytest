if(typeof module !== 'undefined' && module.exports){
	var Suite = require('./index')
}

function capitalize(input){
	return input.substring(0,1).toUpperCase() + input.substring(1)
}

var test = new Suite()
var test = new Suite()
test(
	a=>capitalize('banana'),
	(a)=>a === 'Banana'
)
test(
	a=>capitalize('banana'),
	b=>capitalize('bAnAnA'),
	(a,b)=>a === b
)
test(
		()=>oops('banana') === 'Banana'
	)
test(
	a=>oops('banana'),
	(a)=>a === 'Banana'
)
test(
	a=>oops('banana'),
	(a)=>a instanceof Error
)
test.count()