import { delimitEntryBy, delimitEntry } from '../src/delimit-entry'

describe('delimitEntryBy', () => {
	it('should return a thunk', () => {
		const expected = 'function'
		const actual = typeof delimitEntryBy()
		expect(expected).toBe(actual)
	})

	it('should always return a new object reference', () => {
		const input = ['1', 2]
		const actual = delimitEntryBy()(input)
		expect(input).not.toBe(actual)
	})

	it('should concatenate keys with the specified delimiter', () => {
		const input = ['1', '2', '3', 4]
		const expected = ['1:2:3', 4]
		const actual = delimitEntryBy(':')(input)
		expect(actual).toEqual(expected)
	})
})

describe('delimitEntry', () => {
	it('should concatenate keys in a dot-delimited notation', () => {
		const input = ['1', '2', '3', 4]
		const expected = ['1.2.3', 4]
		const actual = delimitEntry(input)
		expect(actual).toEqual(expected)
	})
})
