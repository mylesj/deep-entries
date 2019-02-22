export const delimitEntryBy = delimiter => entry => [
	entry.slice(0, -1).join(delimiter),
	...entry.slice(-1)
]

export const delimitEntry = delimitEntryBy('.')
