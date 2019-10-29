/**
 * function cartesian
 *
 * Generate any possible combination of elements from n arrays
 *
 * @args 1...n string arrays
 */
exports.cartesian = function() {
  var r = [],
    arg = arguments,
    max = arg.length - 1;
  function helper(arr, i) {
    for (var j = 0, l = arg[i].length; j < l; j++) {
      var a = arr.slice(0); // clone arr
      a.push(arg[i][j]);
      if (i == max) r.push(a);
      else helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
};

/**
 * function randomDate
 * generate a randomDate between two dates
 *
 * @param start
 * Start Date
 *
 * @param end
 * End Date
 */
exports.randomDate = function(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};
