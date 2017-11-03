var example = require('./example')
console.time('benchmark result')

var MAX = 1000000;

for (var i = 0; i < MAX; i++){
  var a = example.func(example.args)
}
console.timeEnd('benchmark result');
console.log(a)

