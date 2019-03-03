# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
