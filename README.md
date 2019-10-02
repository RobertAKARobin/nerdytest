# Nerdytest

## Features

1. No duplication of logic between test code and test descriptions, because the code _is_ the description.

2. Use whatever comparison operators you want. No new API or domain-specific language to learn.

3. Prints expected vs actual values.

4. Everything runs in normal JavaScript order. No `.before`/`.after` hooks or needing to worry about asynchronicity.

5. Small with zero dependencies.

6. Runs in the browser, Node, or in any other runtime environment out-of-the-box.

## Structure

Install:

```sh
npm install nerdytest
```

Sample code: 

```js
function capitalize(input){
	return input.substring(0,1).toUpperCase() + input.substring(1)
}
```

Test:

```js
const Suite = require('nerdytest')
const suite = new Suite()
const test = suite.test.bind(suite) // Not necessary, but saves some typing versus suite.test
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

## API

### `new Suite()`

Returns an instance of a Suite.

### `suite.test(comparators..., comparison)`

Declare any number of comparators (including zero), then compare them in a comparison function.

* `comparators: anything`: If a function, the function's return value.
* `comparison: function`: A callback, the arguments of which are the comparators. If the function returns `true`, the test passes.

### `suite.count()`

Logs the number of errors, failures, and passes for the test suite.

### `suite.log(style, message)`

Logs a message.

* `style: string ('ERROR' || 'FAIL' || 'PASS')`: Determines the color of the message in the console.
* `message: string`

### `suite.reset()`

Sets the number of errors, failures, and passes for the test suite back to zero.