export function* entriesIterator(input) {
	if (Array.isArray(input) || input instanceof Map || input instanceof Set)
		yield* input.entries()
	else if (typeof input === 'object')
		for (let key in input)
			if (input.hasOwnProperty(key)) yield [key, input[key]]
}
