export default class Argument {
	constructor(id, index, value) {
		this._id = id;
		this._index = index;
		this._value = value;
		this._disabled = false;
		// console.log(`constructed argument with index ${this._index}, value ${this._value}`);
	}
	getIndex() {
		return this._index;
	}
	getValue() {
		return this._value;
	}
	getDisabled() {
		return this._disabled;
	}
	setDisabled(bool) {
		this._disabled = bool;
	}
	getId() {
		return this._id;
	}
}