import { deepEntriesIterator } from '../src/deep-entries-iterator'
import { delimitEntry } from '../src/delimit-entry'

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
				expect(step.value).toEqual(expected)
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
				expect(step.value).toEqual(expected)
			})
		)

		it(`-> complete`, () => {
			step = iterator.next()
			expect(step.done).toBe(true)
			expect(step.value).toBe(undefined)
		})
	})

	describe('should handle array indices the same as object keys, preserving type', () => {
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
			['b', 0, 0],
			['c', '1', 0, 0],
			['c', '1', 1, '1', 0],
			['c', '1', 1, '2', 0],
			['c', '1', 2, 0]
		].forEach(expected =>
			it(`[${expected.join(', ')}]`, () => {
				step = iterator.next()
				expect(step.done).toBe(false)
				expect(step.value).toEqual(expected)
			})
		)

		it(`-> complete`, () => {
			step = iterator.next()
			expect(step.done).toBe(true)
			expect(step.value).toBe(undefined)
		})
	})

	describe('array members', () => {
		it('should not return non-numeric members of arrays', () => {
			const input = Object.assign([1, 2], {
				foo: true
			})
			const expected = [[0, 1], [1, 2]]
			const actual = Array.from(deepEntriesIterator(input))
			expect(actual).toEqual(expected)
		})

		it('should return undefined entries of sparse arrays', () => {
			const input = [1, , 3]
			const expected = [[0, 1], [1, undefined], [2, 3]]
			const actual = Array.from(deepEntriesIterator(input))
			expect(actual).toEqual(expected)
		})
	})

	describe('input type Map', () => {
		it('should return entries, ignoring object members', () => {
			const input = Object.assign(
				new Map([[1, true], [{ 2: true }, true], ['foo', true]]),
				{
					bar: true
				}
			)
			const expected = [[1, true], [{ 2: true }, true], ['foo', true]]
			const actual = Array.from(deepEntriesIterator(input))
			expect(actual).toEqual(expected)
		})

		it('should return deep nested entries', () => {
			const input = {
				value: new Map([
					[true, { foo: 0 }],
					[false, { foo: 0 }],
					[true, new Map([[false, { bar: 0, baz: 0 }]])]
				])
			}
			const expected = [
				['value', true, false, 'bar', 0],
				['value', true, false, 'baz', 0],
				['value', false, 'foo', 0]
			]
			const actual = Array.from(deepEntriesIterator(input))
			expect(actual).toEqual(expected)
		})
	})

	describe('input type Set', () => {
		it('should return entries, ignore object members', () => {
			const input = Object.assign(new Set([1, 'a', { foo: true }]), {
				bar: true
			})
			const expected = [[1, 1], ['a', 'a'], [{ foo: true }, 'foo', true]]
			const actual = Array.from(deepEntriesIterator(input))
			expect(actual).toEqual(expected)
		})

		it('should return deep nested entries', () => {
			const input = {
				value: new Set([
					1,
					'two',
					{
						[3]: 1
					},
					{
						[3]: 2
					},
					new Set([
						{
							[4]: 0,
							[5]: 0
						}
					])
				])
			}
			const expected = [
				['value', 1, 1],
				['value', 'two', 'two'],
				['value', { [3]: 1 }, '3', 1],
				['value', { [3]: 2 }, '3', 2],
				[
					'value',
					new Set([{ [4]: 0, [5]: 0 }]),
					{ [4]: 0, [5]: 0 },
					'4',
					0
				],
				[
					'value',
					new Set([{ [4]: 0, [5]: 0 }]),
					{ [4]: 0, [5]: 0 },
					'5',
					0
				]
			]
			const actual = Array.from(deepEntriesIterator(input))
			expect(actual).toEqual(expected)
		})
	})

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
				expect(step.value).toEqual(expected)
			})
		)

		it(`-> complete`, () => {
			step = iterator.next()
			expect(step.done).toBe(true)
			expect(step.value).toBe(undefined)
		})
	})

	describe('should ignore entries where a transform returns "undefined"', () => {
		const input = {
			start: true,
			a: undefined,
			b: [undefined],
			c: {
				[1]: [
					undefined,
					{
						[1]: undefined,
						[2]: undefined
					},
					undefined
				]
			},
			finish: true
		}
		const iterator = deepEntriesIterator(input, entry =>
			entry.slice(-1).pop() !== undefined ? entry : undefined
		)
		let step
		;[
			['start', true], //
			['finish', true]
		].forEach(expected =>
			it(`[${expected.join(', ')}]`, () => {
				step = iterator.next()
				expect(step.done).toBe(false)
				expect(step.value).toEqual(expected)
			})
		)

		it(`-> complete`, () => {
			step = iterator.next()
			expect(step.done).toBe(true)
			expect(step.value).toBe(undefined)
		})
	})
})
