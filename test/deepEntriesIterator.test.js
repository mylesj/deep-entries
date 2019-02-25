import { deepEntriesIterator } from '../src/deepEntriesIterator'
import { delimitEntry } from '../src/delimitEntry'

describe('deepEntriesIterator', () => {
	describe('input attributes', () => {
		it('should not return prototype members', () => {
			const input = Object.assign(Object.create({ foo: true }), {
				bar: true
			})
			const expected = [['bar', true]]
			const actual = Array.from(deepEntriesIterator(input))
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
			const actual = Array.from(deepEntriesIterator(input))
			expect(actual).toEqual(expected)
		})
	})

	describe('should return an empty array for primitive input', () => {
		;[
			['Boolean', true],
			['Null', null],
			['Undefined', undefined],
			['Number', 42],
			['String', 'foobar'],
			['Symbol', Symbol()]
		].forEach(([descriptor, input]) =>
			it(descriptor, () => {
				const expected = []
				const actual = Array.from(deepEntriesIterator(input))
				expect(actual).toEqual(expected)
			})
		)
	})

	describe('should return an iterator that honours insertion order', () => {
		const input = {
			a: 1,
			b: 2,
			c: 3
		}
		const iterator = deepEntriesIterator(input)
		let step
		;[
			['a', 1], //
			['b', 2], //
			['c', 3]
		].forEach(expected =>
			it(`[${expected.join(', ')}]`, () => {
				step = iterator.next()
				expect(step.done).toBe(false)
				expect(expected).toEqual(step.value)
			})
		)

		it(`-> complete`, () => {
			step = iterator.next()
			expect(step.done).toBe(true)
			expect(step.value).toBe(undefined)
		})
	})

	describe('should return deep entries as variable-length arrays', () => {
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
		const iterator = deepEntriesIterator(input)
		let step
		;[
			['a', 0],
			['b', '1', 0],
			['c', '1', '1', 0],
			['c', '1', '2', '1', 0],
			['c', '1', '2', '2', 0],
			['c', '1', '3', 0],
			['d', 0]
		].forEach(expected =>
			it(`[${expected.join(', ')}]`, () => {
				step = iterator.next()
				expect(step.done).toBe(false)
				expect(expected).toEqual(step.value)
			})
		)

		it(`-> complete`, () => {
			step = iterator.next()
			expect(step.done).toBe(true)
			expect(step.value).toBe(undefined)
		})
	})

	describe('should handle array indices the same as object keys', () => {
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
		const iterator = deepEntriesIterator(input)
		let step
		;[
			['a', 0],
			['b', '0', 0],
			['c', '1', '0', 0],
			['c', '1', '1', '1', 0],
			['c', '1', '1', '2', 0],
			['c', '1', '2', 0]
		].forEach(expected =>
			it(`[${expected.join(', ')}]`, () => {
				step = iterator.next()
				expect(step.done).toBe(false)
				expect(expected).toEqual(step.value)
			})
		)

		it(`-> complete`, () => {
			step = iterator.next()
			expect(step.done).toBe(true)
			expect(step.value).toBe(undefined)
		})
	})

	describe('custom transform', () => {
		describe('should optionally apply a transform function', () => {
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
			const iterator = deepEntriesIterator(input, delimitEntry)
			let step
			;[
				['a', 0],
				['b.0', 0],
				['c.1.0', 0],
				['c.1.1.1', 0],
				['c.1.1.2', 0],
				['c.1.2', 0]
			].forEach(expected =>
				it(`[${expected.join(', ')}]`, () => {
					step = iterator.next()
					expect(step.done).toBe(false)
					expect(expected).toEqual(step.value)
				})
			)

			it(`-> complete`, () => {
				step = iterator.next()
				expect(step.done).toBe(true)
				expect(step.value).toBe(undefined)
			})
		})
	})
})
