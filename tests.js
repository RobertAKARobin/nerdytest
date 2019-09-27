if(typeof module !== 'undefined' && module.exports){
	var Suite = require('./main')
}

const test = new Suite()
test($=>2 + 2 == $, 4)
test($=>2 + 2 == $, 4)
test($=>'a' - 3 == foo)
test.count()