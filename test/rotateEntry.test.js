import { rotateEntry } from '../src/rotateEntry'

describe('rotateEntry', () => {
	describe('should rotate the order of an entry by one and', () => {
		it('always return a new object reference', () => {
			const input = ['1', 2]
			const actual = rotateEntry(input)
			expect(input).not.toBe(actual)
		})

		it('put the value first for simple entries', () => {
			const input = ['1', 2]
			const expected = [2, '1']
			const actual = rotateEntry(input)
			expect(expected).toEqual(actual)
		})

		it('put the value first for variable-length entries', () => {
			const input = ['1', '2', '3', 4]
			const expected = [4, '1', '2', '3']
			const actual = rotateEntry(input)
			expect(expected).toEqual(actual)
		})
	})
})
