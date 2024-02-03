import { expect } from 'chai'

import { delimitEntryBy, delimitEntry } from '../src/index.mjs'

describe('delimitEntryBy', () => {
	it('should return undefined if the input is undefined', () => {
		const expected = undefined
		const actual = delimitEntryBy()(undefined)
		expect(actual).to.equal(expected)
	})

	it('should return a thunk', () => {
		const expected = 'function'
		const actual = typeof delimitEntryBy()
		expect(expected).to.equal(actual)
	})

	it('should always return a new object reference', () => {
		const input = ['1', 2]
		const actual = delimitEntryBy()(input)
		expect(actual).not.to.equal(input)
	})

	it('should concatenate keys with the specified delimiter', () => {
		const input = ['1', '2', '3', 4]
		const expected = ['1:2:3', 4]
		const actual = delimitEntryBy(':')(input)
		expect(actual).to.deep.equal(expected)
	})
})

describe('delimitEntry', () => {
	it('should return undefined if the input is undefined', () => {
		const expected = undefined
		const actual = delimitEntry(undefined)
		expect(actual).to.equal(expected)
	})

	it('should concatenate keys in a dot-delimited notation', () => {
		const input = ['1', '2', '3', 4]
		const expected = ['1.2.3', 4]
		const actual = delimitEntry(input)
		expect(actual).to.deep.equal(expected)
	})
})
