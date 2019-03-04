export function* entriesIterator(input) {
	if (Array.isArray(input)) {
		if (input.entries) yield* input.entries()
		else for (let i = 0; i < input.length; ++i) yield [i, input[i]]
	} else {
		if (typeof input === 'object')
			for (let key in input)
				if (input.hasOwnProperty(key)) yield [key, input[key]]
	}
}
