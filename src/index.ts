import animals from '../lib/animals.json' assert { type: 'json' };
import space from '../lib/space.json' assert { type: 'json' };
import food from '../lib/food.json' assert { type: 'json' };
import mythology from '../lib/mythology.json' assert { type: 'json' };

const categories = [animals, space, food, mythology];

export const friendlyWords = (segments = 2, separator = '-'): string => {
  const words: string[] = [];

  for (let index = 0; index < segments; index += 1) {
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
