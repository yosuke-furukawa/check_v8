const version = Number(process.versions.node.match(/(\d+\.\d+)/)[1])
console.log('node version : v%s', version);
const checkFunctions = (version < 8) ? require('./node-v6') : require('./node-v8');
const example = require('./example');


function printStatus(fn) {
  const optStatus = %GetOptimizationStatus(fn);
  console.log('optimization status is %s', optStatus);
  console.log('optimization status is %s', optStatus.toString(2));
  if (checkFunctions.isNeverOptimize(fn)) {
    console.log('Never optimized.');
  }
  if (checkFunctions.isAlwaysOptimize(fn)) {
    console.log('Always optimized.');
  }
  if (checkFunctions.isInterpreted(fn)) {
    console.log('interpreted.');
  }
  if (checkFunctions.isCrankshafted(fn)) {
    console.log('crankshafted.');
  }
  if (checkFunctions.isTurboFanned(fn)) {
    console.log('turbofanned.');
  }
  if (checkFunctions.optimized(fn)) {
    console.log('optimized.');
  } else {
    console.log('not optimized.');
  }
}

//Fill type-info
example.func(example.args);
// 2 calls are needed to go from uninitialized -> pre-monomorphic -> monomorphic
example.func(example.args);

%OptimizeFunctionOnNextCall(example.func);
//The next call
example.func(example.args);

//Check
printStatus(example.func);
