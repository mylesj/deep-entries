import { deepEntriesIterator } from './deep-entries-iterator.mjs'

export const deepEntries = (input, mapFn) =>
	Array.from(deepEntriesIterator(input, mapFn))
