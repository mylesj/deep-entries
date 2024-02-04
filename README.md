[![github][img:github]][repo:github]
[![npm version][img:npm-version]][repo:package]
[![coverage status][img:coveralls]][ext:coveralls]

# deep-entries

A utility that resolves deeply nested key-values as variadic tuples.

-   Comparable to:
    -   [`Object.entries()`][ext:object.entries]
    -   [`Array.prototype.entries()`][ext:array.entries]

**TL;DR:** [examples](#examples)

## install

### Node

```none
> npm install deep-entries
```

```js
import { deepEntries } = from 'deep-entries'
```

## exposes

```typescript
type DeepEntry = [unknown, unknown, ...unknown[]]
```

Instances of `DeepEntry` will vary in length from one iteration
to the next but are essentially arrays of at least **2** elements.

### core functions

Typically `input` types will be `object | array` though other built-in
types should yield intuitive results. Object types such as `Date` and
`RegExp` will be treated as if primitive, _i.e._ returned as whole
values and not enumerated. Objects resulting in a circular reference
will be ignored.

#### deepEntries

```typescript
function deepEntries<T = DeepEntry>(
	input: unknown,
	mapFn?: (entry: DeepEntry) => T,
): T[]
```

#### deepEntriesIterator

```typescript
function deepEntriesIterator<T = DeepEntry>(
	input: unknown,
	mapFn?: (entry: DeepEntry) => T,
): IterableIterator<T>
```

### map functions

#### delimitEntryBy

```typescript
function delimitEntryBy<T = unknown>(
	delimiter: string,
): (entry: DeepEntry) => [string, T]
```

#### delimitEntry

`delimitEntry` is an alias and is equivalent to `delimitEntryBy('.')`

```typescript
function delimitEntry<T = unknown>(entry: DeepEntry): [string, T]
```

#### rotateEntryBy

```typescript
function rotateEntryBy(n: number): (entry: DeepEntry) => DeepEntry
```

#### rotateEntry

`rotateEntry` is an alias and is equivalent to `rotateEntryBy(1)`

```typescript
function rotateEntry(entry: DeepEntry): DeepEntry
```

### misc. observations

In most use-cases `DeepEntry` keys will be of type `string | number`,
though instances of `Map` will yield `Map.prototype.entries()`, meaning
keys can be of any arbitrary type. If undesirable such results can be
filtered out via the `mapFn`.

## examples

» [StackBlitz Playground][repo:examples]

### usage

```js
import {
	deepEntries,
	deepEntriesIterator,
	delimitEntryBy,
	rotateEntryBy,
	delimitEntry,
	rotateEntry,
} from 'deep-entries'
```

A shape made up of both Objects or Arrays can be described in terms of
deep entries. Only enumerable own-members will be returned and iteration
will honour index and / or insertion order. The following examples will
consume this input:

```js
const input = {
	foo: 1,
	bar: {
		deep: {
			key: 2,
		},
	},
	baz: [
		3,
		[4, 5],
		{
			key: 6,
		},
	],
}
```

Nested entries are returned as tuples of keys and a trailing value.

```js
deepEntries(input)
// [
//     [ 'foo', 1 ],
//     [ 'bar', 'deep', 'key', 2 ],
//     [ 'baz', 0, 3 ],
//     [ 'baz', 1, 0, 4 ],
//     [ 'baz', 1, 1, 5 ],
//     [ 'baz', 2, 'key', 6 ]
// ]
```

An optional map function is accepted as a second parameter.

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

The rotate-functions are intended for convenience when destructuring
an entry. Since JavaScript requires rest parameters only as the last
parameter, rotating by **1** puts the value first instead.

```js
for (let [value, ...keys] of deepEntriesIterator(input, rotateEntry)) {
	console.log(keys, value)
}
// [ 'foo' ] 1
// [ 'bar', 'deep', 'key' ] 2
// [ 'baz', 0 ] 3
// [ 'baz', 1, 0 ] 4
// [ 'baz', 1, 1 ] 5
// [ 'baz', 2, 'key' ] 6
```

### filtering

The map-functions can also filter out entries by not returning them,
_i.e._ explicitly returning `undefined` instead.

```js
const getValue = (entry) => entry[entry.length - 1]
deepEntries(input, (entry) => (getValue(entry) > 3 ? entry : undefined))
// [
//     [ 'baz', 1, 0, 4 ],
//     [ 'baz', 1, 1, 5 ],
//     [ 'baz', 2, 'key', 6 ]
// ]
```

The map-functions follow a pattern of returning `undefined` early if passed
`undefined`, such that they may be composed with filters and not throw errors.

```js
const pipe =
	(...fns) =>
	(input) =>
		fns.reduce((acc, fn) => fn(acc), input)

const atDepth = (n) => (entry) => {
	if (entry.length === 2 + n) return entry
}

deepEntries(input, pipe(atDepth(1), delimitEntry))
// [
//     [ 'baz.0', 3 ]
// ]
```

[repo:github]: https://github.com/mylesj/deep-entries
[repo:package]: https://www.npmjs.com/package/deep-entries
[repo:examples]: https://stackblitz.com/~/edit/stackblitz-starters-kuw4qq?file=index.mjs&view=editor
[ext:object.entries]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
[ext:array.entries]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries
[ext:coveralls]: https://coveralls.io/github/mylesj/deep-entries?branch=master
[img:github]: https://img.shields.io/badge/%20-Source-555555?logo=github&style=for-the-badge
[img:npm-version]: https://img.shields.io/npm/v/deep-entries?&label=%20&logo=npm&style=for-the-badge
[img:coveralls]: https://img.shields.io/coverallsCoverage/github/mylesj/deep-entries?branch=master&style=for-the-badge&logo=coveralls
