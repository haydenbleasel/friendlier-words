# joyful

<div>
  <img src="https://img.shields.io/npm/dy/joyful" alt="" />
  <img src="https://img.shields.io/npm/v/joyful" alt="" />
  <img src="https://img.shields.io/github/license/haydenbleasel/joyful" alt="" />
</div>

`joyful` is a JavaScript package that creates friendly words to use in your app, e.g. in project names. It's based off the library by [Glitch](https://github.com/glitchdotcom/friendly-words), but with some choice improvements:

- Curated the word lists to remove strange word combinations
- Generated categories of words rather than objects, allowing for more flexibility
- Allow for a custom number of segments
- Allow for a custom separator

Possible permutations:

- 2 words: 700,295
- 3 words: 2,160,410,075
- 4 words: 6,664,865,081,375
- 5 words: 20,561,108,776,041,876

## Installation

```bash
pnpm add joyful
```

## Usage

```ts
import { joyful } from "joyful";

// Default (2 segments, '-')
const words = joyful();

// Custom (3 segments, '_')
const words = joyful(3, "_");
```
