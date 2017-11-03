# V8 engine scripts

- test.js detects your example code is optimized or not.
- benchmark.js measure your example code speed.

```
$ node --allow-natives-syntax test.js
```

# example

```
module.exports = function(...arg) {
  // use rest parameter
  return arg[0]
}
```

## In Node v6

```
node version : v6.9
optimization status is 7
optimization status is 111
interpreted.
turbofanned.
not optimized.
```

## In Node v9

```
node version : v9
optimization status is 49
optimization status is 110001
turbofanned.
optimized.
```
