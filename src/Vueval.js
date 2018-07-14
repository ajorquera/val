import Val from './Val';

export default class Vueval {
	constructor(context = null) {
		this._context = context;
		this._valsMap = new Map();
	}

	static create(...args) {
		return new Vueval(...args)
	}

	touch() {
		this.vals.forEach(val => val.touch());
	}

	reset() {
		this.vals.forEach(val => val.reset());
	} 

	get(name) {
		return this._valsMap.get(name);
	}

	get hasError() {
		return this.vals.some(val => val.hasError);
	}

	get isInvalid() {
		return this.vals.some(val => val.isInvalid);
	}

	get reasons() {
		return this.vals.reduce((set, val) => {
			const reasons = Array.from(val.reasons);
			set.add(reasons)
		}, new Set)
	}

	get vals() {
		return Array.from(this._valsMap.values());
	}

	addVal(name, predicate) {
		const val = new Val(name, predicate, this._context);

		this._valsMap.set(name, val);
		this[name] = val;

		return val;
	}

	removeVal(name) {
		const val = this._valsMap.get(name);
		
		if(val) {
			this._valsMap.remove(name);
			delete this[name];
			val.destroy();
		} 
	}

	destroy() {
		this.values.forEach(val => val.destroy());
		this._valsMap.clear();
		
		this._valsMap   = null;
		this._context   = null;
	}
}

