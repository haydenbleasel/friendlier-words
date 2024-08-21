# friendlier-words

<div>
  <img src="https://img.shields.io/github/actions/workflow/status/haydenbleasel/friendlier-words/push.yaml" alt="" />
  <img src="https://img.shields.io/npm/dy/friendlier-words" alt="" />
  <img src="https://img.shields.io/npm/v/friendlier-words" alt="" />
  <img src="https://img.shields.io/github/license/haydenbleasel/friendlier-words" alt="" />
</div>

![friendlier-words](/sample.png)

`friendlier-words` is a JavaScript package that creates friendly words to use in your app, e.g. in project names. It's based off the library by [Glitch](https://github.com/glitchdotcom/friendly-words), but with some choice improvements:

- Curated the word lists to remove strange word combinations
- Generated categories of words rather than objects, allowing for more flexibility
- Allow for a custom number of segments
- Allow for a custom separator

Possible permutations:
- 2 words: 401,736
- 3 words: 707,858,832
- 4 words: 1,247,247,261,984
- 5 words: heat death of the universe

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
