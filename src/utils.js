export const identity = x => x

export const isObjectLike = x => {
	switch (Object.prototype.toString.call(x)) {
		case '[object String]':
		case '[object Number]':
		case '[object Boolean]':
		case '[object RegExp]':
		case '[object Date]':
			return false

		default:
			return typeof x === 'object'
	}
}
