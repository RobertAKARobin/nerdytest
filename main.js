window.addEventListener('DOMContentLoaded', ()=>{
	document.body.innerHTML = 'Hello, JS.'
})

function Suite(){
	'use strict';

	let errors
	let failures
	let passes
	let total

	function test(callback, comparator){
		total += 1

		let error
		let testResult
		
		console.log(`${total}:	${callback.toString()}`)
		if(comparator){
			console.log(`	(${comparator})`)
		}
		try{
			testResult = callback(comparator)
		}catch(e){
			error = e
		}
		if(error){
			errors += 1
			console.log(`	ERROR`)
			console.log(error)
		}else if(testResult){
			failures += 1
			console.log(`	FAIL`)
		}else{
			passes += 1
			console.log(`	PASS`)
		}
	}
	test.count = function(){
		console.log(`ERROR:	${errors}`)
		console.log(`FAIL:	${failures}`)
		console.log(`PASS:	${passes}`)
		console.log(`TOTAL:	${total}`)
	}
	test.reset = function(){
		errors = 0
		failures = 0
		passes = 0
		total = 0
	}
	test.reset()
	return test
}
const test = new Suite()
test($=>2 + 2 == $, 4)
test($=>2 + 2 == $, 4)
test($=>'a' - 3 == foo)
test.count()