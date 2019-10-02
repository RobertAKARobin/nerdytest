# Nerdytest

## Features

1. No duplication of logic between test code and test descriptions, because the code _is_ the description.

2. Use whatever comparison operators you want. No new API or domain-specific language to learn.

3. Prints expected vs actual values.

4. Every thing runs in normal JavaScript order. No `.before`/`.after` hooks or needing to worry about asynchronicity.

5. Small with zero dependencies.

## Structure

Code: 

```js
function capitalize(input){
	return input.substring(0,1).toUpperCase() + input.substring(1)
}
```

Test:

```js
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
```

Console output:

```txt
1:	PASS
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
ReferenceError: oops is not defined...
4:	FAIL
	a=>oops('banana')
		= ReferenceError
	(a)=>a === 'Banana'
5:	PASS
	a=>oops('banana')
	(a)=>a instanceof Error
	
ERROR:	1
FAIL:	2
PASS:	2
TOTAL:	5
```

## Motivation

These tests pass, but shouldn't and/or are useless, which wouldn't be obvious from the console output because the descriptions don't match the code:

```js
test('.capitalize() uppercases the first letter', ()=>{
	return true
})
test('.capitalize() uppercases the first letter', ()=>{
	const capitalized = capitalize('banana')
	assert('Banana').equals('Banana')
})
```