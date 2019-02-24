import { deepEntriesIterator } from './deepEntriesIterator'

export const deepEntries = (object, transformFn) => {
	if (typeof transformFn !== 'function')
		return Array.from(deepEntriesIterator(object))

	const entries = []
	for (let entry of deepEntriesIterator(object))
		entries.push(transformFn(entry))
	return entries
}
