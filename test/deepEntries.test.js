import { deepEntries } from '../src/deepEntries'
import { delimitEntry } from '../src/delimitEntry'

describe('deepEntries', () => {
	describe('input attributes', () => {
		it('should not return prototype members', () => {
			const input = Object.assign(Object.create({ foo: true }), {
				bar: true
			})
			const expected = [['bar', true]]
			const actual = deepEntries(input)
			expect(actual).toEqual(expected)
		})

		it('should only return enumerable members', () => {
			const input = Object.defineProperties(
				{},
				{
					foo: {
						value: true,
						enumerable: true
					},
					bar: {
						value: true
					}
				}
			)
			const expected = [['foo', true]]
			const actual = deepEntries(input)
			expect(actual).toEqual(expected)
		})

		it('should ignore "mapFn" not of type "function"', () => {
			const deepCollection = [
				{ foo: 1 }, //
				[1, 2]
			]
			const expected = [
				[['foo', 1]], //
				[['0', 1], ['1', 2]]
			]
			const actual = deepCollection.map(deepEntries)
			expect(actual).toEqual(expected)
		})
	})

	describe('default output', () => {
		it('should return an empty array for primitive input', () => {
			const input = [true, null, undefined, 42, 'string', Symbol()]
			const expected = Array(6).fill([])
			const actual = input.map(deepEntries)
			expect(actual).toEqual(expected)
		})

		it('should return entries in insertion order', () => {
			const input = {
				a: 1,
				b: 2,
				c: 3
			}
			const expected = [
				['a', 1], //
				['b', 2], //
				['c', 3]
			]
			const actual = deepEntries(input)
			expect(actual).toEqual(expected)
		})

		it('should return deep entries as variable-length arrays', () => {
			const input = {
				a: 0,
				b: { [1]: 0 },
				c: {
					[1]: {
						[1]: 0,
						[2]: {
							[1]: 0,
							[2]: 0
						},
						[3]: 0
					}
				},
				d: 0
			}
			const expected = [
				['a', 0],
				['b', '1', 0],
				['c', '1', '1', 0],
				['c', '1', '2', '1', 0],
				['c', '1', '2', '2', 0],
				['c', '1', '3', 0],
				['d', 0]
			]
			const actual = deepEntries(input)
			expect(actual).toEqual(expected)
		})

		it('should handle array indices the same as object keys', () => {
			const input = {
				a: 0,
				b: [0],
				c: {
					[1]: [
						0,
						{
							[1]: 0,
							[2]: 0
						},
						0
					]
				}
			}
			const expected = [
				['a', 0],
				['b', '0', 0],
				['c', '1', '0', 0],
				['c', '1', '1', '1', 0],
				['c', '1', '1', '2', 0],
				['c', '1', '2', 0]
			]
			const actual = deepEntries(input)
			expect(actual).toEqual(expected)
		})
	})

	describe('custom transform', () => {
		it('should optionally apply a transform function', () => {
			const input = {
				a: 0,
				b: [0],
				c: {
					[1]: [
						0,
						{
							[1]: 0,
							[2]: 0
						},
						0
					]
				}
			}
			const expected = [
				['a', 0],
				['b.0', 0],
				['c.1.0', 0],
				['c.1.1.1', 0],
				['c.1.1.2', 0],
				['c.1.2', 0]
			]
			const actual = deepEntries(input, delimitEntry)
			expect(actual).toEqual(expected)
		})
	})
})
