export function* entriesIterator(input) {
	switch (Object.prototype.toString.call(input)) {
		case '[object Array]':
		case '[object Map]':
		case '[object URLSearchParams]':
			yield* input.entries()
			break

		case '[object Set]':
			let i = 0
			for (let value of input) yield [i++, value]
			break

		case '[object Object]':
		default:
			if (typeof input === 'object')
				for (let key in input)
					if (Object.prototype.hasOwnProperty.call(input, key))
						yield [key, input[key]]
			break
	}
}
