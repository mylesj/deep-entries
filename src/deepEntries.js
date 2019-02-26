import { deepEntriesIterator } from './deepEntriesIterator'

export const deepEntries = (input, mapFn) =>
	Array.from(deepEntriesIterator(input, mapFn))
