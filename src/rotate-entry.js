export const rotateEntryBy = n => entry => {
	const mod = (-1 * (Number(n) || 0)) % entry.length
	const keys = entry.slice(0, mod)
	const value = entry.slice(mod)
	return [...value, ...keys]
}

export const rotateEntry = rotateEntryBy(1)
