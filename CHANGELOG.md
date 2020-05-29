# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.0.2](https://github.com/mylesj/deep-entries/compare/v4.0.1...v4.0.2) (2020-05-27)

### Docs

-   various corrections

### [4.0.1](https://github.com/mylesj/deep-entries/compare/v4.0.0...v4.0.1) (2020-05-27)

### Bug Fixes

-   point deno target to correct index in dist

## [4.0.0](https://github.com/mylesj/deep-entries/compare/v3.1.0...v4.0.0) (2020-05-27)

### ⚠ BREAKING CHANGES

-   regex, date etc. will yield empty when passed directly
    and will be yielded as atomic values when found inside deep structures.

### Features

-   include minimal typescript typedef ([90c221c](https://github.com/mylesj/deep-entries/commit/90c221c783949d7fac0a29884910f1f7c23111e6))
-   support direct deno import ([43c7b7f](https://github.com/mylesj/deep-entries/commit/43c7b7ff5698924c6fd8525631f53dda584a9708))
-   treat DOM nodes like primitives - yield as values ([b0498c7](https://github.com/mylesj/deep-entries/commit/b0498c7f18dce058dad499830bf2de43456d2c28))
-   treat regex, dates & boxed values like primitives ([4934f6f](https://github.com/mylesj/deep-entries/commit/4934f6fe8aa0340c2dd6086947d00540d96a0fb2))

### Bug Fixes

-   typed-array structures consistently keyed numerically ([f071e55](https://github.com/mylesj/deep-entries/commit/f071e55b8e036ce82f3eb896360946a45e8aeb97))
-   yield deeply nested null values ([dd63ed1](https://github.com/mylesj/deep-entries/commit/dd63ed13ced184a14417bf2d9c096e3542f33b99))

## [3.1.0](https://github.com/mylesj/deep-entries/compare/v3.0.2...v3.1.0) (2019-07-21)

### Features

-   **iterator:** ignore circular references - fix [#19](https://github.com/mylesj/deep-entries/issues/19) ([875ea7f](https://github.com/mylesj/deep-entries/commit/875ea7f))
-   **iterator:** more permissive towards object types ([196d303](https://github.com/mylesj/deep-entries/commit/196d303))

## [3.0.2](https://github.com/mylesj/deep-entries/compare/v3.0.1...v3.0.2) (2019-03-10)

### Bug Fixes

-   **iterator:** support URLSearchParams ([eb71114](https://github.com/mylesj/deep-entries/commit/eb71114))

## [3.0.1](https://github.com/mylesj/deep-entries/compare/v3.0.0...v3.0.1) (2019-03-09)

### Docs

-   correct runkit example

# [3.0.0](https://github.com/mylesj/deep-entries/compare/v2.1.2...v3.0.0) (2019-03-08)

### Bug Fixes

-   Set / Map cross-window support ([5fdc4b3](https://github.com/mylesj/deep-entries/commit/5fdc4b3))

### Features

-   limited support for Map & Set entries ([145e7f5](https://github.com/mylesj/deep-entries/commit/145e7f5))
-   numeric array indices are preserved - close [#11](https://github.com/mylesj/deep-entries/issues/11) ([595a2ec](https://github.com/mylesj/deep-entries/commit/595a2ec))
-   Set instances will be treated as arrays - close [#13](https://github.com/mylesj/deep-entries/issues/13) ([8318389](https://github.com/mylesj/deep-entries/commit/8318389))

### BREAKING CHANGES

-   Map & Set will no longer return empty entries
-   non-numeric array members are ignored

## [2.1.2](https://github.com/mylesj/deep-entries/compare/v2.1.1...v2.1.2) (2019-03-03)

### Docs

-   fix typos

## [2.1.1](https://github.com/mylesj/deep-entries/compare/v2.1.0...v2.1.1) (2019-03-03)

### Bug Fixes

-   **map-functions:** will ignore undefined - i.e. may be composed with a filter ([6a84aaa](https://github.com/mylesj/deep-entries/commit/6a84aaa))
-   **rotate-entry:** rotateEntryBy wasn't exported :-/ ([32ff8af](https://github.com/mylesj/deep-entries/commit/32ff8af))

# [2.1.0](https://github.com/mylesj/deep-entries/compare/v2.0.1...v2.1.0) (2019-03-03)

### Features

-   **rotate-entries:** expose rotateEntryBy - close [#9](https://github.com/mylesj/deep-entries/issues/9) ([fa4153e](https://github.com/mylesj/deep-entries/commit/fa4153e))

## [2.0.1](https://github.com/mylesj/deep-entries/compare/v2.0.0...v2.0.1) (2019-03-03)

### Docs

-   tweaks to readme & runkit examples

# [2.0.0](https://github.com/mylesj/deep-entries/compare/v1.0.0...v2.0.0) (2019-03-03)

### Features

-   **iterator:** filters entries when map function returns undefined ([2ed8e9e](https://github.com/mylesj/deep-entries/commit/2ed8e9e))

### BREAKING CHANGES

-   **iterator:** in deepEntries() & deepEntriesIterator(), yield now ignores entries where a transform has returned undefined - effectively allowing entries to be filtered

# [1.0.0](https://github.com/mylesj/deep-entries/compare/v0.3.2...v1.0.0) (2019-02-25)

### Bug Fixes

-   **iterators:** consistent handling of primitives ([23b7c5b](https://github.com/mylesj/deep-entries/commit/23b7c5b))
-   **map-function:** passively ignore non-function input ([f232314](https://github.com/mylesj/deep-entries/commit/f232314))

### BREAKING CHANGES

-   **iterators:** strings passed as initial input behaved differently to those nested somewhere within a composite type. Primitive input will now return an empty set. _i.e._ `deepEntries('string') !== Object.entries('string')`

## [0.3.2](https://github.com/mylesj/deep-entries/compare/v0.3.1...v0.3.2) (2019-02-25)

### Refactor

-   optimise deep-entries iterator

### Docs

-   tweaks to readme & runkit examples

## [0.3.1](https://github.com/mylesj/deep-entries/compare/v0.3.0...v0.3.1) (2019-02-24)

### Docs

-   add README.md

# [0.3.0](https://github.com/mylesj/deep-entries/compare/v0.2.0...v0.3.0) (2019-02-24)

### Features

-   rotateEntry ([5b3dfa8](https://github.com/mylesj/deep-entries/commit/5b3dfa8))

# [0.2.0](https://github.com/mylesj/deep-entries/compare/v0.1.0...v0.2.0) (2019-02-24)

### Features

-   expose deepEntries - close [#1](https://github.com/mylesj/deep-entries/issues/1) ([ca972a8](https://github.com/mylesj/deep-entries/commit/ca972a8))
-   expose delimitEntry - close [#4](https://github.com/mylesj/deep-entries/issues/4) ([0eeb820](https://github.com/mylesj/deep-entries/commit/0eeb820))

# 0.1.0 (2019-02-22)

### Features

-   expose deepEntriesIterator ([b6f6e3b](https://github.com/mylesj/deep-entries/commit/b6f6e3b))
