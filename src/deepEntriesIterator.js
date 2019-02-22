export function* deepEntriesIterator(obj) {
	for (let [key, value] of Object.entries(obj)) {
		if (typeof value !== 'object') yield [key, value]
		else
			for (let entries of deepEntriesIterator(value))
				yield [key, ...entries]
	}
}
