const get = (obj, path, defValue) => {
  // If path is not defined or it has false value
  if (!path) return undefined;
  // Check if path is string or array. Regex : ensure that we do not have '.' and brackets.
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  // Find value
  const result = pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj);
  // If found value is undefined return default value; otherwise return the value
  return result === undefined ? defValue : result;
};

// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code!
const debounce = (func, delay, { leading } = {}) => {
  let timerId;

  return (...args) => {
    if (!timerId && leading) {
      func(...args);
    }
    clearTimeout(timerId);

    timerId = setTimeout(() => func(...args), delay);
  };
};

function property(path) {
  return function(o) {
    const temp = Array.isArray(path) ? path : path.split('.');
    let res = o;
    while (temp.length && res) {
      res = res[temp.shift()];
    }
    return res;
  };
}

function groupBy(...arrs) {
  let iteratee = arrs.pop();
  iteratee = typeof iteratee === 'function' ? iteratee : property(iteratee);
  return arrs.reduce((acc, arr) => {
    arr.forEach(item => {
      const key = iteratee(item);
      (acc[key] || (acc[key] = [])).push(item);
    });
    return acc;
  }, {});
}

export default {
  get,
  debounce,
  groupBy
};
