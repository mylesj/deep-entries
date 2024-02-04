import { rotateEntry } from './rotate-entry.mjs'

export const delimitEntryBy = (delimiter) => (entry) => {
    if (entry === undefined) return
    const [value, ...keys] = rotateEntry(entry)
    return [keys.join(delimiter), value]
}

export const delimitEntry = delimitEntryBy('.')
