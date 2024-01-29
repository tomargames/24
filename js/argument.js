export default class Argument {
	constructor(index, value) {
		this._index = index;
		this._value = value;
		this._disabled = false;
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
}