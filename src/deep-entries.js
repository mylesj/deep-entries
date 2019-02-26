import { deepEntriesIterator } from './deep-entries-iterator'

export const deepEntries = (input, mapFn) =>
	Array.from(deepEntriesIterator(input, mapFn))
