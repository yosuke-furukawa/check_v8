const V8OptimizationStatus = {
  optimized: 1,
  notOptimized: 2,
  alwaysOptimized: 3,
  neverOptimized: 4,
  maybeDeoptimized: 6,
  turbofanOptimized: 7,
};

const isNeverOptimize = function isNeverOptimize(fn) {
  const optStatus = %GetOptimizationStatus(fn);
  return (optStatus === V8OptimizationStatus.neverOptimize);
}

const isAlwaysOptimize = function isAlwaysOptimize(fn) {
  const optStatus = %GetOptimizationStatus(fn);
  return (optStatus === V8OptimizationStatus.alwaysOptimize);
}

const isInterpreted = function isInterpreted(fn) {
  const optStatus = %GetOptimizationStatus(fn);
  return (optStatus !== V8OptimizationStatus.optimized);
}

const isOptimized = function isOptimized(fn) {
  const optStatus = %GetOptimizationStatus(fn);
  return (optStatus === V8OptimizationStatus.optimized);
}

const isCrankshafted = function isCrankshafted(fn) {
  // unsupported
  return false;
}

const isTurboFanned = function isTurboFanned(fn) {
  const optStatus = %GetOptimizationStatus(fn);
  return optStatus === V8OptimizationStatus.turbofanOptimized;
}

const optimized = function optimized(fn) {
  const optStatus = %GetOptimizationStatus(fn);
  return !isNeverOptimize(fn) && isOptimized(fn);
}

module.exports = {
  isNeverOptimize: isNeverOptimize,
  isAlwaysOptimize: isAlwaysOptimize,
  isInterpreted: isInterpreted,
  isOptimized: isOptimized,
  isCrankshafted: isCrankshafted,
  isTurboFanned: isTurboFanned,
  optimized: optimized,
}
