import Val from './Val';
import { call, getProp } from './operators'

export class Vueval {
	constructor(context = null) {
		this._context = context;
		this._valsMap = new Map();
	}

	static create(...args) {
		return new Vueval(...args)
	}

	touch() {
		this._valsMap.values().forEach(call('touch'));
	}

	reset() {
		this._valsMap.values().forEach(call('touch'));
	} 

	get hasError() {
		return this._valsMap.values().every(getProp('hasError'));
	}

	unWatch(name) {	
		this._valsMap.values().forEach(call('unWatch'));
	}

	watch(name) {
		const val = this._valsMap.get(name);

		if (this._watch && val) {
			const watcher = this._watch(name, val.validate.bind(val));
			val.setWatcher(watcher);
		}
	}

	addVal(name, value) {
		const val = new Val(name, value, this._context);

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

	setWatch(fn) {
		this._watch = fn;
	}

	destroy() {
		this._valsMap.values().forEach(call('destroy'));
		this._valsMap.clear();
		
		this._valsMap = null;
		this._context = null;
		this._watch   = null;
	}
}

