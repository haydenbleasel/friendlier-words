# friendlier-words

[![Version](https://img.shields.io/npm/v/friendlier-words.svg)](https://www.npmjs.org/package/friendlier-words) [![Build Status](https://github.com/haydenbleasel/friendlier-words/actions/workflows/push.yml/badge.svg?branch=main)](https://github.com/haydenbleasel/friendlier-words/actions?query=branch%3Amain)

![friendlier-words](/sample.png)

`friendlier-words` is a JavaScript package that creates friendly words to use in your app, e.g. in project names. It's based off the library by [Glitch](https://github.com/glitchdotcom/friendly-words), but with some choice improvements:

- Curated the word lists to remove strange word combinations
- Generated categories of words rather than objects, allowing for more flexibility
- Allow for a custom number of segments
- Allow for a custom separator

Possible permutations:
- 2 words: 246,012
- 3 words: 265,446,948
- 4 words: 286,417,256,892
- 5 words: 309,044,220,186,468
- 6 words: heat death of the universe?

## Installation

```bash
pnpm add friendlier-words
```

## Usage

```ts
import { friendlyWords } from 'friendlier-words';

// Default (2 segments, '-')
const words = friendlyWords();

// Custom (3 segments, '_')
const words = friendlyWords(3, '_');
```
