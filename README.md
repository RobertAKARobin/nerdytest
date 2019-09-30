# TestSweet

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
	a=>capitolise('banana'),
	(a)=>a === 'Banana'
)
test(
	a=>capitolise('banana'),
	(a)=>a instanceof Error
)
```

Console output:

```txt
1.	PASS
	a=>capitalize('banana')
	$=>$.a === 'Banana'
2.	FAIL
	a=>capitalize('banana')
		= 'Banana'
	b=>capitalize('bAnAnA')
		= 'BAnAnA'
	a === b
3.	FAIL
	a=>capitolise('banana')
		= ReferenceError
	(a)=>a === 'Banana'
4.	PASS
	a=>capitolise('banana')
		= ReferenceError
	(a)=>a instanceof Error
	
FAIL:	2
PASS:	2
TOTAL:	2
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