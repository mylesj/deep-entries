import { identity } from './utils'
import { entriesIterator } from './entries-iterator'

export function* deepEntriesIterator(input, mapFn) {
	const map = typeof mapFn === 'function' ? mapFn : identity
	for (let [key, value] of entriesIterator(input)) {
		if (typeof value !== 'object') yield map([key, value])
		else
			for (let entries of deepEntriesIterator(value))
				yield map([key, ...entries])
	}
}
