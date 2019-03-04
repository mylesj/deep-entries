[![npm version][img:npm-version]][repo:package]
[![build status][img:repo-status]][repo:status]
[![coverage status][img:coveralls]][ext:coveralls]
[![conventional commits][img:commits]][ext:commits]

# deep-entries

-   Comparable to: [`Object.entries()`][ext:object.entries]

A utility for returning deeply nested key-values as tuples of varying length.

## exposes

### core functions

-   **deepEntries**  
    => ( input: _Object | Array_, map?: _function_ ): _Array[]_
-   **deepEntriesIterator**  
    => ( input: _Object | Array_, map?: _function_ ): _Iterator_

### map functions

-   **delimitEntryBy**  
    => ( input: _string_ ): _function_
-   **delimitEntry**  
    => ( input: _Array_ ): _Array_
-   **rotateEntryBy**  
     => ( input: _integer_ ): _function_
-   **rotateEntry**  
    => ( input: _Array_ ): _Array_

### observations

-   `delimitEntry` is an alias and is equivalent to `delimitEntryBy('.')`
-   `rotateEntry` is an alias and is equivalent to `rotateEntryBy(1)`

## examples

» [RunKit][repo:examples]

### usage

```js
const {
	deepEntries,
	deepEntriesIterator,
	delimitEntryBy,
	rotateEntryBy,
	delimitEntry,
	rotateEntry
} = require('deep-entries')
```

A shape made up of both Objects or Arrays can be described in terms of deep entries. Only enumerable
own-members will be returned and iteration will honour index and / or insertion order. The following
examples will consume this input:

```js
const input = {
	foo: 1,
	bar: {
		deep: {
			key: 2
		}
	},
	baz: [
		3,
		[4, 5],
		{
			key: 6
		}
	]
}
```

`deepEntries()` will return nested entries as arrays of varying length, with the value always trailing.

```js
deepEntries(input)
// [
//     [ 'foo', 1 ],
//     [ 'bar', 'deep', 'key', 2 ],
//     [ 'baz', '0', 3 ],
//     [ 'baz', '1', '0', 4 ],
//     [ 'baz', '1', '1', 5 ],
//     [ 'baz', '2', 'key', 6 ]
// ]
```

`deepEntries()` will accept an optional map function as a second parameter.

```js
deepEntries(input, delimitEntry)
// [
//     [ 'foo', 1 ],
//     [ 'bar.deep.key', 2 ],
//     [ 'baz.0', 3 ],
//     [ 'baz.1.0', 4 ],
//     [ 'baz.1.1', 5 ],
//     [ 'baz.2.key', 6 ]
// ]
```

`deepEntries()` is an alias that collects all entries from a `deepEntriesIterator()`, which is
also exposed to aid in performant iteration of larger structures. The `rotateEntry` map
function rotates the entry array by `1` (_i.e._ putting the value first), allowing for more convenient
destructuring of an entry.

```js
for (let [value, ...keys] of deepEntriesIterator(input, rotateEntry)) {
	console.log(keys, value)
}
// [ 'foo' ] 1
// [ 'bar', 'deep', 'key' ] 2
// [ 'baz', '0' ] 3
// [ 'baz', '1', '0' ] 4
// [ 'baz', '1', '1' ] 5
// [ 'baz', '2', 'key' ] 6
```

It's worth noting that objects can have assigned iterators too.

```js
const { withIterator } = require('with-iterator')
const withDeepEntriesIterator = withIterator(function*() {
	yield* deepEntriesIterator(this, delimitEntryBy(':'))
})
withDeepEntriesIterator(input)
Array.from(input)
// [
//     [ 'foo', 1 ],
//     [ 'bar:deep:key', 2 ],
//     [ 'baz:0', 3 ],
//     [ 'baz:1:0', 4 ],
//     [ 'baz:1:1', 5 ],
//     [ 'baz:2:key', 6 ]
// ]
```

### filtering

The map functions passed to `deepEntries()` and `deepEntriesIterator()` can effectively filter out
entries by not returning them - _i.e._ returning `undefined`.

```js
const { last: getValue } = require('ramda')
deepEntries(input, entry => (getValue(entry) > 3 ? entry : undefined))
// [
//     [ 'baz', '1', '0', 4 ],
//     [ 'baz', '1', '1', 5 ],
//     [ 'baz', '2', 'key', 6 ]
// ]
```

The map functions follow a pattern of returning `undefined` if passed `undefined` such that
they may be composed with filters, without throwing errors.

```js
const { pipe } = require('ramda')
const atDepth = n => entry => {
	if (entry.length === 2 + n) return entry
}
deepEntries(
	input,
	pipe(
		atDepth(1),
		delimitEntry
	)
)
// [
//     [ 'baz.0', 3 ]
// ]
```

[repo:status]: https://travis-ci.org/mylesj/deep-entries
[repo:package]: https://www.npmjs.com/package/deep-entries
[repo:examples]: https://runkit.com/mylesj/deep-entries/2.1.1
[ext:object.entries]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
[ext:commits]: https://conventionalcommits.org
[ext:coveralls]: https://coveralls.io/github/mylesj/deep-entries?branch=master
[img:repo-status]: https://travis-ci.org/mylesj/deep-entries.svg?branch=master
[img:npm-version]: https://badgen.net/npm/v/deep-entries
[img:commits]: https://badgen.net/badge/conventional%20commits/1.0.0/yellow
[img:coveralls]: https://coveralls.io/repos/github/mylesj/deep-entries/badge.svg?branch=master
