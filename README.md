[![npm version][img:npm-version]][repo:package]
[![build status][img:repo-status]][repo:status]
[![coverage status][img:coveralls]][ext:coveralls]
[![conventional commits][img:commits]][ext:commits]

# deep-entries

-   Comparable to: [`Object.entries()`][ext:object.entries]

A utility for returning deeply nested key-values as tuples of variable length.

## exposes

-   **deepEntries**  
    => ( input: _Object | Array_, transform?: _function_ ): _Array[]_
-   **deepEntriesIterator**  
    => ( input: _Object | Array_, transform?: _function_ ): _Iterator_
-   **delimitEntryBy**  
    => ( input: _string_ ): _function_
-   **delimitEntry**  
    => ( input: _Array_ ): _Array_
-   **rotateEntry**  
    => ( input: _Array_ ): _Array_

## examples

» [RunKit][repo:examples]

### usage

```js
const {
	deepEntries,
	deepEntriesIterator,
	delimitEntryBy,
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

`deepEntries()` will return nested entries as a variable-length array with the value trailing.

```js
deepEntries(input)
// [
// 	[ 'foo', 1 ],
//     [ 'bar', 'deep', 'key', 2 ],
//     [ 'baz', '0', 3 ],
//     [ 'baz', '1', '0', 4 ],
//     [ 'baz', '1', '1', 5 ],
//     [ 'baz', '2', 'key', 6 ]
// ]
```

`deepEntries()` will accept an optional transform function as a second parameter.

-   Note that `delimitEntry` is equivalent to `delimitEntryBy('.')`

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

`deepEntries()` is simply a shorthand call to `deepEntriesIterator()` which aids performant
iteration of larger structures. The `rotateEntry()` transform rotates the array by one (_i.e._ putting the
value first), allowing for more convenient destructuring of an entry.

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
withIterator(function*() {
	yield* deepEntriesIterator(this, delimitEntryBy(':'))
}, input)
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

[repo:status]: https://travis-ci.org/mylesj/deep-entries
[repo:package]: https://www.npmjs.com/package/deep-entries
[repo:examples]: https://runkit.com/mylesj/deep-entries/0.3.1
[ext:object.entries]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
[ext:commits]: https://conventionalcommits.org
[ext:coveralls]: https://coveralls.io/github/mylesj/deep-entries?branch=master
[img:repo-status]: https://travis-ci.org/mylesj/deep-entries.svg?branch=master
[img:npm-version]: https://badge.fury.io/js/deep-entries.svg
[img:commits]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg
[img:coveralls]: https://coveralls.io/repos/github/mylesj/deep-entries/badge.svg?branch=master
