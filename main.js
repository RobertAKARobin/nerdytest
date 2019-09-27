window.addEventListener('DOMContentLoaded', ()=>{
	document.body.innerHTML = 'Hello, JS.'
})

function Suite(){
	'use strict';

	let errors = 0
	let failures = 0
	let passes = 0
	let total = 0

	function test(callback, comparator){
		total += 1

		let error
		let status
		let testResult
		
		try{
			testResult = callback(comparator)
		}catch(e){
			error = e
		}
		if(error){
			errors += 1
			status = 'error'
		}else if(testResult === true){
			passes += 1
			status = 'pass'
		}else{
			failures += 1
			status = 'fail'
		}
		const message = [
			`${total}:	${callback.toString()}`
		]
		if(comparator){
			message.push(`	(${comparator})`)
		}
		message.push(`	${status.toUpperCase()}`)
		if(error){
			message.push(`	${error.stack}`)
		}
		test.log(message.join('\n'), status)
	}
	test.count = function(){
		test.log(`Error:	${errors}`, 'error')
		test.log(`Fail:	${failures}`, 'fail')
		test.log(`Pass:	${passes}`, 'pass')
		test.log(`TOTAL:	${total}`, (passes === total ? 'pass' : 'fail'))
	}
	test.log = (nil=>{
		if(window){
			const colors = {
				black: '#000',
				green: '#6F6',
				red: '#F88',
				unset: 'unset'
			}
			const mapping = {
				error: colors.red,
				fail: colors.red,
				normal: colors.unset,
				pass: colors.green
			}
			return function(message, type='normal'){
				const style = `color: ${mapping[type]}`
				console.log(`%c ${message}`, style)
			}
		}else{
			// TODO
			// const colors = {
			// 	black: '\x1b[30m',
			// 	green: '\x1b[92m',
			// 	red: '\x1b[91m',
			// 	reset: '\x1b[0m',
			// 	yellow: '\x1b[93m'
			// }
			// const mapping = {
			// 	error: colors.red,
			// 	fail: colors.red,
			// 	normal: colors.reset,
			// 	pass: colors.green
			// }
			// return function(message, type='normal'){
			// 	const style = `${mapping[type]}`
			// 	console.log(`${style}${message}${colors.reset}`)
			// }
		}
	})()
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