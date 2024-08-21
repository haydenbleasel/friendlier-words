import adjectives from '../lib/adjectives.json' assert { type: 'json' };
import animals from '../lib/animals.json' assert { type: 'json' };
import architecture from '../lib/architecture.json' assert { type: 'json' };
import food from '../lib/food.json' assert { type: 'json' };
import music from '../lib/music.json' assert { type: 'json' };
import mythology from '../lib/mythology.json' assert { type: 'json' };
import nature from '../lib/nature.json' assert { type: 'json' };
import space from '../lib/space.json' assert { type: 'json' };

const categories = [
  animals,
  space,
  food,
  mythology,
  nature,
  music,
  architecture,
];

export const friendlyWords = (segments = 2, separator = '-'): string => {
  const words: string[] = [];

  if (segments < 2) {
    throw new Error('Need at least 2 words');
  }

  if (!separator) {
    throw new Error('Need a separator');
  }

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  words.push(adjective);

  for (let index = 1; index < segments; index += 1) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word = Math.floor(Math.random() * category.length);
    const newWord = category[word];

    if (words.includes(newWord)) {
      index -= 1;
    } else {
      words.push(category[word]);
    }
  }

  return words.join(separator);
};
