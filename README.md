# friendlier-words

`friendlier-words` is a JavaScript package that creates friendly words to use in your app, e.g. in project names. It's based off the library by [Glitch](https://github.com/glitchdotcom/friendly-words), but with some choice improvements:

- Curated the word lists to remove strange word combinations
- Generated categories of words rather than objects, allowing for more flexibility
- Allow for a custom number of segments
- Allow for a custom separator

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
