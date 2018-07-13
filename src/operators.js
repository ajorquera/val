export const curry = (fn) => (...xs) => xs.length >= fn.length ? fn(...xs) : curry(fn.bind(null, ...xs));
export const not = (fn) => (...args) => !fn(...args);
export const transform = (fn, transfn) => (val) => fn(transfn(val));
export const all = (...predicates) => val => predicates.every(predicate => predicate(val));
export const any = (...predicates) => val => predicates.some(predicate => predicate(val));
export const compose = (...args) => (val) => args.reduce((result, fn) => fn(result), val);
export const flip = (fn) => (...args) => fn(args.reverse());
export const flow = flip(compose);
export const forEach = (arr, fn) => Array.prototype.forEach.call(arr, fn);
export const where = (scheme) => (toTest) => Object.entries(scheme).every((entry) => entry[1](toTest[entry[0]]));

export default {
	curry,
	not, 
	transform,
	every,
	any,
	compose,
	flow
}