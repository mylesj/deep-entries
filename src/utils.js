export const identity = x => x

export const getInterface = x => {
	const str = Object.prototype.toString.call(x)
	return str.substring(8, str.length - 1) // [object ...]
}

export const isObjectLike = x => {
	const tag = getInterface(x)
	switch (tag) {
		case 'String':
		case 'Number':
		case 'Boolean':
		case 'RegExp':
		case 'Date':
			return false

		default:
			if (tag.startsWith('HTML')) {
				return false
			}

			return typeof x === 'object'
	}
}
