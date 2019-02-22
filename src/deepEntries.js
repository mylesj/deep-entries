import { deepEntriesIterator } from './deepEntriesIterator'

export const deepEntries = object => Array.from(deepEntriesIterator(object))
