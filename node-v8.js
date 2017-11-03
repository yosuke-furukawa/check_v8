const V8OptimizationStatus = {
  kIsFunction: 1 << 0,
  kNeverOptimize: 1 << 1,
  kAlwaysOptimize: 1 << 2,
  kMaybeDeopted: 1 << 3,
  kOptimized: 1 << 4,
  kTurboFanned: 1 << 5,
  kInterpreted: 1 << 6,
  kMarkedForOptimization: 1 << 7,
  kMarkedForConcurrentOptimization: 1 << 8,
  kOptimizingConcurrently: 1 << 9,
  kIsExecuting: 1 << 10,
  kTopmostFrameIsTurboFanned: 1 << 11,
};

const isNeverOptimize = function isNeverOptimize(fn) {
  const optStatus = %GetOptimizationStatus(fn);
  return (optStatus & V8OptimizationStatus.kNeverOptimize) !== 0;
}

const isAlwaysOptimize = function isAlwaysOptimize(fn) {
  const optStatus = %GetOptimizationStatus(fn);
  return (optStatus & V8OptimizationStatus.kAlwaysOptimize) !== 0;
}

const isInterpreted = function isInterpreted(fn) {
  const optStatus = %GetOptimizationStatus(fn);
  return (optStatus & V8OptimizationStatus.kOptimized) === 0 &&
    (optStatus & V8OptimizationStatus.kInterpreted) !== 0;
}

const isOptimized = function isOptimized(fn) {
  const optStatus = %GetOptimizationStatus(fn);
  return (optStatus & V8OptimizationStatus.kOptimized) !== 0;
}

const isCrankshafted = function isCrankshafted(fn) {
  const optStatus = %GetOptimizationStatus(fn);
  return (optStatus & V8OptimizationStatus.kOptimized) !== 0 &&
    (optStatus & V8OptimizationStatus.kTurboFanned) === 0;
}

const isTurboFanned = function isTurboFanned(fn) {
  const optStatus = %GetOptimizationStatus(fn);
  return (optStatus & V8OptimizationStatus.kOptimized) !== 0 &&
    (optStatus & V8OptimizationStatus.kTurboFanned) !== 0;
}

const optimized = function optimized(fn) {
  const optStatus = %GetOptimizationStatus(fn);
  return !isNeverOptimize(fn) && 
    (optStatus & V8OptimizationStatus.kIsFunction !== 0 && isOptimized(fn));
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
