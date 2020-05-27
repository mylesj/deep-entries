import { deepEntriesIterator } from './deep-entries-iterator.js'

export const deepEntries = (input, mapFn) =>
	Array.from(deepEntriesIterator(input, mapFn))
