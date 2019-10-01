'use strict'

function Suite(){

	let errors = 0
	let failures = 0
	let passes = 0
	let total = 0

	function getComparatorValue(argument){
		if(argument instanceof Function){
			try{
				return argument()
			}catch(e){
				return e
			}
		}else{
			return argument
		}
	}

	function test(/*comparators..., comparison*/){
		let error
		let status
		let testResult

		const comparators = Array.from(arguments)
		const comparison = comparators.pop()
		const comparatorValues = comparators.map(getComparatorValue)
		try{
			testResult = comparison(...comparatorValues)
		}catch(e){
			error = e
		}
		if(error){
			errors += 1
			status = 'ERROR'
		}else if(testResult === true){
			passes += 1
			status = 'PASS'
		}else{
			failures += 1
			status = 'FAIL'
		}

		total += 1
		const message = [
			`${total}:\t${status}`
		]
		comparators.forEach((comparator, index)=>{
			const comparatorValue = comparatorValues[index]
			message.push(`\t${comparator}`)
			if(status !== 'PASS'){
				message.push(`\t\t= ${comparatorValue instanceof Error ? comparatorValue.name : comparatorValue}`)
			}
		})
		message.push(`\t${comparison}`)
		if(status === 'ERROR'){
			message.push(error.stack)
		}
		test.log(message.join('\n'), status)
		// return {
		// 	comparatorBody,
		// 	error,
		// 	functionBody,
		// 	status,
		// 	testResult
		// }
	}
	test.count = function(){
		test.log(`ERROR:\t${errors}`, 'ERROR')
		test.log(`FAIL:\t${failures}`, 'FAIL')
		test.log(`PASS:\t${passes}`, 'PASS')
		test.log(`TOTAL:\t${total}`, (passes === total ? 'PASS' : 'FAIL'))
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
			ERROR: colors.red,
			FAIL: colors.red,
			normal: colors.unset,
			PASS: colors.green
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
			ERROR: colors.red,
			FAIL: colors.red,
			normal: colors.reset,
			PASS: colors.green
		}
		return function(message, type='normal'){
			const style = `${mapping[type]}`
			console.log(`${style}${message}${colors.reset}`)
		}
	}
})()

if(typeof module !== 'undefined' && module.exports){
	module.exports = Suite
}