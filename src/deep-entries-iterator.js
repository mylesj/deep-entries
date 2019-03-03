import { identity } from './utils'
import { entriesIterator } from './entries-iterator'

export function* deepEntriesIterator(input, mapFn) {
	const map = typeof mapFn === 'function' ? mapFn : identity
	for (let [key, value] of entriesIterator(input)) {
		if (typeof value !== 'object') {
			const entry = map([key, value])
			if (entry !== undefined) yield entry
		} else
			for (let entries of deepEntriesIterator(value)) {
				const entry = map([key, ...entries])
				if (entry !== undefined) yield entry
			}
	}
}
