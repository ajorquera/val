import Val from './Val';
import { call, getProp, flip } from './operators'

export default class Vueval {
	constructor(context = null) {
		this._context = context;
		this._valsMap = new Map();
	}

	static create(...args) {
		return new Vueval(...args)
	}

	touch() {
		Array.from(this._valsMap.values()).forEach(val => val.touch());
	}

	reset() {
		Array.from(this._valsMap.values()).forEach(val => val.reset());
	} 

	get hasError() {
		return Array.from(this._valsMap.values()).some(val => val.hasError);
	}

	get invalid() {
		return Array.from(this._valsMap.values()).some(val => val.isInvalid);
	}

	unWatch(name) {	
		this._valsMap.values().forEach(call('unWatch'));
	}

	watch(name) {
		const val = this._valsMap.get(name);

		if (this._watch && val) {
			const watcher = this._watch(name, val.validate.bind(val), ...this._watchArgs);
			val.setWatcher(watcher);
		}
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

	setWatch(fn, ...options) {
		this._watch = fn;
		this._watchArgs = options;
	}

	destroy() {
		this._valsMap.values().forEach(call('destroy'));
		this._valsMap.clear();
		
		this._valsMap   = null;
		this._context   = null;
		this._watch     = null;
		this._watchArgs = null;
	}
}

