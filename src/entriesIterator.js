export function* entriesIterator(input) {
	if (typeof input === 'object')
		for (let key in input)
			if (input.hasOwnProperty(key)) yield [key, input[key]]
}
