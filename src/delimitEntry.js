export const delimitEntryBy = delimiter => entry => {
	const keys = entry.slice(0, -1)
	const value = entry.slice(-1)
	return [keys.join(delimiter), ...value]
}

export const delimitEntry = delimitEntryBy('.')
