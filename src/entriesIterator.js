export function* entriesIterator(input) {
	for (let key in input)
		if (input.hasOwnProperty(key)) yield [key, input[key]]
}
