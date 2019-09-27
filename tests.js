if(typeof module !== 'undefined' && module.exports){
	var Suite = require('./index')
}

function addTwo(num){
	return num + 3
}

const test = new Suite()
test($=>addTwo(5), $=>$ === 7)
test(`addTwo(5)`)

// const test2plus2 = test($=>$ == 4, 2 + 2)
// test(test2plus2Body=>test2plus2Body == '$ == 4', test2plus2.functionBody)
// test($=>$ < 5, 1 + 2)
// test($=>$ == 'foo', 'fo' + 'o')

// let didThrow = false
// try{
// 	foo
// }catch(e){
// 	didThrow = true
// }
// test($=>didThrow)

// const testIIFE = test(function(a, b){
// 	return (function(){
// 		return true
// 	})()
// })
// test(iifeBody=>iifeBody == `return (function(){
// 		return true
// 	})()`, testIIFE.functionBody)
// test((a,b)=>{
// 	return true
// })
// test(nil=>true)
// test.count()