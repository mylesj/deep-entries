// verify deno import works with direct source files

import { assert, assertEquals } from 'https://deno.land/std/testing/asserts.ts'

import {
	deepEntries,
	deepEntriesIterator,
	delimitEntry,
	delimitEntryBy,
	rotateEntry,
	rotateEntryBy
} from '../src/index.js'

Deno.test('SRC: all imports have extensions', () => {
	// listed in case of "unused import" linting
	// and / or unintended dead-code elimination
	deepEntries
	deepEntriesIterator
	delimitEntry
	delimitEntryBy
	rotateEntry
	rotateEntryBy

	assert(true)
})

Deno.test('SRC: basic input / output', () => {
	const input = [1, [2, [3]]]
	const expected = [
		[0, 1], //
		[1, 0, 2], //
		[1, 1, 0, 3]
	]
	const actual = deepEntries(input)

	assertEquals(actual, expected)
})
