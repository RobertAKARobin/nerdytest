if(typeof module !== 'undefined' && module.exports){
	var Suite = require('./index')
}

function capitalize(input){
	return input.substring(0,1).toUpperCase() + input.substring(1)
}

const suite = new Suite()
const test = suite.test.bind(suite)
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
suite.count()

const expectedMessages = `1:	PASS
	a=>capitalize('banana')
	(a)=>a === 'Banana'
2:	FAIL
	a=>capitalize('banana')
		= Banana
	b=>capitalize('bAnAnA')
		= BAnAnA
	(a,b)=>a === b
3:	ERROR
	()=>oops('banana') === 'Banana'
ReferenceError: oops is not defined
4:	FAIL
	a=>oops('banana')
		= ReferenceError
	(a)=>a === 'Banana'
5:	PASS
	a=>oops('banana')
	(a)=>a instanceof Error`.split(/\n(?=\d\:)/)
suite.tests.forEach((completedTest, index)=>{
	const expectedMessage = expectedMessages[index].trim()
	const actualMessage = (index === 2 ? completedTest.message.split('\n').slice(0,3).join('\n') : completedTest.message)
	test(
		a=>actualMessage,
		b=>expectedMessage,
		(a,b)=>a == b
	)
})
suite.count()