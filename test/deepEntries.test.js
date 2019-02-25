import { deepEntries } from '../src/deepEntries'
import { delimitEntry } from '../src/delimitEntry'

describe('deepEntries', () => {
	describe('input properties', () => {
		it('should not return prototype members', () => {
			const input = Object.assign(Object.create({ foo: true }), {
				bar: true
			})
			const expected = [['bar', true]]
			const actual = deepEntries(input)
			expect(expected).toEqual(actual)
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
			expect(expected).toEqual(actual)
		})
	})

	describe('default output', () => {
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
			expect(expected).toEqual(actual)
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
			expect(expected).toEqual(actual)
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
			expect(expected).toEqual(actual)
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
			expect(expected).toEqual(actual)
		})
	})
})
