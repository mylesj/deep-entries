import { identity } from './utils'
import { entriesIterator } from './entries-iterator'

function* deepEntriesIterator_(input, mapFn, parentCircularSet) {
	const map = typeof mapFn === 'function' ? mapFn : identity
	for (let [key, value] of entriesIterator(input)) {
		if (typeof value !== 'object') {
			const entry = map([key, value])
			if (entry !== undefined) yield entry
		} else {
			const circularSet = parentCircularSet || new WeakSet()
			circularSet.add(input)

			if (!circularSet.has(value)) {
				for (let entries of deepEntriesIterator_(
					value,
					undefined,
					circularSet
				)) {
					const entry = map([key, ...entries])
					if (entry !== undefined) yield entry
				}
			}
		}
	}
}

export function* deepEntriesIterator(input, mapFn) {
	yield* deepEntriesIterator_(input, mapFn)
}
