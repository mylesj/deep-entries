export function* entriesIterator(input) {
	if (Array.isArray(input) || input instanceof Map) yield* input.entries()
	else if (input instanceof Set) {
		let i = 0
		for (let value of input) yield [i++, value]
	} else if (typeof input === 'object')
		for (let key in input)
			if (input.hasOwnProperty(key)) yield [key, input[key]]
}
