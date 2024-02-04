import { expect } from 'chai'

import { rotateEntryBy, rotateEntry } from '../src/index.mjs'

describe('rotateEntryBy', () => {
    it('should return undefined if the input is undefined', () => {
        const expected = undefined
        const actual = rotateEntryBy(0)(undefined)
        expect(actual).to.equal(expected)
    })

    describe('when N is zero', () => {
        it('always return a new object reference', () => {
            const input = ['1', 2]
            const actual = rotateEntryBy(0)(input)
            expect(actual).not.to.equal(input)
        })

        it('should not rotate the entry', () => {
            const input = ['1', 2]
            const expected = ['1', 2]
            const actual = rotateEntryBy(0)(input)
            expect(actual).to.deep.equal(expected)
        })
    })

    describe('when N is less than entry length', () => {
        describe('should rotate the order of an entry by positive integer', () => {
            it('for even length entries', () => {
                const input = ['1', '2', '3', 4]
                const expected = ['3', 4, '1', '2']
                const actual = rotateEntryBy(2)(input)
                expect(actual).to.deep.equal(expected)
            })

            it('for odd length entries', () => {
                const input = ['1', '2', '3', '4', 5]
                const expected = ['3', '4', 5, '1', '2']
                const actual = rotateEntryBy(3)(input)
                expect(actual).to.deep.equal(expected)
            })
        })

        describe('should rotate the order of an entry by negative integer', () => {
            it('for even length entries', () => {
                const input = ['1', '2', '3', 4]
                const expected = ['3', 4, '1', '2']
                const actual = rotateEntryBy(-2)(input)
                expect(actual).to.deep.equal(expected)
            })

            it('for odd length entries', () => {
                const input = ['1', '2', '3', '4', 5]
                const expected = ['4', 5, '1', '2', '3']
                const actual = rotateEntryBy(-3)(input)
                expect(actual).to.deep.equal(expected)
            })
        })
    })

    describe('when N is equal to entry length', () => {
        describe('should not rotate the order of an entry for a positive integer', () => {
            it('for even length entries', () => {
                const input = ['1', '2', '3', 4]
                const expected = ['1', '2', '3', 4]
                const actual = rotateEntryBy(4)(input)
                expect(actual).to.deep.equal(expected)
            })

            it('for odd length entries', () => {
                const input = ['1', '2', '3', '4', 5]
                const expected = ['1', '2', '3', '4', 5]
                const actual = rotateEntryBy(5)(input)
                expect(actual).to.deep.equal(expected)
            })
        })

        describe('should not rotate the order of an entry for a negative integer', () => {
            it('for even length entries', () => {
                const input = ['1', '2', '3', 4]
                const expected = ['1', '2', '3', 4]
                const actual = rotateEntryBy(-4)(input)
                expect(actual).to.deep.equal(expected)
            })

            it('for odd length entries', () => {
                const input = ['1', '2', '3', '4', 5]
                const expected = ['1', '2', '3', '4', 5]
                const actual = rotateEntryBy(-5)(input)
                expect(actual).to.deep.equal(expected)
            })
        })
    })

    describe('when N is greater than entry length', () => {
        describe('should rotate the order of an entry by positive integer', () => {
            it('for even length entries', () => {
                const input = ['1', '2', '3', 4]
                const expected = [4, '1', '2', '3']
                const actual = rotateEntryBy(5)(input)
                expect(actual).to.deep.equal(expected)
            })

            it('for odd length entries', () => {
                const input = ['1', '2', '3', '4', 5]
                const expected = [5, '1', '2', '3', '4']
                const actual = rotateEntryBy(6)(input)
                expect(actual).to.deep.equal(expected)
            })
        })

        describe('should rotate the order of an entry by negative integer', () => {
            it('for even length entries', () => {
                const input = ['1', '2', '3', 4]
                const expected = ['2', '3', 4, '1']
                const actual = rotateEntryBy(-5)(input)
                expect(actual).to.deep.equal(expected)
            })

            it('for odd length entries', () => {
                const input = ['1', '2', '3', '4', 5]
                const expected = ['2', '3', '4', 5, '1']
                const actual = rotateEntryBy(-6)(input)
                expect(actual).to.deep.equal(expected)
            })
        })
    })
})

describe('rotateEntry', () => {
    it('should return undefined if the input is undefined', () => {
        const expected = undefined
        const actual = rotateEntry(undefined)
        expect(actual).to.equal(expected)
    })

    describe('should rotate the order of an entry by one and', () => {
        it('always return a new object reference', () => {
            const input = ['1', 2]
            const actual = rotateEntry(input)
            expect(actual).not.to.equal(input)
        })

        it('put the value first for simple entries', () => {
            const input = ['1', 2]
            const expected = [2, '1']
            const actual = rotateEntry(input)
            expect(actual).to.deep.equal(expected)
        })

        it('put the value first for variable-length entries', () => {
            const input = ['1', '2', '3', 4]
            const expected = [4, '1', '2', '3']
            const actual = rotateEntry(input)
            expect(actual).to.deep.equal(expected)
        })
    })
})
