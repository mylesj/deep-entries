export type DeepEntry = [unknown, unknown, ...unknown[]]

export declare function deepEntriesIterator<T = DeepEntry>(
	input: unknown,
	mapFn?: (entry: DeepEntry) => T
): IterableIterator<T>

export declare function deepEntries<T = DeepEntry>(
	input: unknown,
	mapFn?: (entry: DeepEntry) => T
): T[]

export declare function rotateEntry(entry: DeepEntry): DeepEntry

export declare function rotateEntryBy(
	n: number
): (entry: DeepEntry) => DeepEntry

export declare function delimitEntry<T = unknown>(entry: DeepEntry): [string, T]

export declare function delimitEntryBy<T = unknown>(
	delimiter: string
): (entry: DeepEntry) => [string, T]
