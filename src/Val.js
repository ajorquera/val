import { isFunctionMap, isFunction, isBoolean } from './utils';
import { not } from './operators';

const isNotBoolean = not(isBoolean);

export default class Val {
	constructor(name, validation, context) {
		this.name = name;
		this.reasons = new Set();

		this._context = context;

		this._setValidation(validation);
		this.reset();
	}

	static create(...args) {
		return new Val(...args);
	}
	
	get hasError () {
		return this.isInvalid && this.isTouched;
	}

	get isValid() {
		!this.isInvalid;
	}

	touch() {
		this.isTouched = true;
	}

	reset() {
		this.isTouched = false;
		this.reasons.clear();
		this.validate();
	}

	validate(val) {
		const isValid = this._validation(val);
		
		if(isNotBoolean(isValid)) throw new Error(`${this.name}: Predicate doesn't return a boolean`);
		
		this.isInvalid = !isValid;
	}
	
	_setValidation(fn) {

		if(isFunctionMap(fn)) {
			const fnMap = fn;
			const entries = Object.entries(fnMap);
			
			this._validation = (val) => {
				entries.forEach(([name, predicate]) => {
					const isValid = predicate.call(this._context, val);
					this._setReason(name, isValid);
				});

				return this.reasons.size === 0;
			};

		} else if(isFunction(fn)) {
			this._validation = fn.bind(this._context);
		} else {
			throw new Error(`${this.name}: is not a valid validation`);
		}
	}

	_setReason(name, isValid) {
		if(isValid) {
			this.reasons.delete(name);
		} else {
			this.reasons.add(name);
		}
	}

	destroy() {
		this.reasons.clear();

		this.reasons     = null;
		this.isInvalid   = null;
		this.isTouched   = null;
		this.name        = null;
		this.reasons     = null;

		this._context    = null;
		this._validation = null;
	}
}