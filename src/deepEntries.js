import { deepEntriesIterator } from './deepEntriesIterator'

export const deepEntries = (object, transformFn) =>
	Array.from(deepEntriesIterator(object, transformFn))
