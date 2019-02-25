import { entriesIterator } from './entriesIterator'

export function* deepEntriesIterator(input, mapFn = x => x) {
	for (let [key, value] of entriesIterator(input)) {
		if (typeof value !== 'object') yield mapFn([key, value])
		else
			for (let entries of deepEntriesIterator(value))
				yield mapFn([key, ...entries])
	}
}
