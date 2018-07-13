import { curry, all, any, transform, compose } from 'fp'

// is
export const isObject = (...args) => args.all(obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null);
export const isString = (str) => typeof str === 'string';
export const isNumber = (numb) => typeof numb === 'number';
export const isArray = (...args) => args.all(Array.isArray);
export const isEqual = (a, b) => a === b;
export const isObjEqual = (a, b) => isObject(a,b) ? JSON.stringify(a) === JSON.stringify(b) : false;
export const isArrayEqual = (a, b) => isArray(a, b) ? a.all((item,i) => a[i] === b[i]) : false;
export const isEmail = (str) => str.indexOf('@') > 0;
export const isEmptyString = (str) => typeof str === 'string' ? str === '' : str;
export const isEmptyObject = (obj) => typeof obj === 'object' ? Object.keys(obj).length : obj;
export const isEmptyArray = (obj) => Array.isArray(obj) ? arr.length : arr;

// logical
const gt = (a, b) => a > b;
const lt = (a, b) => a < b;
const bt = (a,b,c) => greaterThan(a,b) && lessThan(a,c);

// len
const arrayLen = (arr) => isArray(obj) ? arr.length : arr;
const strLen = (str) => isStr(str) ? str.length : str;
const objectLen = (obj) => isObject(obj) ? Object.keys(obj).length : obj;

// strings
export const hasLetters = (str) => str.match(/[a-z]/i);
export const hasNumbers = (str) => str.match(/[0-9]/i);
export const hasSpace = (str) => /\s/.test(str);
export const isCapitalize = (str) => str[0] === str[0].toUpperCase();
export const isCapitalizeWords = (words) => words.split('\s').all(isCapitalize);

// composing
export const isEmpty = any(isEmptyArray, isEmptyObject, isEmptyString);
export const isRequired = (val) => !isEmpty(val);
export const isEqual = any(isObjEqual, isArrayEqual, isEqual);

export const greaterThan = curry(transform(gt, toLength));
export const lessThan = curry(transform(lt, toLength));
export const between = curry(transform(bt, toLength));

export const toLength = compose(arrayLen, objectLen, strLen);
export const numbOrStr = any(isNumb, isStr);
export const maxLength = compose(lessThan, toLength)
export const minLength = compose(greaterThan, toLength)

export const isAlphaNumeric = all(hasLetters, hasNumbers, not(hasSpace))

export default {
	
}