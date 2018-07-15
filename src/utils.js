import { curry, any, compose, every, not } from './operators'

// is
export const isArray = (...args) => args.every(Array.isArray);
export const isEqual = curry((a, b) => a === b);
export const isObjEqual = (a,b) => JSON.stringify(a) === JSON.stringify(b)
export const isArrayEqual = (a, b) => isArray(a, b) ? a.all((item,i) => a[i] === b[i]) : false;
export const isPrimitive = curry((primitive, value) => typeof value === primitive);
export const isEmail = (str) => str.indexOf('@') > 0;
export const isFunctionMap = (fnMap) => fnMap && Object.values(fnMap).every(isFunction);

export const isEqualZero = isEqual(0);

// len
const arrayLength = (arr) => arr.length;
const stringLength = arrayLength;
const objectLength = (obj) => Object.keys(obj).length;

export const isEmptyString = compose(isEqualZero, stringLength);
export const isEmptyObject = compose(isEqualZero, objectLength);
export const isEmptyArray  = compose(isEqualZero, arrayLength);

export const isFunction = isPrimitive('function');
export const isBoolean  = isPrimitive('boolean');
export const isNumber   = isPrimitive('number');
export const isString   = isPrimitive('string');
export const isObject   = isPrimitive('object');

export const isNull       = isEqual(null);
export const isUndefined  = isEqual(undefined);

export const isPredicate = any(isFunction, isFunctionMap);

// logical
export const greaterThan = curry((a, b) => a > b);
export const lessThan = curry((a, b) => a < b);
export const between = curry((a,b,c) => every(greaterThan(c,b), lessThan(c,a)));

// strings
export const matchRegex = curry((regex, val) => regex.test(val));
export const hasLetters = matchRegex(/[a-zA-Z]/);

export const hasNumbers = (str) => str.match(/[0-9]/i);
export const hasSpace = (str) => /\s/.test(str);
export const isCapitalize = (str) => str[0] === str[0].toUpperCase();
export const isCapitalizeWords = (words) => words.split('\s').all(isCapitalize);

// composing
export const isEmpty = any(isEmptyArray, isEmptyObject, isEmptyString, isNull, isUndefined);
export const isRequired = not(isEmpty);

export const toLength = compose(objectLength, arrayLength);

export const numbOrStr = any(isNumber, isString);
export const maxLength = compose(lessThan, toLength);
export const minLength = compose(greaterThan, toLength);

export const isAlphaNumeric = every(hasLetters, hasNumbers, not(hasSpace));

export default {
	
};