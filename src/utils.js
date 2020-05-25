export const identity = x => x

export const getInterface = x => {
	const str = Object.prototype.toString.call(x)
	return str.substring(8, str.length - 1) // [object ...]
}

export const isObjectLike = x => {
	switch (getInterface(x)) {
		case 'String':
		case 'Number':
		case 'Boolean':
		case 'RegExp':
		case 'Date':
			return false

		default:
			return typeof x === 'object'
	}
}
