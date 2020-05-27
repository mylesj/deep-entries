import { getInterface, isObjectLike } from './utils.js'

export function* entriesIterator(input) {
	switch (getInterface(input)) {
		case 'Array':
		case 'Map':
		case 'URLSearchParams':
			yield* input.entries()
			break

		case 'Set':
		case 'NodeList':
		case 'Int8Array':
		case 'Uint8Array':
		case 'Uint8ClampedArray':
		case 'Int16Array':
		case 'Uint16Array':
		case 'Int32Array':
		case 'Uint32Array':
		case 'Float32Array':
		case 'Float64Array':
		case 'BigInt64Array':
		case 'BigUint64Array':
			let i = 0
			for (let value of input) yield [i++, value]
			break

		case 'Object':
		default:
			if (isObjectLike(input))
				for (let key in input)
					if (Object.prototype.hasOwnProperty.call(input, key))
						yield [key, input[key]]
			break
	}
}
