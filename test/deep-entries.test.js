import { expect } from 'chai'

import { deepEntries, delimitEntry } from '../src/index.mjs'

describe('deepEntries', () => {
    describe('input attributes', () => {
        it('should not return prototype members', () => {
            const input = Object.assign(Object.create({ foo: true }), {
                bar: true,
            })
            const expected = [['bar', true]]
            const actual = deepEntries(input)
            expect(actual).to.deep.equal(expected)
        })

        it('should only return enumerable members', () => {
            const input = Object.defineProperties(
                {},
                {
                    foo: {
                        value: true,
                        enumerable: true,
                    },
                    bar: {
                        value: true,
                    },
                },
            )
            const expected = [['foo', true]]
            const actual = deepEntries(input)
            expect(actual).to.deep.equal(expected)
        })

        it('should ignore "mapFn" not of type "function"', () => {
            const deepCollection = [
                { foo: 1 }, //
                [1, 2],
            ]
            const expected = [
                [['foo', 1]], //
                [
                    [0, 1],
                    [1, 2],
                ],
            ]
            const actual = deepCollection.map(deepEntries)
            expect(actual).to.deep.equal(expected)
        })
    })

    describe('output', () => {
        it('should return an empty array for primitive input', () => {
            const input = [true, null, undefined, 42, 'string', Symbol()]
            const expected = Array(6).fill([])
            const actual = input.map(deepEntries)
            expect(actual).to.deep.equal(expected)
        })

        it('should return entries in insertion order', () => {
            const input = {
                a: 1,
                b: 2,
                c: 3,
            }
            const expected = [
                ['a', 1], //
                ['b', 2], //
                ['c', 3],
            ]
            const actual = deepEntries(input)
            expect(actual).to.deep.equal(expected)
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
                            [2]: 0,
                        },
                        [3]: 0,
                    },
                },
                d: 0,
            }
            const expected = [
                ['a', 0],
                ['b', '1', 0],
                ['c', '1', '1', 0],
                ['c', '1', '2', '1', 0],
                ['c', '1', '2', '2', 0],
                ['c', '1', '3', 0],
                ['d', 0],
            ]
            const actual = deepEntries(input)
            expect(actual).to.deep.equal(expected)
        })

        it('should handle array indices the same as object keys, preserving type', () => {
            const input = {
                a: 0,
                b: [0],
                c: {
                    [1]: [
                        0,
                        {
                            [1]: 0,
                            [2]: 0,
                        },
                        0,
                    ],
                },
            }
            const expected = [
                ['a', 0],
                ['b', 0, 0],
                ['c', '1', 0, 0],
                ['c', '1', 1, '1', 0],
                ['c', '1', 1, '2', 0],
                ['c', '1', 2, 0],
            ]
            const actual = deepEntries(input)
            expect(actual).to.deep.equal(expected)
        })

        it('should not return non-numeric members of arrays', () => {
            const input = Object.assign([1, 2], {
                foo: true,
            })
            const expected = [
                [0, 1],
                [1, 2],
            ]
            const actual = deepEntries(input)
            expect(actual).to.deep.equal(expected)
        })

        it('should return undefined entries of sparse arrays', () => {
            const input = [1, , 3]
            const expected = [
                [0, 1],
                [1, undefined],
                [2, 3],
            ]
            const actual = deepEntries(input)
            expect(actual).to.deep.equal(expected)
        })

        it('should return entries for objects of type Map', () => {
            const input = Object.assign(
                new Map([
                    [1, true],
                    [{ 2: true }, true],
                    ['foo', true],
                    [true, { foo: 0 }],
                    [false, { foo: 0 }],
                    [true, new Map([[false, { bar: 0, baz: 0 }]])],
                ]),
                {
                    bar: true,
                },
            )
            const expected = [
                [1, true],
                [{ 2: true }, true],
                ['foo', true],
                [true, false, 'bar', 0],
                [true, false, 'baz', 0],
                [false, 'foo', 0],
            ]
            const actual = deepEntries(input)
            expect(actual).to.deep.equal(expected)
        })

        it('should return entries for objects of type Set', () => {
            const input = Object.assign(
                new Set([
                    1,
                    'a',
                    {
                        [3]: 1,
                    },
                    {
                        [3]: 1,
                    },
                    new Set([
                        {
                            [4]: 0,
                            [5]: 0,
                        },
                    ]),
                ]),
                {
                    bar: true,
                },
            )
            const expected = [
                [0, 1],
                [1, 'a'],
                [2, '3', 1],
                [3, '3', 1],
                [4, 0, '4', 0],
                [4, 0, '5', 0],
            ]
            const actual = deepEntries(input)
            expect(actual).to.deep.equal(expected)
        })

        it('should optionally apply a transform function', () => {
            const input = {
                a: 0,
                b: [0],
                c: {
                    [1]: [
                        0,
                        {
                            [1]: 0,
                            [2]: 0,
                        },
                        0,
                    ],
                },
            }
            const expected = [
                ['a', 0],
                ['b.0', 0],
                ['c.1.0', 0],
                ['c.1.1.1', 0],
                ['c.1.1.2', 0],
                ['c.1.2', 0],
            ]
            const actual = deepEntries(input, delimitEntry)
            expect(actual).to.deep.equal(expected)
        })
    })

    it('should ignore entries where a transform returns "undefined"', () => {
        const input = {
            start: true,
            a: undefined,
            b: [undefined],
            c: {
                [1]: [
                    undefined,
                    {
                        [1]: undefined,
                        [2]: undefined,
                    },
                    undefined,
                ],
            },
            finish: true,
        }
        const expected = [
            ['start', true], //
            ['finish', true],
        ]
        const actual = deepEntries(input, (entry) =>
            entry.slice(-1).pop() !== undefined ? entry : undefined,
        )
        expect(actual).to.deep.equal(expected)
    })

    describe('circular references', () => {
        it('should ignore references', () => {
            const input = { a: 1 }
            input.b = input

            const expected = [['a', 1]]
            const actual = deepEntries(input)

            expect(actual).to.deep.equal(expected)
        })

        it('should ignore deeply nested references', () => {
            const input = { a: 1, b: { c: 1 } }
            input.b.ref = input

            const expected = [
                ['a', 1],
                ['b', 'c', 1],
            ]
            const actual = deepEntries(input)

            expect(actual).to.deep.equal(expected)
        })

        it('should ignore deep-referenced references', () => {
            const input = { a: 1, b: { c: { d: 1 } } }
            input.b.c.ref = input.b

            const expected = [
                ['a', 1],
                ['b', 'c', 'd', 1],
            ]
            const actual = deepEntries(input)

            expect(actual).to.deep.equal(expected)
        })

        it('should handle crossed references', () => {
            const input = { a: { b: 1 }, c: { d: 2 } }
            input.a.e = input.c
            input.c.f = input.a

            const expected = [
                ['a', 'b', 1],
                ['a', 'e', 'd', 2],
                ['c', 'd', 2],
                ['c', 'f', 'b', 1],
            ]
            const actual = deepEntries(input)

            expect(actual).to.deep.equal(expected)
        })

        it('should handle sibling references', () => {
            const input = { a: [{ b: 1 }] }
            input.a.push(input.a[0])

            const expected = [
                ['a', 0, 'b', 1],
                ['a', 1, 'b', 1],
            ]
            const actual = deepEntries(input)

            expect(actual).to.deep.equal(expected)
        })
    })
})
