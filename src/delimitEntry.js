import { rotateEntry } from './rotateEntry'

export const delimitEntryBy = delimiter => entry => {
	const [value, ...keys] = rotateEntry(entry)
	return [keys.join(delimiter), value]
}

export const delimitEntry = delimitEntryBy('.')
