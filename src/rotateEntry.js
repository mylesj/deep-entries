export const rotateEntry = entry => {
	const keys = entry.slice(0, -1)
	const value = entry.slice(-1)
	return [...value, ...keys]
}
