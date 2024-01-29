export default class Argument {
	constructor() {
		this._index = null;
		this._value = null;
		this._disabled = false;
	}
	getIndex() {
		return this._index;
	}
	getValue() {
		return this._value;
	}
}