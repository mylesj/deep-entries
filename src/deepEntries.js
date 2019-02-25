import { deepEntriesIterator } from './deepEntriesIterator'

export const deepEntries = (object, mapFn) =>
	Array.from(deepEntriesIterator(object, mapFn))
