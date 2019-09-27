'use strict'

function Suite(){

	let errors = 0
	let failures = 0
	let passes = 0
	let total = 0

	function test(comparator, comparison){
		let comparatorValue
		let error
		let status
		let testResult
		
		try{
			comparatorValue = comparator()
			testResult = comparison(comparatorValue)
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

		total += 1
		const functionBody = Suite.getFunctionBody(comparison)
		const comparatorBody = Suite.getFunctionBody(comparator)
		const message = [
			`${total}:	${functionBody}`
		]
		if(status === 'fail'){
			message.push(`	${comparatorBody} == ${comparatorValue}`)
		}
		if(error){
			message.push(`	${error.stack}`)
		}else{
			if(testResult !== true && testResult !== false){
				message.push(`	=> ${testResult}`)
			}
		}
		test.log(message.join('\n'), status)
		return {
			comparatorBody,
			error,
			functionBody,
			status,
			testResult
		}
	}
	test.count = function(){
		test.log(`Error:	${errors}`, 'error')
		test.log(`Fail:	${failures}`, 'fail')
		test.log(`Pass:	${passes}`, 'pass')
		test.log(`TOTAL:	${total}`, (passes === total ? 'pass' : 'fail'))
	}
	test.log = Suite.log
	test.reset = function(){
		errors = 0
		failures = 0
		passes = 0
		total = 0
	}
	test.reset()
	return test
}
Suite.log = (nil=>{
	if(typeof module === 'undefined'){
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
		const colors = {
			black: '\x1b[30m',
			green: '\x1b[92m',
			red: '\x1b[91m',
			reset: '\x1b[0m',
			yellow: '\x1b[93m'
		}
		const mapping = {
			error: colors.red,
			fail: colors.red,
			normal: colors.reset,
			pass: colors.green
		}
		return function(message, type='normal'){
			const style = `${mapping[type]}`
			console.log(`${style}${message}${colors.reset}`)
		}
	}
})()
Suite.getFunctionBody = (nil=>{
	const matcher = new RegExp([
		/(?:^\s*function\s*\(.*\)\s*\{\s*)/,
		/(?:\s*\}\s*$)/,
		/(?:^.*?=>\s*\{?\s*)/
	].map(rx=>rx.source).join('|'), 'gm')

	return function(fn){
		const body = fn.toString().replace(matcher, '')
		return body
	}
})()

if(typeof module !== 'undefined' && module.exports){
	module.exports = Suite
}