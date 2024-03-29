import { expect } from 'chai'

import { deepEntriesIterator, delimitEntry } from '../src/index.mjs'

describe('deepEntriesIterator', () => {
    describe('input attributes', () => {
        it('should not return prototype members', () => {
            const input = Object.assign(Object.create({ foo: true }), {
                bar: true,
            })
            const expected = [['bar', true]]
            const actual = Array.from(deepEntriesIterator(input))
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
            const actual = Array.from(deepEntriesIterator(input))
            expect(actual).to.deep.equal(expected)
        })
    })

    describe('should return an empty array for primitive input', () => {
        ;[
            ['Boolean', true],
            ['Null', null],
            ['Undefined', undefined],
            ['Number', 42],
            ['String', 'foobar'],
            ['Symbol', Symbol()],
        ].forEach(([descriptor, input]) =>
            it(descriptor, () => {
                const expected = []
                const actual = Array.from(deepEntriesIterator(input))
                expect(actual).to.deep.equal(expected)
            }),
        )
    })

    describe('deep nested "empty" input', () => {
        it('should return null entries', () => {
            const input = [null, [null]]
            const expected = [
                [0, null], //
                [1, 0, null],
            ]
            const actual = Array.from(deepEntriesIterator(input))
            expect(actual).to.deep.equal(expected)
        })

        it('should return undefined entries', () => {
            const input = [undefined, [undefined]]
            const expected = [
                [0, undefined], //
                [1, 0, undefined],
            ]
            const actual = Array.from(deepEntriesIterator(input))
            expect(actual).to.deep.equal(expected)
        })
    })

    describe('should return an iterator that honours insertion order', () => {
        const input = {
            a: 1,
            b: 2,
            c: 3,
        }
        const iterator = deepEntriesIterator(input)
        let step
        ;[
            ['a', 1], //
            ['b', 2], //
            ['c', 3],
        ].forEach((expected) =>
            it(`[${expected.join(', ')}]`, () => {
                step = iterator.next()
                expect(step.done).to.equal(false)
                expect(step.value).to.deep.equal(expected)
            }),
        )

        it(`-> complete`, () => {
            step = iterator.next()
            expect(step.done).to.equal(true)
            expect(step.value).to.equal(undefined)
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
                        [2]: 0,
                    },
                    [3]: 0,
                },
            },
            d: 0,
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
            ['d', 0],
        ].forEach((expected) =>
            it(`[${expected.join(', ')}]`, () => {
                step = iterator.next()
                expect(step.done).to.equal(false)
                expect(step.value).to.deep.equal(expected)
            }),
        )

        it(`-> complete`, () => {
            step = iterator.next()
            expect(step.done).to.equal(true)
            expect(step.value).to.equal(undefined)
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
                        [2]: 0,
                    },
                    0,
                ],
            },
        }
        const iterator = deepEntriesIterator(input)
        let step
        ;[
            ['a', 0],
            ['b', 0, 0],
            ['c', '1', 0, 0],
            ['c', '1', 1, '1', 0],
            ['c', '1', 1, '2', 0],
            ['c', '1', 2, 0],
        ].forEach((expected) =>
            it(`[${expected.join(', ')}]`, () => {
                step = iterator.next()
                expect(step.done).to.equal(false)
                expect(step.value).to.deep.equal(expected)
            }),
        )

        it(`-> complete`, () => {
            step = iterator.next()
            expect(step.done).to.equal(true)
            expect(step.value).to.equal(undefined)
        })
    })

    describe('array members', () => {
        it('should not return non-numeric members of arrays', () => {
            const input = Object.assign([1, 2], {
                foo: true,
            })
            const expected = [
                [0, 1],
                [1, 2],
            ]
            const actual = Array.from(deepEntriesIterator(input))
            expect(actual).to.deep.equal(expected)
        })

        it('should return undefined entries of sparse arrays', () => {
            const input = [1, , 3]
            const expected = [
                [0, 1], //
                [1, undefined], //
                [2, 3],
            ]
            const actual = Array.from(deepEntriesIterator(input))
            expect(actual).to.deep.equal(expected)
        })
    })

    describe('array-like members', () => {
        describe('should consistently index typed-arrays by number', () => {
            ;[
                Int8Array,
                Uint8Array,
                Uint8ClampedArray,
                Int16Array,
                Uint16Array,
                Int32Array,
                Uint32Array,
                Float32Array,
                Float64Array,
                BigInt64Array,
                BigUint64Array,
            ].forEach((I) =>
                it(I.name, () => {
                    const n = I.name.startsWith('Big') ? 0n : 0
                    const input = I.from([n])
                    const expected = [[0, n]]
                    const actual = Array.from(deepEntriesIterator(input))
                    expect(actual).to.deep.equal(expected)
                }),
            )
        })
    })

    describe('input type Map', () => {
        it('should return entries, ignoring object members', () => {
            const input = Object.assign(
                new Map([
                    [1, true],
                    [{ 2: true }, true],
                    ['foo', true],
                ]),
                {
                    bar: true,
                },
            )
            const expected = [
                [1, true], //
                [{ 2: true }, true], //
                ['foo', true],
            ]
            const actual = Array.from(deepEntriesIterator(input))
            expect(actual).to.deep.equal(expected)
        })

        it('should return deep nested entries', () => {
            const input = {
                value: new Map([
                    [true, { foo: 0 }],
                    [false, { foo: 0 }],
                    [true, new Map([[false, { bar: 0, baz: 0 }]])],
                ]),
            }
            const expected = [
                ['value', true, false, 'bar', 0],
                ['value', true, false, 'baz', 0],
                ['value', false, 'foo', 0],
            ]
            const actual = Array.from(deepEntriesIterator(input))
            expect(actual).to.deep.equal(expected)
        })
    })

    describe('input type URLSearchParams', () => {
        it('should return entries, ignoring object members', () => {
            const input = Object.assign(new URLSearchParams({ foo: true }), {
                bar: true,
            })
            const expected = [['foo', 'true']]
            const actual = Array.from(deepEntriesIterator(input))
            expect(actual).to.deep.equal(expected)
        })

        it('should return deep nested entries', () => {
            const input = {
                value: new URLSearchParams({ foo: true, bar: false }),
            }
            const expected = [
                ['value', 'foo', 'true'],
                ['value', 'bar', 'false'],
            ]
            const actual = Array.from(deepEntriesIterator(input))
            expect(actual).to.deep.equal(expected)
        })
    })

    describe('input type Set', () => {
        it('should return entries, ignoring object members', () => {
            const input = Object.assign(
                new Set([
                    1, //
                    'a', //
                    { foo: true },
                ]),
                {
                    bar: true,
                },
            )
            const expected = [
                [0, 1], //
                [1, 'a'], //
                [2, 'foo', true],
            ]
            const actual = Array.from(deepEntriesIterator(input))
            expect(actual).to.deep.equal(expected)
        })

        it('should return deep nested entries', () => {
            const input = {
                value: new Set([
                    1,
                    'two',
                    {
                        [3]: 1,
                    },
                    {
                        [3]: 2,
                    },
                    new Set([
                        {
                            [4]: 0,
                            [5]: 0,
                        },
                    ]),
                ]),
            }
            const expected = [
                ['value', 0, 1],
                ['value', 1, 'two'],
                ['value', 2, '3', 1],
                ['value', 3, '3', 2],
                ['value', 4, 0, '4', 0],
                ['value', 4, 0, '5', 0],
            ]
            const actual = Array.from(deepEntriesIterator(input))
            expect(actual).to.deep.equal(expected)
        })
    })

    describe('not-normally-enumerated builtin object', () => {
        describe('it should return empty, ignoring object members', () => {
            it('when regex', () => {
                const input = Object.assign(/foo/, {
                    bar: true,
                })
                const expected = []
                const actual = Array.from(deepEntriesIterator(input))
                expect(actual).to.deep.equal(expected)
            })

            it('when date', () => {
                const input = Object.assign(new Date(), {
                    bar: true,
                })
                const expected = []
                const actual = Array.from(deepEntriesIterator(input))
                expect(actual).to.deep.equal(expected)
            })

            it('when boxed number', () => {
                const input = Object.assign(new Number(1), {
                    bar: true,
                })
                const expected = []
                const actual = Array.from(deepEntriesIterator(input))
                expect(actual).to.deep.equal(expected)
            })

            it('when boxed boolean', () => {
                const input = Object.assign(new Boolean(true), {
                    bar: true,
                })
                const expected = []
                const actual = Array.from(deepEntriesIterator(input))
                expect(actual).to.deep.equal(expected)
            })

            it('when boxed string (builtin iterator)', () => {
                const input = new String('foo')
                const expected = []
                const actual = Array.from(deepEntriesIterator(input))
                expect(actual).to.deep.equal(expected)
            })
        })

        it('should return deep nested entries', () => {
            const input = {
                regex: /foo/,
                date: new Date(),
                boxedNumber: new Number(1),
                boxedBoolean: new Boolean(true),
                boxedString: new String('foo'),
            }
            const expected = [
                ['regex', input.regex],
                ['date', input.date],
                ['boxedNumber', input.boxedNumber],
                ['boxedBoolean', input.boxedBoolean],
                ['boxedString', input.boxedString],
            ]
            const actual = Array.from(deepEntriesIterator(input))
            expect(actual).to.deep.equal(expected)
        })
    })

    describe('DOM elements', () => {
        const mockElement = (tagName) => {
            class MockElement {
                get [Symbol.toStringTag]() {
                    return tagName
                }
            }
            return new MockElement()
        }

        const mockNodeList = (...els) => {
            class MockNodeList {
                *[Symbol.iterator]() {
                    yield* els
                }
                get [Symbol.toStringTag]() {
                    return 'NodeList'
                }
            }
            return new MockNodeList()
        }

        describe('it should return empty, ignoring object members', () => {
            ;['HTMLElement', 'HTMLImageElement', 'HTMLAnchorElement'].forEach(
                (el) =>
                    it(el, () => {
                        const input = Object.assign(mockElement(el), {
                            foo: true,
                        })
                        const expected = []
                        const actual = Array.from(deepEntriesIterator(input))
                        expect(actual).to.deep.equal(expected)
                    }),
            )
        })

        describe('it should return deep nested entries', () => {
            const el1 = mockElement('HTMLElement')
            const el2 = mockElement('HTMLImageElement')
            const el3 = mockElement('HTMLAnchorElement')
            const input = mockNodeList(el1, el2, el3)
            const expected = [
                [0, el1],
                [1, el2],
                [2, el3],
            ]
            const actual = Array.from(deepEntriesIterator(input))
            expect(actual).to.deep.equal(expected)
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
                        [2]: 0,
                    },
                    0,
                ],
            },
        }
        const iterator = deepEntriesIterator(input, delimitEntry)
        let step
        ;[
            ['a', 0],
            ['b.0', 0],
            ['c.1.0', 0],
            ['c.1.1.1', 0],
            ['c.1.1.2', 0],
            ['c.1.2', 0],
        ].forEach((expected) =>
            it(`[${expected.join(', ')}]`, () => {
                step = iterator.next()
                expect(step.done).to.equal(false)
                expect(step.value).to.deep.equal(expected)
            }),
        )

        it(`-> complete`, () => {
            step = iterator.next()
            expect(step.done).to.equal(true)
            expect(step.value).to.equal(undefined)
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
                        [2]: undefined,
                    },
                    undefined,
                ],
            },
            finish: true,
        }
        const iterator = deepEntriesIterator(input, (entry) =>
            entry.slice(-1).pop() !== undefined ? entry : undefined,
        )
        let step
        ;[
            ['start', true], //
            ['finish', true],
        ].forEach((expected) =>
            it(`[${expected.join(', ')}]`, () => {
                step = iterator.next()
                expect(step.done).to.equal(false)
                expect(step.value).to.deep.equal(expected)
            }),
        )

        it(`-> complete`, () => {
            step = iterator.next()
            expect(step.done).to.equal(true)
            expect(step.value).to.equal(undefined)
        })
    })
})
