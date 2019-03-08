export function* entriesIterator(input) {
	switch (Object.prototype.toString.call(input)) {
		case '[object Array]':
			yield* input.entries()
			break

		case '[object Set]':
			let i = 0
			for (let value of input) yield [i++, value]
			break

		case '[object Map]':
			yield* input.entries()
			break

		case '[object Object]':
			for (let key in input)
				if (input.hasOwnProperty(key)) yield [key, input[key]]
			break
	}
}
