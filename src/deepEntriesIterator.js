export function* deepEntriesIterator(obj, transformFn = x => x) {
	for (let [key, value] of Object.entries(obj)) {
		if (typeof value !== 'object') yield transformFn([key, value])
		else
			for (let entries of deepEntriesIterator(value))
				yield transformFn([key, ...entries])
	}
}
