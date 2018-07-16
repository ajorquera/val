export const curry = (fn) => (...xs) => xs.length >= fn.length ? fn(...xs) : curry(fn.bind(null, ...xs));
export const not = (fn) => (...args) => !fn(...args);
export const every = (...predicates) => val => predicates.every(predicate => predicate(val));
export const any = (...predicates) => val => predicates.some(predicate => predicate(val));
export const compose = (...args) => (val) => args.reduce((result, fn) => fn(result), val);
export const flip = (fn) => (...args) => fn(args.reverse());
export const pipe = flip(compose);
export const forEach = (arr, fn) => Array.prototype.forEach.call(arr, fn);
export const where = (scheme) => (toTest) => Object.entries(scheme).every((entry) => entry[1](toTest[entry[0]]));
export const getProp = curry((obj, prop) => obj[prop]);
export const call = curry((method, fn) => fn[method]());
export const or = curry((fnA, fnB) => val => fnA(val) || fnB(val));
export const and = curry((fnA, fnB) => val => fnA(val) && fnB(val));
export const identity = any => () => any;
export default {
	
}